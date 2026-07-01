'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const Owner = require('./domain/Owner');
const Location = require('./domain/Location');

const PetReportBuilder = require('../builder/examples/petreport/PetReportBuilder');

const LostPetAlertService = require('../observer/examples/lostpetalerts/LostPetAlertService');
const LostPetEvent = require('../observer/examples/lostpetalerts/LostPetEvent');
const NearbyUser = require('../observer/examples/lostpetalerts/NearbyUser');

const RealOwnerContact = require('../proxy/examples/owneranonymizer/RealOwnerContact');
const AnonymousOwnerProxy = require('../proxy/examples/owneranonymizer/AnonymousOwnerProxy');

const RawImage = require('../adapter/examples/metadata/RawImage');
const InMemoryCatalogFactory = require('../abstractfactory/examples/searchcatalog/InMemoryCatalogFactory');
const SearchIntent = require('../strategy/examples/searchintent/SearchIntent');
const ImageSearchFacade = require('../facade/examples/imagesearch/ImageSearchFacade');

const CaretakerFactory = require('../factory/examples/caretakers/CaretakerFactory');
const CaretakerRole = require('../factory/examples/caretakers/CaretakerRole');
const SizeRestriction = require('../decorator/examples/caretakerrestrictions/SizeRestriction');
const SpeciesRestriction = require('../decorator/examples/caretakerrestrictions/SpeciesRestriction');
const NoMedicationRestriction = require('../decorator/examples/caretakerrestrictions/NoMedicationRestriction');

const CaretakerReviews = require('../composite/examples/reviews/CaretakerReviews');
const Review = require('../composite/examples/reviews/Review');

const DniFormatValidator = require('../chain/examples/idvalidation/DniFormatValidator');
const AgeValidator = require('../chain/examples/idvalidation/AgeValidator');
const ScanQualityValidator = require('../chain/examples/idvalidation/ScanQualityValidator');
const SelfieMatchValidator = require('../chain/examples/idvalidation/SelfieMatchValidator');
const IdDocument = require('../chain/examples/idvalidation/IdDocument');

const CaretakerService = require('../singleton/examples/caretakerservice/CaretakerService');


// ==========================================================
// Estado en memoria del backend.
// ==========================================================
const alertService = new LostPetAlertService();
const reports = [];             // PetReport[]
const facade = new ImageSearchFacade(new InMemoryCatalogFactory());
const caretakerFactory = new CaretakerFactory();
const catService = CaretakerService.getInstance();

// Seed usuarios cercanos.
alertService.register(new NearbyUser('Alice', new Location(-12.0470, -77.0430)));
alertService.register(new NearbyUser('Bob',   new Location(-12.1500, -77.1500)));
alertService.register(new NearbyUser('Carla', new Location(-12.0500, -77.0450)));

// Log de eventos entregados (para mostrar en UI).
const deliveredLog = [];
const originalRegister = alertService.register.bind(alertService);
alertService.users.forEach(u => {
  const origUpdate = u.update.bind(u);
  u.update = (evt) => {
    origUpdate(evt);
    deliveredLog.push({ user: u.name, pet: evt.petName, description: evt.description, at: Date.now() });
  };
});


// ==========================================================
// Utils HTTP.
// ==========================================================
function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => (data += c));
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
};

function serveStatic(req, res) {
  const publicDir = path.join(__dirname, '..', '..', 'public');
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(publicDir, urlPath);
  if (!filePath.startsWith(publicDir)) return json(res, 403, { error: 'forbidden' });

  fs.readFile(filePath, (err, buf) => {
    if (err) return json(res, 404, { error: 'not found', path: urlPath });
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(buf);
  });
}


// ==========================================================
// Rutas API.
// ==========================================================
async function apiReport(req, res) {
  const body = await readBody(req);
  const { name, species, breed, photoUrl, description, lat, lon,
          ownerName, ownerPhone, ownerEmail, ownerDni,
          alias, radiusKm } = body;

  const owner = new Owner(ownerName || 'Anonimo', ownerPhone || '', ownerEmail || '', ownerDni || '');
  const report = new PetReportBuilder()
    .withPet(name, species, breed, photoUrl || '', description || '')
    .withOwner(owner)
    .withLocation(Number(lat), Number(lon))
    .build();
  reports.push(report);

  // Vista publica anonimizada (RNF1.2).
  const publicView = new AnonymousOwnerProxy(new RealOwnerContact(owner), alias || `Dueno#${reports.length + 4000}`);

  // Broadcast (RF1.4 + RNF1.1).
  const start = Date.now();
  const before = deliveredLog.length;
  alertService.broadcast(
    new LostPetEvent(name, report.location, description || breed),
    report.location,
    Number(radiusKm) || 1.0
  );
  const elapsed = Date.now() - start;
  const delivered = deliveredLog.slice(before);

  json(res, 200, {
    ok: true,
    report: {
      pet: report.pet,
      location: { lat: report.location.latitude, lon: report.location.longitude },
      reportedAtEpochMs: report.reportedAtEpochMs,
    },
    ownerPublicView: {
      name: publicView.getName(),
      phone: publicView.getPhone(),
      email: publicView.getEmail(),
    },
    alert: {
      elapsedMs: elapsed,
      sloOk: elapsed < 5000,
      delivered,
    },
  });
}

