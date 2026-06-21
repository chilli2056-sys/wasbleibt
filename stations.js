// ============================================================
// 📍 STATIONEN – zentrale Datei für Karte + Archiv
//    Jede Station kann mehreren Themen, Routen und Zeitspannen
//    zugeordnet werden.
//
//    foto:  erstes/einziges Foto (für Marker + Archiv-Kachel)
//    fotos: alle Fotos für die Slideshow im Info-Panel
//           (weglassen oder leer lassen wenn nur ein Foto)
// ============================================================

// ── KATEGORIEN – einzige Quelle für Karte und Archiv ──────────
// typ: 'thema' → filtert Stationen nach station.themen
// Die Fahrradroute wird über den Fahrrad-Button (oben rechts) gesteuert.
const kategorien = [
  { typ: 'thema', wert: 'Hafenreste',               label: 'Hafenreste'       },
  { typ: 'thema', wert: 'Arbeitsorte',          label: 'Arbeitsorte'        },
  { typ: 'thema', wert: 'Zusammenkünfte',        label: 'Zusammenkünfte'      },
  { typ: 'thema', wert: 'Unterkünfte',        label: 'Unterkünfte'      },
  { typ: 'thema', wert: 'Gebäude',            label: 'Gebäude'          },
  { typ: 'thema', wert: 'Zoll',  label: 'Zoll'},
  { typ: 'thema', wert: 'gleise',               label: 'Gleissysteme'       },
  
];

