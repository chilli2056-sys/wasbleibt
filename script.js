const map = L.map('map', {
  doubleClickZoom: false,
  zoomControl: false,
  maxZoom: 20
}).setView([53.09, 8.78], 14);

L.tileLayer(
  'https://maps.geoapify.com/v1/tile/toner/{z}/{x}/{y}.png?apiKey=f4be76cd0a3340e893714aa6d9052957',
  {
    attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | \u00a9 <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> \u00a9 <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    maxZoom: 20,
    crossOrigin: true
  }
).addTo(map);

const filters = {
  selectedThemen: [],
  selectedRoute: null
};

const markerObjects = [];
let routeLayer = null;

const route20Stations = stations.filter(station =>
  (station.routen || []).includes('fahrradroute')
);

// ============================================================
// THEMEN- UND ROUTENLEISTE
// ============================================================

function setupThemenBar() {
  const bar = document.getElementById('map-themen-bar');
  if (!bar || typeof kategorien === 'undefined') return;

  bar.innerHTML = '';

  // FOTOS-Toggle als erster Button
  const fotoChip = document.createElement('button');
  fotoChip.className = 'themen-chip active';
  fotoChip.textContent = 'Fotos';
  fotoChip.addEventListener('click', () => {
    const mapEl = document.getElementById('map');
    mapEl.classList.toggle('marker-nur-punkte');
    fotoChip.classList.toggle('active');
  });
  bar.appendChild(fotoChip);

  kategorien.forEach(kat => {
    const chip = document.createElement('button');
    chip.className = 'themen-chip';
    chip.textContent = kat.label;
    chip.dataset.thema = kat.wert;

    chip.addEventListener('click', () => {
      handleThemaClick(kat.wert, chip);
      updateMap();
    });

    bar.appendChild(chip);
  });
}

// Fahrrad-Button (oben rechts) schaltet die Route ein/aus
function setupFahrradBtn() {
  const btn = document.getElementById('fahrrad-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (filters.selectedRoute === 'fahrradroute') {
      filters.selectedRoute = null;
      btn.classList.remove('active');
      clearRoute();
    } else {
      filters.selectedRoute = 'fahrradroute';
      btn.classList.add('active');
      show20kmRoute();
    }
  });
}

// Zoom-Buttons
function setupZoomBtns() {
  const zoomIn = document.getElementById('zoom-in-btn');
  const zoomOut = document.getElementById('zoom-out-btn');
  if (zoomIn) zoomIn.addEventListener('click', () => map.zoomIn());
  if (zoomOut) zoomOut.addEventListener('click', () => map.zoomOut());
}

function handleThemaClick(thema, chip) {
  const index = filters.selectedThemen.indexOf(thema);

  if (index > -1) {
    filters.selectedThemen.splice(index, 1);
    chip.classList.remove('active');
  } else {
    filters.selectedThemen.push(thema);
    chip.classList.add('active');
  }
}

function filterStations(allStations) {
  if (filters.selectedThemen.length === 0) {
    return allStations;
  }

  return allStations.filter(station => {
    const stationThemen = station.themen || [];
    return filters.selectedThemen.some(thema => stationThemen.includes(thema));
  });
}

// ============================================================
// ROUTEN
// ============================================================

function clearRoute() {
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
}

function show20kmRoute() {
  clearRoute();

  const routePoints = route20Stations
    .map(station => station.coords)
    .filter(Boolean);

  if (routePoints.length < 2) {
    return;
  }

  routeLayer = L.polyline(routePoints, {
    color: 'black',
    weight: 4,
    opacity: 1
  }).addTo(map);

  map.fitBounds(routeLayer.getBounds(), {
    padding: [30, 30]
  });
}

// ============================================================
// MARKER
// ============================================================

// ── HIER die Markergröße einstellen ──────────────────────────────────────
// Referenzgröße (bei vollem Zoom) = clamp(MIN, fensterabhängig, MAX) in PIXELN.
// Statt reiner vw-Skalierung: wächst mit dem Fenster, ist aber nach unten und
// oben in px begrenzt → wirkt auf Handy UND Laptop stimmig.
const MARKER_PREF_VW = 30;    // bevorzugte Größe als Fensteranteil (vw)
const MARKER_MIN_PX  = 210;   // niemals kleiner (schmale Handys)
const MARKER_MAX_PX  = 320;   // niemals größer (breite Laptops/Monitore)

// Zoom-Verkleinerung relativ zur Referenzgröße:
// 1 = volle Größe bei ZOOM_MAX, ZOOM_OUT_FAKTOR bei ZOOM_MIN (voll rausgezoomt).
const ZOOM_MIN = 12;
const ZOOM_MAX = 18;
const ZOOM_OUT_FAKTOR = 0.22; // Fotogröße bei voll rausgezoomt (Anteil der vollen Größe); kleiner = stärker schrumpfen

// Linie (Strich) – Länge variiert pro Station, damit sich Fotos weniger überlappen.
const LINIE_MIN   = 0.20;     // kürzeste Linie (Anteil der Markergröße)
const LINIE_MAX   = 1.10;     // längste Linie
const LINIE_DICKE = 5;        // Liniendicke in px (bei vollem Zoom; skaliert mit)

