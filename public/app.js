'use strict';

// ====================
// Tabs.
// ====================
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ====================
// Helpers.
// ====================
function formToObj(form) {
  const data = new FormData(form);
  const obj = {};
  data.forEach((v, k) => { obj[k] = v; });
  // checkboxes ausentes => false
  form.querySelectorAll('input[type=checkbox]').forEach(cb => {
    obj[cb.name] = cb.checked;
  });
  return obj;
}

function showResult(el, data, ok = true) {
  el.classList.remove('ok', 'err');
  el.classList.add(ok ? 'ok' : 'err');
  el.textContent = JSON.stringify(data, null, 2);
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: await res.json() };
}


// ====================
// TAB 1 — Reporte.
// ====================
document.getElementById('form-report').addEventListener('submit', async (e) => {
  e.preventDefault();
  const el = document.getElementById('report-result');
  el.textContent = 'Enviando…';
  const body = formToObj(e.target);
  try {
    const { status, json } = await api('/api/report', body);
    const summary = {
      sloOk: json.alert?.sloOk,
      elapsedMs: json.alert?.elapsedMs,
      notificados: json.alert?.delivered?.map(d => d.user) || [],
      duenoAnonimo: json.ownerPublicView,
      reporte: json.report,
    };
    showResult(el, summary, status === 200 && json.ok);
  } catch (err) {
    showResult(el, { error: err.message }, false);
  }
});


// ====================
// TAB 2 — Buscador.
// ====================
document.getElementById('form-search').addEventListener('submit', async (e) => {
  e.preventDefault();
  const el = document.getElementById('search-result');
  el.textContent = 'Analizando imagen (Adapter → Python)…';

  const form = e.target;
  const intent = form.querySelector('input[name=intent]:checked').value;
  const vendorFormat = form.querySelector('select[name=vendorFormat]').value;
  const file = form.querySelector('input[type=file]').files[0];

  let bytes = [];
  if (file) {
    const buf = await file.arrayBuffer();
    // muestreo primeros 16 bytes (el analizador Python no necesita mas para demo)
    bytes = Array.from(new Uint8Array(buf).slice(0, 16));
  }

  try {
    const { status, json } = await api('/api/search', { intent, vendorFormat, bytes });
    showResult(el, json, status === 200);
  } catch (err) {
    showResult(el, { error: err.message }, false);
  }
});


// ====================
// TAB 3 — Cuidadores.
// ====================
document.getElementById('form-caretaker').addEventListener('submit', async (e) => {
  e.preventDefault();
  const el = document.getElementById('caretaker-result');
  el.textContent = 'Registrando y validando DNI (Chain)…';
  const raw = formToObj(e.target);
  raw.allowedSpecies = raw.allowedSpecies
    ? raw.allowedSpecies.split(',').map(s => s.trim()).filter(Boolean)
    : [];
  try {
    const { status, json } = await api('/api/caretaker/register', raw);
    showResult(el, json, status === 200 && json.approved);
    refreshList();
  } catch (err) {
    showResult(el, { error: err.message }, false);
  }
});

document.getElementById('form-review').addEventListener('submit', async (e) => {
  e.preventDefault();
  const el = document.getElementById('review-result');
  el.textContent = 'Enviando reseña…';
  const body = formToObj(e.target);
  try {
    const { status, json } = await api('/api/caretaker/review', body);
    showResult(el, json, status === 200 && json.ok);
    refreshList();
  } catch (err) {
    showResult(el, { error: err.message }, false);
  }
});

document.getElementById('refresh-caretakers').addEventListener('click', refreshList);

async function refreshList() {
  const list = document.getElementById('caretaker-list');
  list.innerHTML = '<em>Cargando…</em>';
  const res = await fetch('/api/caretaker');
  const json = await res.json();
  if (!json.list.length) {
    list.innerHTML = '<p><em>Sin cuidadores registrados aún.</em></p>';
    return;
  }
  list.innerHTML = json.list.map(c => `
    <div class="caretaker-card">
      <h4>[${c.index}] ${c.name} — ${c.role}</h4>
      <p>${c.description}</p>
      <small>
        <span class="badge ${c.average >= 4 ? 'ok' : c.average >= 2.5 ? 'warn' : 'err'}">
          ★ ${c.average.toFixed(2)}
        </span>
        ${c.reviewCount} reseñas verificadas
      </small>
    </div>
  `).join('');
}

refreshList();