const stations = [
  {
    id: 1,
    name: "Löwenkopf Schlachte",
    coords: [53.073124, 8.806198],
    info: "seit 1895 als Hafendenkmal",
    adresse: "3RF4+7F",
    fakten: ["Hauptnutzungszeit: ca. 1895–heute",
  "Nutzung beendet: nicht beendet",
  "Steinerner Löwenkopf als Relikt der historischen Hafenanlagen an der Schlachte."],
    foto: "fotos/loewe/loewe.jpg",
    fotos: [
      "fotos/loewe/loewe.jpg",
      "fotos/loewe/loewe_histo.jpg",
      "fotos/loewe/loewe_histo2.jpg"
    ],
    themen: ["Hafenreste"],
    routen: ["fahrradroute"],
    quellen: [
      "16.06.2026: https://www.kreiszeitung.de/lokales/bremen/eine-aufwendige-konstruktion-9399400.html.com"
    ],
  },
  {
    id: 2,
    name: "Ehemalige Kellogg's Fabrik",
    coords: [53.082816, 8.781034],
    info: "Überseeinsel Bereich.",
    adresse: "Auf der Muggenburg 30",
    fakten: ["Hauptnutzungszeit: 1964–2017",
  "Einzige Kellogg's-Produktionsstätte Deutschlands.",
  "Produktion der letzten Schicht am 23.11.2017."],
    foto: "fotos/Kelloggs/kelloggs3.jpg",
    fotos: [
      "fotos/Kelloggs/Kelloggs1.jpg",
      "fotos/Kelloggs/kelloggs2.jpg",
      "fotos/Kelloggs/kelloggs3.jpg"
    ],
    themen: ["Arbeitsorte"],
    routen: ["fahrradroute", "einzelort"],
  },
  {
    id: 3,
    name: "ehemalige Zoll\u00ADkantine",
    coords: [53.08903121948242, 8.78400707244873],
    info: "ehemalige Zollkantine",
    adresse: "Hansator 1/Etage 2",
    fakten: [ "Hauptnutzungszeit: ca. 1950er–1990er Jahre",
  "Nutzung beendet: vermutlich Ende 20. Jahrhundert",
  "Treffpunkt für Zollbedienstete im Überseehafengebiet."],
    foto: "",
    fotos: [],
    themen: ["Zoll", "Zusammenkünfte", "Arbeitsorte"],
    routen: ["fahrradroute"],
  },
  {
    id: 4,
    name: "Molen\u00ADfeuer",
    coords: [53.106128, 8.747815],
    info: "Markanter Turm am Hafeneingang.",
    adresse: "4P4X+F3",
    fakten: ["Hauptnutzungszeit: seit 1906",
  "Markierte die Einfahrt in die Hafenbecken."],
    foto: "fotos/molenturm/Molenturm1.jpg",
    fotos: [
      "fotos/molenturm/Molenturm1.jpg",
      "fotos/molenturm/Molenturm2.jpg",
      "fotos/molenturm/Molenturm3.jpg",
      "fotos/molenturm/molen_histo.jpg"
    ],
    themen: ["Hafenreste"],
    routen: ["fahrradroute"],
  },
  {
    id: 5,
    name: "ehemaliges Kühlhaus",
    coords: [53.105905, 8.755237],
    info: "Blick über den Hafen.",
    adresse: "Eduard-Suling-Straße",
    fakten: [ "Hauptnutzungszeit: ca. 1915–1980er Jahre",
  "Nutzung beendet: Ende 20. Jahrhundert",
  "Diente der Lagerung gekühlter Importwaren.",],
    foto: "fotos/Kuehlhaus/Kuehlhaus.jpg",
    fotos: ["fotos/Kuehlhaus/Kuehlhaus.jpg"],
    themen: ["Hafenreste"],
    routen: ["fahrradroute"],
    quellen: [
      "26.02.2025 https://www.weser-kurier.de/bremen/wirtschaft/altes-kuehlhaus-in-der-bremer-ueberseestadt-soll-energiezentrale-werden-doc7p7adz2rjo21b13tjjpk \u00AD26.02.2026 https://www.senatspressestelle.bremen.de/pressemitteilungen/klimaneutrales-energieprojekt-in-der-ueberseestadt-419646"
    ],
  },
  {
    id: 6,
    name: "Hafen\u00ADcasino",
    coords: [53.096992, 8.773187],
    info: "Sozialer Treffpunkt am Hafen.",
    adresse: "Waller Stieg 6",
    fakten: ["Hauptnutzungszeit: ca. 1920er–1970er Jahre",
  "Beliebter Treffpunkt für Hafenarbeiter und Angestellte."],
    foto: "",
    fotos: [],
    themen: ["Zusammenkünfte"],
    routen: ["fahrradroute", "einzelort"],
  },
  {
    id: 7,
    name: "Altes Hafen\u00ADbecken",
    coords: [53.097389, 8.773819],
    info: "Historisches Hafenbecken.",
    adresse: "Herzogin-Cecilie-Allee",
    fakten: ["Hauptnutzungszeit: 1888–1998",
  "Nutzung beendet: 1998",
  "Teil des Überseehafens.",
  "Für die Entwicklung der Überseestadt verfüllt."],
    foto: "fotos/Hafenbecken/Hafenbecken1.jpg",
    fotos: [
      "fotos/Hafenbecken/Hafenbecken1.jpg",
      "fotos/Hafenbecken/hafenbecken2.jpg",
      "fotos/Hafenbecken/Hafenbecken3.jpg",
      "fotos/Hafenbecken/Hafenbecken4.jpg",
      "fotos/Hafenbecken/Hafenbecken5.jpg",
      "fotos/Hafenbecken/Hafenbecken6.jpg"
    ],
    themen: ["Hafenreste"],
    routen: ["fahrradroute"],
  },
  {
    id: 8,
    name: "Ulrichs\u00ADschuppen",
    coords: [53.105780, 8.762667],
    info: "Gedenkort im Hafen.",
    adresse: "Diersch-und-Schröder-Str. 19",
    fakten: [  "Hauptnutzungszeit: 1912/13",
  "Abriss 2019",
  "1912/13 als Hafenschuppen errichtet.",
  "1942–1944 als Lager für französische Kriegsgefangene und Zwangsarbeiter genutzt.",
  "2024 wurde am Standort ein Gedenkort eröffnet."],
    foto: "fotos/ulrichsschuppen/ulrich.jpg",
    fotos: ["fotos/ulrichsschuppen/ulrich.jpg"],
    themen: ["Unterkünfte"],
    routen: ["fahrradroute", "einzelort"],
  },
  {
    id: 9,
    name: "Gäste\u00ADhaus",
    coords: [53.113972, 8.743349],
    info: "Endpunkt mit Blick auf den Werfthafen.",
    adresse: "Cuxhavener STraße",
    fakten: ["Hauptnutzungszeit: seit Mitte 20. Jahrhundert",
  "Unterkunft für Beschäftigte und Gäste des Hafenbereichs.",
"heute leerstehend"],
    foto: "fotos/Gaestehaus.jpg",
    fotos: [
      "fotos/Gaestehaus.jpg"
    ],
    themen: ["Gebäude", "Unterkünfte", "Zusammenkünfte"],
    routen: ["fahrradroute"],
  },
  {
    id: 10,
    name: "Gleise Übersee\u00ADhafen",
    coords: [53.09562608474965, 8.773603436532781],
    info: "ehemalige Gleise",
    adresse: "Überseetor",
    fakten: ["Hauptnutzungszeit: ca. 1888–1998",
  "Nutzung beendet: 1998",
  "Verbanden Hafenanlagen mit dem Bremer Eisenbahnnetz."],
    foto: "fotos/Gleisespeicher/Gleise2.jpg",
    fotos: [
      "fotos/Gleisespeicher/Gleise2.jpg",
      "fotos/Gleisespeicher/Gleise1.jpg"
    ],
    themen: ["gleise"],
    routen: ["fahrradroute"],
  },
  
  {
    id: 12,
    name: "Gleis\u00ADsysteme Übersee\u00ADhafen",
    coords: [53.098333863533085, 8.766805371713273],
    info: "ehemalige Gleise",
    adresse: "Am Speicher XI",
    fakten: ["Hauptnutzungszeit: ca. 1888–1998",
  "Nutzung beendet: größtenteils Ende der 1990er Jahre",
  "Umfangreiches Rangier- und Hafenbahnsystem."],
    foto: "fotos/Gleisespeicher/Gleisehfk1.jpg",
    fotos: [
      "fotos/Gleisespeicher/Gleisehfk1.jpg",
      "fotos/Gleisespeicher/Gleisehfk.jpg",
       "fotos/Gleisespeicher/speicher_histo.jpg"
    ],
    themen: ["industrie"],
    routen: ["fahrradroute"],
  },
  {
    id: 13,
    name: "Vieh-Lade\u00ADrampe",
    coords: [53.11872607927704, 8.735613191301365],
    info: "ehemalige Viehladerampe",
    adresse: "Kap-Horn-Straße",
    fakten: ["Hauptnutzungszeit: ca. 1890–1970",
  "Nutzung beendet: 1970er Jahre",
  "Export und Import von Schlacht- und Nutzvieh."],
    foto: "fotos/vieh/vieh1.jpg",
    fotos: [
      "fotos/vieh/vieh1.jpg",
      "fotos/vieh/vieh2.jpg",
      "fotos/vieh/vieh3.jpg",
      "fotos/vieh/vieh4.jpg",
      "fotos/vieh/vieh5.jpg",
      "fotos/vieh/Vieh_histo.jpg",
      "fotos/vieh/vieh_histo2.jpg",
      "fotos/vieh/vieh_histo3.jpg",
    ],
    themen: ["Hafenreste"],
    routen: ["fahrradroute"],
  },
  {
    id: 14,
    name: "Bunker Hornisse",
    coords: [53.1170359, 8.7357604],
    info: "U-Boot-Bunker Hornisse",
    adresse: "Kap-Horn-Straße 18",
    fakten: ["Hauptnutzungszeit: 1944–1945",
  "Unvollendeter U-Boot-Bunker.",
  "Errichtet durch Zwangsarbeiter im Zweiten Weltkrieg."],
    foto: "fotos/hornisse/hornisse3.jpg",
    fotos: [
      "fotos/hornisse/hornisse1.jpg",
      "fotos/hornisse/hornisse2.jpg",
      "fotos/hornisse/hornisse3.jpg"
    ],
    themen: ["Gebäude"],
    routen: ["fahrradroute"],
  },
  {
    id: 15,
    name: "ehemaliger Zollzaun Bremen",
    coords: [53.08891009473885, 8.78429353992328],
    info: "Überreste des ehemaligen Zollzauns des Bremerhafengebiets",
    adresse: "",
    fakten: ["Hauptnutzungszeit: ca. 1888–2007",
  "Nutzung beendet: 2007",
  "Grenze des zollrechtlichen Freihafengebiets.",
  "Nach Aufhebung des Freihafens weitgehend entfernt."],
    foto: "fotos/zoll/zoll1.jpg",
    fotos: [
      
      "fotos/zoll/zoll1.jpg",
      "fotos/zoll/zoll2.jpg",
      "fotos/zoll/zoll3.jpg",
      "fotos/zoll/zoll_histo.jpg"
    ],
    themen: ["Zoll", "Arbeitsorte"],
    routen: ["fahrradroute"],
  },

  {
    id: 16,
    name: "damals AG-Weser",
    coords: [53.11159943050704,8.744903963874723],
    info: "ehemaliges Hauptgebäude der Ag-Weser",
    adresse: "Waterfront Bremen, Ludwig-Plate-Straße",
    fakten: ["Hauptnutzungszeit: 1872–1983",
  "Nutzung beendet: 1983",
  "Eine der größten Werften Deutschlands.",
  "Bau von Handels- und Kriegsschiffen.",
  "Stilllegung nach der Werftenkrise."],
    foto: "fotos/agweser/agweser2.jpg",
    fotos: [
      "fotos/agweser/agweser1.jpg",
      "fotos/agweser/agweser2.jpg",
      "fotos/agweser/agweser3.jpg",
      "fotos/agweser/agweser4.jpg",
      "fotos/agweser/agweser_histo.jpg"
    ],
    themen: ["Arbeitsorte"],
    routen: ["fahrradroute"],
  },

  {
    id: 17,
    name: "ehemalige Hafen\u00ADschule",
    coords: [53.08943125812625,8.77872950978725],
    info: "Ehemaliges Ausbildungs- und Schulungszentrum für Hafen- und Logistikberufe im Bremer Hafengebiet.",
    adresse: "Konsul-Smidt-Straße 11",
    fakten: ["Hauptnutzungszeit: 1872–1983",
  "Standort im historischen Hafen- und Überseestadtgebiet Bremens.",
  "Diente der Aus- und Weiterbildung von Beschäftigten der Hafenwirtschaft.",
  "Später als Hafenfachschule bzw. maritimes Weiterbildungszentrum genutzt.",],
    foto: "fotos/hafenschule/hafenschule1.jpg",
    fotos: [
      "fotos/hafenschule/hafenschule1.jpg",
      "fotos/hafenschule/hafenschule2.jpg",
      "fotos/hafenschule/hafenschule3.jpg",
      "fotos/hafenschule/schule_histo.jpg"
    ],
    themen: ["Arbeitsorte", "Zusammenkünfte"],
    routen: ["fahrradroute"],
  },

  {
    id: 18,
    name: "Unter\u00ADstand",
    coords: [53.09916471448399,8.774514902390651],
    info: "ehemaliger Unterstand für Sexarbeiterinnen",
    adresse: "Cuxhavener Straße",
    fakten: ["Hauptnutzungszeit: 1872–1983",
  "Nutzung beendet: 1983",
  "Eine der größten Werften Deutschlands.",
  "Bau von Handels- und Kriegsschiffen.",
  "Stilllegung nach der Werftenkrise."],
    foto: "fotos/sexarbeiterinnen/unterstand.jpg",
    fotos: [
      "fotos/sexarbeiterinnen/unterstand.jpg",
    ],
    themen: ["Arbeitsorte", "Zusammenkünfte"],
    routen: ["fahrradroute"],
  }
];