// Maximaler horizontaler Versatz des Fotos vom Koordinatenpunkt (als Anteil von W).
// Größere Werte → stärkere Schräge, weniger Überlappung; Box wird proportional breiter.
const MAX_OFFSET_FAKTOR = 0.70;

// Goldene-Winkel-Konstante für maximale Gleichverteilung (Sonnenblumenmuster):
// Jede Station bekommt einen einzigartigen, optimal gestreuten Offset + Linienlänge.
const GOLDENER_WINKEL    = 2.39996323; // 2π / φ² in Radiant
const GOLDENER_SCHNITT_T = 0.6180339887; // (√5−1)/2

// Punkt am Linienende
const PUNKT_GROESSE    = 22;  // Durchmesser in px bei vollem Zoom (kleinste Darstellung)
const PUNKT_OUT_FAKTOR = 2.0; // Punkt bei voll rausgezoomt = 2× so groß wie bei vollem Zoom
// ─────────────────────────────────────────────────────────────────────────

// Referenzgröße in px bei vollem Zoom – fensterabhängig, aber geclamped.
function refSizePx() {
  const vwPx = MARKER_PREF_VW * window.innerWidth / 100;
  return Math.max(MARKER_MIN_PX, Math.min(MARKER_MAX_PX, vwPx));
}

// Skalierungsfaktor für den aktuellen (oder Ziel-)Zoom. Für alle Marker gleich.
function sizeFactor(zoom) {
  const clamped = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom));
  const t = (clamped - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN); // 0 raus … 1 rein
  return ZOOM_OUT_FAKTOR + t * (1 - ZOOM_OUT_FAKTOR);      // ZOOM_OUT_FAKTOR … 1
}

// Feste Referenz-Maße einer Station (zoomunabhängig). Alles in PIXELN.
function getMarkerMetrics(station) {
  const SIZE = refSizePx(); // Referenzgröße in px; Zoom läuft über CSS-scale
  const ratio = station._imgRatio || 0.75;
  const sqrtRatio = Math.sqrt(ratio);
  const W = SIZE / sqrtRatio;   // Foto-Breite in px
  const H = SIZE * sqrtRatio;   // Foto-Höhe in px

  // Goldene-Winkel-Verteilung: Station i bekommt einen optimal gestreuten Wert,
  // sodass benachbarte Stationen (im Array) möglichst verschiedene Positionen haben.
  // Überschreibbar pro Station über station.offsetFactor / station.lineFactor.
  if (station._offsetFactor === undefined) {
    if (station.offsetFactor !== undefined) {
      station._offsetFactor = station.offsetFactor;
    } else {
      const idx = (typeof stations !== 'undefined') ? stations.indexOf(station) : -1;
      station._offsetFactor = idx >= 0
        ? Math.cos(idx * GOLDENER_WINKEL)  // gleichmäßig auf -1…+1 verteilt
        : Math.random() * 2 - 1;
    }
  }
  if (station._lineFactor === undefined) {
    if (station.lineFactor !== undefined) {
      station._lineFactor = station.lineFactor;
    } else {
      const idx = (typeof stations !== 'undefined') ? stations.indexOf(station) : -1;
      const t   = idx >= 0 ? (idx * GOLDENER_SCHNITT_T) % 1 : Math.random();
      station._lineFactor = LINIE_MIN + t * (LINIE_MAX - LINIE_MIN);
    }
  }
  const LINE_H = SIZE * station._lineFactor; // Linienlänge in px

  // Offset und Box-Geometrie: MAX_OFFSET_FAKTOR bestimmt, wie weit das Foto
  // seitlich schwingen kann. Box wird entsprechend breiter, Anker bleibt korrekt.
  const offset   = station._offsetFactor * MAX_OFFSET_FAKTOR * W;
  const boxW     = (2 * MAX_OFFSET_FAKTOR + 1) * W;   // px
  const boxH     = H + LINE_H;                         // px
  const centerX  = (MAX_OFFSET_FAKTOR + 0.5) * W;     // px – Koordinatenpunkt (Ankerpunkt)
  const fotoLeft = MAX_OFFSET_FAKTOR * W + offset;     // px

  return {
    W, H, LINE_H, boxW, boxH, centerX, fotoLeft, offset,
    boxWpx:    boxW,
    boxHpx:    boxH,
    anchorXpx: centerX
  };
}

