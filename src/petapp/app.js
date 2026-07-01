'use strict';

const Owner = require('./domain/Owner');
const Location = require('./domain/Location');

const PetReportBuilder = require('../builder/examples/petreport/PetReportBuilder');

const LostPetAlertService = require('../observer/examples/lostpetalerts/LostPetAlertService');
const LostPetEvent = require('../observer/examples/lostpetalerts/LostPetEvent');
const NearbyUser = require('../observer/examples/lostpetalerts/NearbyUser');

const RealOwnerContact = require('../proxy/examples/owneranonymizer/RealOwnerContact');
const AnonymousOwnerProxy = require('../proxy/examples/owneranonymizer/AnonymousOwnerProxy');

const AlertContext = require('../state/examples/alerttoggle/AlertContext');

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


function section1() {
  console.log('--- 1. Reporte de mascota perdida + alertas ---');

  const owner = new Owner('Ana Perez', '999888777', 'ana@mail.com', '12345678');
  const report = new PetReportBuilder()                            // RF1.1
    .withPet('Firulais', 'Perro', 'Labrador', 'cdn/pic.jpg', 'Collar rojo')
    .withOwner(owner)
    .withLocation(-12.0464, -77.0428)                              // RF1.2
    .build();
  console.log(`Reporte: ${report}`);

  const publicView = new AnonymousOwnerProxy(new RealOwnerContact(owner), 'Dueno#4821'); // RNF1.2
  console.log(`Dueno (vista publica): ${publicView.getName()} tel=${publicView.getPhone()}`);

  const alerts = new LostPetAlertService();                        // RF1.4 + RNF1.1
  const alice = new NearbyUser('Alice', new Location(-12.0470, -77.0430));
  const bob   = new NearbyUser('Bob',   new Location(-12.1500, -77.1500));
  const carla = new NearbyUser('Carla', new Location(-12.0500, -77.0450));
  alerts.register(alice); alerts.register(bob); alerts.register(carla);

  const evt = new LostPetEvent('Firulais', report.location, 'Labrador collar rojo');
  alerts.broadcast(evt, report.location, 1.0);

  const ctx = new AlertContext(alerts, bob);                       // RF3.3
  ctx.toggle();
  ctx.toggle();
  console.log(`Estado Bob: ${ctx.state.label()}`);
  console.log();
}

function section2() {
  console.log('--- 2. Buscador multiproposito por imagen ---');
  const facade = new ImageSearchFacade(new InMemoryCatalogFactory());
  const img = new RawImage([9, 8, 7, 6], 'PNG');

  console.log(facade.uploadAndSearch(img, SearchIntent.ADOPTION).toString());
  console.log(facade.uploadAndSearch(img, SearchIntent.SALE).toString());
  console.log(facade.uploadAndSearch(img, SearchIntent.VERIFY_LOSS).toString());
  console.log();
}

function section3() {
  console.log('--- 3. Red de cuidadores ---');
  const factory = new CaretakerFactory();

  const base = factory.create(CaretakerRole.PROFESIONAL, 'Luis');   // RF3.1
  const decorated = new NoMedicationRestriction(                    // RF3.2
    new SpeciesRestriction(
      new SizeRestriction(base, 'medium'),
      ['Perro', 'Gato']
    )
  );
  console.log(decorated.describe());

  const chain = new DniFormatValidator();                           // RNF3.1
  chain.linkWith(new AgeValidator())
       .linkWith(new ScanQualityValidator())
       .linkWith(new SelfieMatchValidator());

  const doc = new IdDocument({
    dni: '12345678', scanHash: 'abcd1234', selfieHash: 'abcd9999',
    ageYears: 24, cleanBackground: true,
  });
  const ok = chain.validate(doc);
  console.log(`Validacion DNI: ${ok ? 'APROBADA' : 'RECHAZADA'}`);

  const reviews = new CaretakerReviews(base.getName());             // RF3.4
  reviews.add(new Review('Ana', 5, true));
  reviews.add(new Review('Beto', 4, true));
  reviews.add(new Review('Cesar', 3, false));

  const svc = CaretakerService.getInstance();                       // RNF3.2
  svc.register(decorated, reviews);
  if (ok) svc.enablePublicListing();
  console.log(`Servicio publico habilitado: ${svc.isPubliclyEnabled()}`);
  console.log(`Rating promedio: ${svc.ratingOf(0)}`);
}

function main() {
  console.log('=========================================');
  console.log(' PetApp - demo de patrones GoF (Node+Python)');
  console.log('=========================================\n');
  section1();
  section2();
  section3();
}

main();