async function apiSearch(req, res) {
  const body = await readBody(req);
  const intent = body.intent;
  const vendorFormat = (body.vendorFormat || 'JPEG').toUpperCase();
  const seedBytes = Array.isArray(body.bytes) && body.bytes.length
    ? body.bytes.map(Number)
    : Array.from({ length: 4 }, () => Math.floor(Math.random() * 255));

  if (!SearchIntent[intent]) return json(res, 400, { error: 'intent invalido', valid: Object.keys(SearchIntent) });

  const start = Date.now();
  const result = facade.uploadAndSearch(new RawImage(seedBytes, vendorFormat), SearchIntent[intent]);
  const elapsedMs = Date.now() - start;

  json(res, 200, {
    ok: true,
    intent: result.intent,
    matches: result.matches,
    elapsedMs,
    sloOk: elapsedMs < 5000,
  });
}

async function apiCaretakerRegister(req, res) {
  const body = await readBody(req);
  const {
    role, name, especialidad,
    maxSize, allowedSpecies, noMedication,
    dni, scanHash, selfieHash, ageYears, cleanBackground,
  } = body;

  if (!CaretakerRole[role]) return json(res, 400, { error: 'rol invalido', valid: Object.keys(CaretakerRole) });

  let caretaker = caretakerFactory.create(CaretakerRole[role], name, especialidad);
  if (maxSize) caretaker = new SizeRestriction(caretaker, maxSize);
  if (Array.isArray(allowedSpecies) && allowedSpecies.length) caretaker = new SpeciesRestriction(caretaker, allowedSpecies);
  if (noMedication) caretaker = new NoMedicationRestriction(caretaker);

  const chain = new DniFormatValidator();
  chain.linkWith(new AgeValidator())
       .linkWith(new ScanQualityValidator())
       .linkWith(new SelfieMatchValidator());

  const validationLog = [];
  const origLog = console.log;
  console.log = (line) => validationLog.push(String(line));
  const ok = chain.validate(new IdDocument({
    dni, scanHash, selfieHash,
    ageYears: Number(ageYears),
    cleanBackground: !!cleanBackground,
  }));
  console.log = origLog;

  const reviews = new CaretakerReviews(caretaker.getName());
  catService.register(caretaker, reviews);
  if (ok) catService.enablePublicListing();

  json(res, 200, {
    ok: true,
    approved: ok,
    validationLog,
    publiclyEnabled: catService.isPubliclyEnabled(),
    profile: {
      role: caretaker.getRole(),
      name: caretaker.getName(),
      allowedSpecies: caretaker.allowedSpecies(),
      canAdministerMedication: caretaker.canAdministerMedication(),
      description: caretaker.describe(),
    },
    index: catService.caretakers.length - 1,
  });
}

async function apiCaretakerReview(req, res) {
  const body = await readBody(req);
  const { index, ownerName, stars, verified } = body;
  const i = Number(index);
  if (!catService.reviews[i]) return json(res, 404, { error: 'cuidador no existe' });
  catService.reviews[i].add(new Review(ownerName || 'Anon', Number(stars), !!verified));
  json(res, 200, {
    ok: true,
    average: catService.ratingOf(i),
    count: catService.reviews[i].reviewCount(),
  });
}

function apiCaretakerList(_req, res) {
  const list = catService.caretakers.map((c, i) => ({
    index: i,
    role: c.getRole(),
    name: c.getName(),
    description: c.describe(),
    average: catService.ratingOf(i),
    reviewCount: catService.reviews[i].reviewCount(),
  }));
  json(res, 200, { ok: true, publiclyEnabled: catService.isPubliclyEnabled(), list });
}


// ==========================================================
// Router.
// ==========================================================
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/api/report')             return apiReport(req, res);
    if (req.method === 'POST' && req.url === '/api/search')             return apiSearch(req, res);
    if (req.method === 'POST' && req.url === '/api/caretaker/register') return apiCaretakerRegister(req, res);
    if (req.method === 'POST' && req.url === '/api/caretaker/review')   return apiCaretakerReview(req, res);
    if (req.method === 'GET'  && req.url.startsWith('/api/caretaker'))  return apiCaretakerList(req, res);
    if (req.method === 'GET'  && req.url === '/api/alerts')             return json(res, 200, { delivered: deliveredLog });
    if (req.method === 'GET')                                           return serveStatic(req, res);
    json(res, 405, { error: 'method not allowed' });
  } catch (e) {
    json(res, 500, { error: e.message });
  }
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
  console.log(`PetApp UI: http://localhost:${PORT}`);
});