// Marker EINMAL bauen (Foto wird nur hier erzeugt → kein Neuladen beim Zoom)
function createMarkerForStation(station) {
  const m = getMarkerMetrics(station);
  const scale = sizeFactor(map.getZoom());

  // Foto-Rahmen so dick wie die Linie
  const fotoStyle = `left:${m.fotoLeft}px;width:${m.W}px;height:${m.H}px;border:${LINIE_DICKE}px solid #4A27EA;`;
  const foto = station.foto
    ? `<img class="foto-pin-img" src="${station.foto}" style="${fotoStyle}" />`
    : `<div class="foto-pin-fallback" style="${fotoStyle}">
        <span>${station.name}</span>
       </div>`;

  // Schräge Linie: von der Koordinate (centerX, boxH) zur Foto-Unterkante-Mitte
  // (centerX + offset, H). Je nach Versatz neigt sie sich nach rechts oder links.
  const laenge = Math.sqrt(m.offset * m.offset + m.LINE_H * m.LINE_H);     // Länge in px
  const winkel = Math.atan2(m.offset, m.LINE_H) * 180 / Math.PI;           // ° (rechts = positiv)
  const linie = `<div class="foto-pin-linie" style="left:calc(${m.centerX}px - ${LINIE_DICKE / 2}px);top:${m.boxH - laenge}px;width:${LINIE_DICKE}px;height:${laenge}px;transform:rotate(${winkel}deg);"></div>`;

  const punkt = `<div class="foto-pin-punkt" data-station-id="${station.id}" style="left:${m.centerX}px;top:${m.boxH}px;width:${PUNKT_GROESSE}px;height:${PUNKT_GROESSE}px;"></div>`;

  return L.divIcon({
    html: `<div class="foto-pin-wrapper" style="width:${m.boxW}px;height:${m.boxH}px;transform:scale(${scale});">${foto}${linie}${punkt}</div>`,
    className: 'foto-pin-marker',
    iconSize:   [m.boxWpx, m.boxHpx],
    iconAnchor: [m.anchorXpx, m.boxHpx]
  });
}

// Bestehenden Marker NUR skalieren – kein DOM-Neubau, kein Foto-Neuladen.
// instant=true setzt die Größe ohne den 0.25s-Übergang (für Pinch-Zoom-Ende).
function applyMarkerScale(obj, zoom, instant) {
  const el = obj.marker.getElement();
  if (!el) return; // nicht sichtbar / noch nicht im DOM
  const s = sizeFactor(zoom);

  const wrapper = el.querySelector('.foto-pin-wrapper');
  if (wrapper) {
    if (instant) {
      // Größe sofort setzen (ohne Übergang) → auf dem Handy kein sichtbares
      // Nachjustieren nach dem Pinch-Zoom. Übergang danach wieder aktivieren.
      wrapper.style.transition = 'none';
      wrapper.style.transform  = `scale(${s})`;
      requestAnimationFrame(() => { wrapper.style.transition = ''; });
    } else {
      wrapper.style.transform = `scale(${s})`;
    }
  }

  // Punkt wird beim Rauszoomen GRÖSSER (gerendert PUNKT_GROESSE bei vollem
  // Zoom bis PUNKT_GROESSE*PUNKT_OUT_FAKTOR bei voll raus). Fotos schrumpfen,
  // der Punkt bleibt dadurch gut sichtbar.
  const punkt = el.querySelector('.foto-pin-punkt');
  if (punkt) {
    const t = (s - ZOOM_OUT_FAKTOR) / (1 - ZOOM_OUT_FAKTOR); // 0 raus … 1 rein
    const renderZiel = PUNKT_GROESSE * (PUNKT_OUT_FAKTOR + t * (1 - PUNKT_OUT_FAKTOR));
    const dotCss = renderZiel / s; // CSS-Größe, damit gerendert (×s) = renderZiel
    punkt.style.width  = dotCss + 'px';
    punkt.style.height = dotCss + 'px';
  }
}

// Markergeometrie an eine neue Fensterbreite anpassen – OHNE das DOM/Foto neu
// zu bauen (kein Nachladen, kein Flackern). Es werden nur die Maße der schon
// vorhandenen Elemente und Leaflets Anker (über margin/size am Icon-Element)
// aktualisiert. Genau das, was setIcon intern auch macht – nur ohne Neubau.
function updateMarkerGeometry(obj) {
  const el = obj.marker.getElement();
  if (!el) return; // nicht im DOM → wird beim Wiedereinblenden frisch gebaut
  const m = getMarkerMetrics(obj.station);

  // Leaflet-Anker/Größe direkt am Marker-Element (statt setIcon → kein Neubau)
  el.style.width      = m.boxWpx + 'px';
  el.style.height     = m.boxHpx + 'px';
  el.style.marginLeft = (-m.anchorXpx) + 'px';
  el.style.marginTop  = (-m.boxHpx) + 'px';
  const ico = obj.marker.options.icon; // Optionen mitziehen → konsistent bei späterem Neubau
  if (ico) {
    ico.options.iconSize   = [m.boxWpx, m.boxHpx];
    ico.options.iconAnchor = [m.anchorXpx, m.boxHpx];
  }

  const wrapper = el.querySelector('.foto-pin-wrapper');
  if (wrapper) { wrapper.style.width = m.boxW + 'px'; wrapper.style.height = m.boxH + 'px'; }

  const foto = el.querySelector('.foto-pin-img, .foto-pin-fallback');
  if (foto) { foto.style.left = m.fotoLeft + 'px'; foto.style.width = m.W + 'px'; foto.style.height = m.H + 'px'; }

  const laenge = Math.sqrt(m.offset * m.offset + m.LINE_H * m.LINE_H);
  const winkel = Math.atan2(m.offset, m.LINE_H) * 180 / Math.PI;
  const linie = el.querySelector('.foto-pin-linie');
  if (linie) {
    linie.style.left      = `calc(${m.centerX}px - ${LINIE_DICKE / 2}px)`;
    linie.style.top       = (m.boxH - laenge) + 'px';
    linie.style.height    = laenge + 'px';
    linie.style.transform = `rotate(${winkel}deg)`;
  }

  const punkt = el.querySelector('.foto-pin-punkt');
  if (punkt) { punkt.style.left = m.centerX + 'px'; punkt.style.top = m.boxH + 'px'; }

  applyMarkerScale(obj, map.getZoom()); // Scale + Punktgröße neu setzen
  obj.marker.update();                  // Position mit neuem Anker setzen
}

function attachEvents(marker, station) {
  marker.on('click', e => {
    L.DomEvent.stopPropagation(e);
    addCard(station);
  });
}

// Bilder vorladen → Ratios → Marker bauen
const stationsMitFoto = stations.filter(s => s.foto);
let geladen = 0;
let setupGestartet = false;

function markerSetupStarten() {
  if (setupGestartet) return; // nur einmal ausführen
  setupGestartet = true;
  stations.forEach(station => {
    const icon = createMarkerForStation(station);
    const marker = L.marker(station.coords, { icon });
    attachEvents(marker, station);
    marker.addTo(map);
    markerObjects.push({ station, marker });
  });
  updateMap();
}

if (stationsMitFoto.length === 0) {
  markerSetupStarten();
} else {
  stationsMitFoto.forEach(station => {
    const img = new Image();
    img.onload = () => {
      station._imgRatio = img.naturalHeight / img.naturalWidth;
      geladen++;
      if (geladen === stationsMitFoto.length) markerSetupStarten();
    };
    img.onerror = () => {
      geladen++;
      if (geladen === stationsMitFoto.length) markerSetupStarten();
    };
    img.src = station.foto;
  });
  // Sicherheitsnetz: Falls ein Bild weder lädt noch fehlschlägt (hängt),
  // werden die Marker trotzdem spätestens nach 4 s erzeugt.
  setTimeout(() => {
    if (!setupGestartet) {
      console.warn('Marker-Setup per Timeout gestartet – ein Bild hat nicht geantwortet.');
      markerSetupStarten();
    }
  }, 4000);
}

// Skalierung schon beim START der Zoom-Animation auf den ZIEL-Zoom setzen –
// so wächst/schrumpft der Marker synchron mit der Karte (kein Sprung am Ende).
map.on('zoomanim', e => {
  markerObjects.forEach(obj => applyMarkerScale(obj, e.zoom));
});

// Sicherheitsnetz für Pinch/Abschluss: am Ende exakten Zoom setzen + Sichtbarkeit.
map.on('zoomend', updateMap);

// ── Marker-Anker an die Fensterbreite koppeln ───────────────────────────
// iconSize/iconAnchor werden in px aus window.innerWidth gebaut. Ändert sich die
// BREITE (Fenster ziehen, Gerät drehen), passen Anker und Darstellung nicht mehr
// zusammen → Marker säßen versetzt, bis neu geladen wird. Wir passen die Maße
// hier IN PLACE an (kein Foto-Neubau → kein Flackern/Nachladen beim Zoomen).
let markerResizeTimer = null;
let letzteFensterbreite = window.innerWidth;

function markerAnkerNeuberechnen() {
  // Nur bei spürbarer Breitenänderung (Mini-Schwankungen mobiler Browser ignorieren)
  if (Math.abs(window.innerWidth - letzteFensterbreite) < 30) return;
  letzteFensterbreite = window.innerWidth;
  markerObjects.forEach(obj => {
    if (obj.marker.getElement()) {
      updateMarkerGeometry(obj);                                 // sichtbar: in place, kein Neuladen
    } else {
      obj.marker.setIcon(createMarkerForStation(obj.station));   // ausgeblendet: neu bauen (unsichtbar → kein Flackern)
    }
  });
}

window.addEventListener('resize', () => {
  clearTimeout(markerResizeTimer);
  markerResizeTimer = setTimeout(markerAnkerNeuberechnen, 200);
});
window.addEventListener('orientationchange', () => {
  // innerWidth steht nach der Drehung erst leicht verzögert korrekt zur Verfügung
  setTimeout(markerAnkerNeuberechnen, 300);
});

function updateMap() {
  const filtered = filterStations(stations);
  const zoom = map.getZoom();
  markerObjects.forEach(obj => {
    const visible = filtered.some(s => s.id === obj.station.id);
    if (visible) {
      if (!map.hasLayer(obj.marker)) obj.marker.addTo(map);
      applyMarkerScale(obj, zoom, true); // am Zoom-Ende sofort (kein Nachkriechen auf Handy)
      obj.marker.update();               // Position sicher aus den Koordinaten neu setzen
    } else {
      if (map.hasLayer(obj.marker)) map.removeLayer(obj.marker);
    }
  });
}

// ============================================================
// INFO-KARTEN
// ============================================================
// ============================================================
// INFO-PANEL
// ============================================================

const infoPanel        = document.getElementById('info-panel');
const infoPanelClose   = document.getElementById('info-close');
const infoFotoImg      = document.getElementById('info-foto-img');
const infoFotoZaehler  = document.getElementById('info-foto-zaehler');
const infoPrev         = document.getElementById('info-foto-prev');
const infoNext         = document.getElementById('info-foto-next');
const infoVollbild     = document.getElementById('info-foto-vollbild');
const infoName         = document.getElementById('info-name');
const infoBeschreibung = document.getElementById('info-beschreibung');
const infoFakten       = document.getElementById('info-fakten');
const infoQuellen      = document.getElementById('info-quellen');
const infoKoordinaten  = document.getElementById('info-koordinaten');
const infoAdresse      = document.getElementById('info-adresse');

const vollbildOverlay  = document.getElementById('info-vollbild-overlay');
const vollbildImg      = document.getElementById('info-vollbild-img');
const vollbildClose    = document.getElementById('info-vollbild-close');
const vollbildPrev     = document.getElementById('info-vollbild-prev');
const vollbildNext     = document.getElementById('info-vollbild-next');

let aktiveFotos = [];
let aktiverFotoIndex = 0;

function aktualisiereFoto() {
  if (aktiveFotos.length === 0) {
    infoFotoImg.style.display = 'none';
    document.getElementById('info-foto-controls').style.display = 'none';
    return;
  }

  infoFotoImg.style.display = 'block';
  infoFotoImg.src = aktiveFotos[aktiverFotoIndex];
  vollbildImg.src = aktiveFotos[aktiverFotoIndex];

  // Nach dem Laden exakt korrigieren (schlägt den Vorab-Schätzwert)
  infoFotoImg.onload = syncFotoWrapperHoehe;
  if (infoFotoImg.complete && infoFotoImg.naturalHeight > 0) syncFotoWrapperHoehe();

  const mehrere = aktiveFotos.length > 1;
  document.getElementById('info-foto-controls').style.display = mehrere ? 'flex' : 'none';
  infoPrev.style.display = mehrere ? 'flex' : 'none';
  infoNext.style.display = mehrere ? 'flex' : 'none';
}

let aktuelleStationId = null;
let aktuelleStation   = null; // für Foto-Wrapper-Höhen-Sync

// Wrapper-Höhe exakt auf die geladene Bildgröße setzen – behebt das mobile
// Problem, dass #info-name (bottom:0) bei noch nicht geladenem Bild am oberen
// Rand des null-hohen Wrappers erscheint statt am unteren Fotorand.
function syncFotoWrapperHoehe() {
  const wrapper = document.getElementById('info-foto-wrapper');
  if (!wrapper) return;
  const h = infoFotoImg.offsetHeight;
  if (h > 0) wrapper.style.height = h + 'px';
}

function addCard(station) {
  aktuelleStationId = station.id;
  aktuelleStation   = station;

  // Wrapper sofort mit erwarteter Bildhöhe vorbelegen, damit #info-name
  // (bottom:0) schon korrekt sitzt bevor das Bild fertig geladen ist.
  const fotoWrapper = document.getElementById('info-foto-wrapper');
  if (fotoWrapper) {
    const ratio  = station._imgRatio;
    const availW = fotoWrapper.offsetWidth || (window.innerWidth - 40);
    const maxH   = window.innerHeight * (window.innerWidth <= 700 ? 0.40 : 0.50);
    fotoWrapper.style.height = ratio
      ? Math.min(availW * ratio, maxH) + 'px'
      : ''; // kein Ratio → Auto (img bestimmt Höhe selbst)
  }

  aktiveFotos = station.fotos && station.fotos.length > 0
    ? station.fotos
    : (station.foto ? [station.foto] : []);

  aktiverFotoIndex = 0;

  infoName.innerHTML = '<span class="name-inner">'
    + (station.name || '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
    + '</span>';
  infoBeschreibung.innerHTML = renderBeschreibung(
    (typeof texte !== 'undefined' && texte[station.id]) ? texte[station.id] : (station.info || '')
  );
  if (infoFakten) {
    if (station.fakten && station.fakten.length > 0) {
      infoFakten.innerHTML = station.fakten
        .map(f => '<span class="fakt">' + f + '</span>')
        .join('<hr class="fakten-trennlinie">');
    } else {
      infoFakten.innerHTML = '';
    }
  }
  // Quellen unter dem Text auflisten
  if (infoQuellen) {
    const q = Array.isArray(station.quellen) ? station.quellen : [];
    const esc = t => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
    infoQuellen.innerHTML = q.length
      ? '<span class="quellen-titel">Quellen</span>' + q.map(t => esc(t)).join('<br>')
      : '';
  }
  if (infoKoordinaten) infoKoordinaten.textContent = station.coords
    ? station.coords[0].toFixed(4) + ' N / ' + station.coords[1].toFixed(4) + ' O'
    : '';
  if (infoAdresse) infoAdresse.textContent = station.adresse || '';

  aktualisiereFoto();

  // Kommentare zurücksetzen
  if (typeof kommentareZuruecksetzen === 'function') kommentareZuruecksetzen(station.id);

  infoPanel.classList.add('open');
  const kartenButtons = document.getElementById('karten-buttons');
  if (kartenButtons) kartenButtons.style.display = 'none';
}

infoPanelClose.addEventListener('click', () => {
  infoPanel.classList.remove('open');
  const kartenButtons = document.getElementById('karten-buttons');
  if (kartenButtons) kartenButtons.style.display = 'flex';
  const fotoWrapper = document.getElementById('info-foto-wrapper');
  if (fotoWrapper) fotoWrapper.style.height = '';
});

// ── Stations-Pfeile: zwischen Stationen wechseln ──
function wechsleStation(richtung) {
  if (aktuelleStationId == null) return;
  const idx = stations.findIndex(s => s.id === aktuelleStationId);
  if (idx === -1) return;
  const neu = stations[(idx + richtung + stations.length) % stations.length];
  addCard(neu);
  const inner = document.getElementById('info-panel-inner');
  if (inner) inner.scrollTop = 0;
}
const infoPrevBtn = document.getElementById('info-prev');
const infoNextBtn = document.getElementById('info-next');
if (infoPrevBtn) infoPrevBtn.addEventListener('click', () => wechsleStation(-1));
if (infoNextBtn) infoNextBtn.addEventListener('click', () => wechsleStation(1));

// Swipe auf dem Foto
let swipeStartX = 0;
infoFotoImg.addEventListener('touchstart', e => {
  swipeStartX = e.touches[0].clientX;
}, { passive: true });
infoFotoImg.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - swipeStartX;
  if (Math.abs(dx) > 40 && aktiveFotos.length > 1) {
    aktiverFotoIndex = dx < 0
      ? (aktiverFotoIndex + 1) % aktiveFotos.length
      : (aktiverFotoIndex - 1 + aktiveFotos.length) % aktiveFotos.length;
    aktualisiereFoto();
  }
}, { passive: true });

infoPrev.addEventListener('click', () => {
  aktiverFotoIndex = (aktiverFotoIndex - 1 + aktiveFotos.length) % aktiveFotos.length;
  aktualisiereFoto();
});

infoNext.addEventListener('click', () => {
  aktiverFotoIndex = (aktiverFotoIndex + 1) % aktiveFotos.length;
  aktualisiereFoto();
});

infoVollbild.addEventListener('click', () => {
  vollbildImg.src = aktiveFotos[aktiverFotoIndex];
  vollbildOverlay.classList.add('open');
});

vollbildClose.addEventListener('click', () => {
  vollbildOverlay.classList.remove('open');
});

vollbildPrev.addEventListener('click', () => {
  aktiverFotoIndex = (aktiverFotoIndex - 1 + aktiveFotos.length) % aktiveFotos.length;
  aktualisiereFoto();
  vollbildImg.src = aktiveFotos[aktiverFotoIndex];
});

vollbildNext.addEventListener('click', () => {
  aktiverFotoIndex = (aktiverFotoIndex + 1) % aktiveFotos.length;
  aktualisiereFoto();
  vollbildImg.src = aktiveFotos[aktiverFotoIndex];
});

// ============================================================
// KOMMENTARE
// ============================================================

// ---- Supabase-Konfiguration ----
// Den anon-public-Key aus Supabase → Project Settings → API hier einsetzen:
const SUPABASE_URL  = 'https://frxclqyeimupmaiuvndl.supabase.co';
const SUPABASE_ANON = 'sb_publishable_zeBajWW8Ab2TjAYboip_yg_il422nwf';
const KOMMENTAR_API = SUPABASE_URL + '/rest/v1/kommentare';

// Header passend zum Key-Typ bauen:
// - Legacy anon-Key ist ein JWT (beginnt mit "eyJ") und darf auch im Authorization-Header stehen.
// - Neuer publishable Key (sb_publishable_…) darf NUR im apikey-Header stehen, nicht als Bearer.
function buildHeaders(extra) {
  const h = { 'apikey': SUPABASE_ANON, 'Content-Type': 'application/json' };
  if (SUPABASE_ANON.indexOf('eyJ') === 0) {
    h['Authorization'] = 'Bearer ' + SUPABASE_ANON;
  }
  return Object.assign(h, extra || {});
}

function formatDatum(iso) {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

// Nur freigegebene Kommentare einer Station laden
async function ladeKommentare(stationId) {
  const url = KOMMENTAR_API
    + '?station_id=eq.' + encodeURIComponent(stationId)
    + '&freigegeben=eq.true'
    + '&order=created_at.asc'
    + '&select=id,name,text,created_at';
  try {
    const res = await fetch(url, { headers: buildHeaders() });
    if (!res.ok) { console.error('Supabase laden:', res.status, await res.text()); return []; }
    const rows = await res.json();
    return rows.map(r => ({ id: r.id, name: r.name, text: r.text, datum: formatDatum(r.created_at) }));
  } catch (e) {
    console.error('Supabase laden (Netzwerk):', e);
    return [];
  }
}

// Neuen Kommentar absenden – immer unbestätigt (freigegeben = false)
async function sendeKommentar(stationId, name, text) {
  try {
    const res = await fetch(KOMMENTAR_API, {
      method: 'POST',
      headers: buildHeaders({ 'Prefer': 'return=minimal' }),
      body: JSON.stringify({ station_id: String(stationId), name: name, text: text, freigegeben: false })
    });
    if (!res.ok) { console.error('Supabase senden:', res.status, await res.text()); return false; }
    return true;
  } catch (e) {
    console.error('Supabase senden (Netzwerk):', e);
    return false;
  }
}

let kommentareSichtbar = false;

// Zufällige aber stabile Positionen pro Kommentar
const POSITIONEN = [
  { top: '8%',  left: '4%',   rot: -2   },
  { top: '10%', right: '4%',  rot: 1.5  },
  { top: '45%', left: '3%',   rot: 1    },
  { top: '50%', right: '3%',  rot: -1.5 },
  { top: '25%', left: '30%',  rot: 2    },
  { top: '65%', left: '20%',  rot: -1   },
  { top: '30%', right: '20%', rot: 0.5  },
  { top: '70%', right: '15%', rot: -2   },
];

async function kommentareZuruecksetzen(stationId) {
  kommentareSichtbar = true; // beim Öffnen des Overlays direkt geöffnet
  const zettel = document.getElementById('kommentar-notizzettel');
  const toggleBtn = document.getElementById('kommentar-foto-toggle');
  if (!zettel) return;

  zettel.classList.add('sichtbar');
  const formular = document.getElementById('kommentar-formular');
  if (formular) formular.classList.add('sichtbar');
  if (toggleBtn) toggleBtn.classList.add('aktiv');

  await renderKommentare(stationId);
}

async function renderKommentare(stationId) {
  const zettel = document.getElementById('kommentar-notizzettel');
  if (!zettel) return;

  const alle = await ladeKommentare(stationId);
  // Falls inzwischen eine andere Station geöffnet wurde: Ergebnis verwerfen
  if (stationId !== aktuelleStationId) return;

  zettel.innerHTML = '';

  alle.forEach((k, i) => {
    const pos = POSITIONEN[i % POSITIONEN.length];
    const z = document.createElement('div');
    z.className = 'notizzettel';

    Object.entries(pos).forEach(([prop, val]) => {
      if (prop === 'rot') z.style.transform = `rotate(${val}deg)`;
      else z.style[prop] = val;
    });

    // Inhalt per textContent setzen – kein HTML aus Nutzereingaben einschleusbar
    const textEl = document.createElement('div');
    textEl.className = 'notizzettel-text';
    textEl.textContent = k.text;

    const metaEl = document.createElement('div');
    metaEl.className = 'notizzettel-meta';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = k.name;
    const datumSpan = document.createElement('span');
    datumSpan.textContent = k.datum;
    metaEl.appendChild(nameSpan);
    metaEl.appendChild(datumSpan);

    z.appendChild(textEl);
    z.appendChild(metaEl);

    z.addEventListener('click', () => z.classList.toggle('expanded'));
    zettel.appendChild(z);
  });

  const anzahl = document.getElementById('kommentar-anzahl');
  if (anzahl) anzahl.textContent = alle.length > 0
    ? alle.length + (alle.length === 1 ? ' Kommentar' : ' Kommentare') : '';
}

// Sprechblasen-Toggle
const kommentarFotoToggle = document.getElementById('kommentar-foto-toggle');
if (kommentarFotoToggle) {
  kommentarFotoToggle.addEventListener('click', () => {
    if (!aktuelleStationId) return;
    kommentareSichtbar = !kommentareSichtbar;
    document.getElementById('kommentar-notizzettel').classList.toggle('sichtbar', kommentareSichtbar);
    document.getElementById('kommentar-formular').classList.toggle('sichtbar', kommentareSichtbar);
    kommentarFotoToggle.classList.toggle('aktiv', kommentareSichtbar);
    if (kommentareSichtbar) renderKommentare(aktuelleStationId);
  });
}

// Kommentar senden
const kommentarSendenBtn = document.getElementById('kommentar-senden');
if (kommentarSendenBtn) {
  kommentarSendenBtn.addEventListener('click', async () => {
    const textEl = document.getElementById('kommentar-text');
    const nameEl = document.getElementById('kommentar-name');
    if (!textEl || !nameEl) return;
    const text = textEl.value.trim();
    const name = nameEl.value.trim() || 'Anonym';
    if (!text || !aktuelleStationId) return;

    kommentarSendenBtn.disabled = true;
    let ok = false;
    try {
      ok = await sendeKommentar(aktuelleStationId, name, text);
    } finally {
      kommentarSendenBtn.disabled = false;   // Button wird IMMER wieder freigegeben
    }

    if (!ok) {
      textEl.placeholder = '⚠ Konnte nicht gesendet werden. Bitte nochmal versuchen.';
      setTimeout(() => { textEl.placeholder = 'Kommentar schreiben…'; }, 4000);
      return;
    }

    textEl.value = '';
    nameEl.value = '';
    // Neuer Kommentar ist noch nicht freigegeben → erscheint erst nach Freischaltung
    textEl.placeholder = '✓ Danke! Wird nach Freischaltung angezeigt.';
    setTimeout(() => { textEl.placeholder = 'Kommentar schreiben…'; }, 3000);
  });
}

// ============================================================
// START
// ============================================================

setupThemenBar();
setupFahrradBtn();
setupZoomBtns();

// Aktiver Nav-Link ("Karte") schließt das Info-Panel statt die Seite neu zu laden.
// So kommt man aus der Detailansicht zurück zur Kartenübersicht ohne Reload.
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === '#') {
    a.addEventListener('click', e => {
      const panel = document.getElementById('info-panel');
      if (panel && panel.classList.contains('open')) {
        e.preventDefault();
        panel.classList.remove('open');
        const kartenButtons = document.getElementById('karten-buttons');
        if (kartenButtons) kartenButtons.style.display = 'flex';
        const fotoWrapper = document.getElementById('info-foto-wrapper');
        if (fotoWrapper) fotoWrapper.style.height = '';
      }
    });
  }
});

// Direkte Klicks auf Punkte (umgeht Leaflets Marker-Überlappungs-Erkennung)
document.getElementById('map').addEventListener('click', e => {
  const punkt = e.target.closest('.foto-pin-punkt');
  if (!punkt) return;
  const id = Number(punkt.dataset.stationId);
  const station = stations.find(s => s.id === id);
  if (station) {
    e.stopPropagation();
    addCard(station);
  }
}, true);
updateMap();
// ============================================================
// STANDBY / SCREENSAVER – schwimmende Überschrift bei Inaktivität
// ============================================================
(function () {
  const IDLE_MS = 3000; // nach 3 s ohne Aktivität erscheint die Überschrift

  // Nur der Text – keine flächige Überlagerung. Karte bleibt voll sichtbar.
  const overlay = document.createElement('div');
  overlay.id = 'standby';
  const text = document.createElement('div');
  text.id = 'standby-text';
  text.innerHTML = 'Was<br>vom<br>Hafen<br>bleibt'; // zusammenhängender Block, zweizeilig
  overlay.appendChild(text);
  document.body.appendChild(overlay);

  let idleTimer = null;
  let aktiv     = false; // Standby sichtbar?
  let rafId     = null;
  let startTs   = null;
  let lastTs    = null;
  let posY      = 0;     // aktuelle vertikale Position (oben-Kante des Textblocks)

  const SPEED = 0.4; // Aufwärtstempo (px pro 16ms) – wie die Intro-Fotos

  // Nicht erscheinen, solange Intro oder Info-Panel offen sind
  function blockiert() {
    const intro = document.getElementById('intro');
    if (intro && !intro.classList.contains('gone')) return true;
    const panel = document.getElementById('info-panel');
    if (panel && panel.classList.contains('open')) return true;
    return false;
  }

  function zeigen() {
    if (aktiv || blockiert()) return;
    aktiv = true;
    startTs = null;
    lastTs = null;

    // Voll sichtbarer Startpunkt: oben-Kante zwischen Bildschirmmitte und knapp über
    // dem unteren Rand → der ganze Text ist sofort zu sehen, mal mittig, mal unten.
    const H = window.innerHeight;
    const blockH = text.offsetHeight || 200;
    const mitte = (H - blockH) / 2;
    const unten = H - blockH - 24;
    posY = mitte + Math.random() * Math.max(0, unten - mitte);

    overlay.classList.add('sichtbar');
    rafId = requestAnimationFrame(schwimmen);
  }

  function verstecken() {
    if (!aktiv) return;
    aktiv = false;
    overlay.classList.remove('sichtbar');
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Bewegung wie die Fotos im Intro: von unten nach oben, mit leichtem seitlichem
  // Schwingen, in Endlosschleife.
  function schwimmen(ts) {
    if (!aktiv) return;
    if (startTs === null) { startTs = ts; lastTs = ts; }
    const dt = Math.min(ts - lastTs, 50);
    lastTs = ts;
    const t = (ts - startTs) / 1000; // Sekunden

    const H = window.innerHeight;
    const blockH = text.offsetHeight || 200;

    posY -= SPEED * (dt / 16);                 // nach oben
    if (posY + blockH < -20) posY = H + 20;    // oben raus → unten wieder rein

    const waveX = Math.sin(t * 1.1) * 14;      // sanftes seitliches Schwingen

    text.style.transform = `translate(${waveX}px, ${posY}px)`;

    rafId = requestAnimationFrame(schwimmen);
  }

  // Jede Nutzeraktivität blendet aus und startet den Timer neu
  function aktivitaet() {
    verstecken();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(zeigen, IDLE_MS);
  }

  ['mousemove', 'mousedown', 'wheel', 'keydown', 'touchstart', 'touchmove', 'scroll', 'pointerdown']
    .forEach(ev => window.addEventListener(ev, aktivitaet, { passive: true, capture: true }));

  aktivitaet(); // Timer initial starten
})();
