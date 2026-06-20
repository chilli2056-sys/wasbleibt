// ============================================================
// TEXTE ZU DEN STATIONEN
// ============================================================
// Jeder Eintrag entspricht einer Station in stations.js.
// Der Schlüssel muss mit der station.id übereinstimmen.
//
// Absätze mit Leerzeile trennen:
//   1: `Erster Absatz.
//
// Zweiter Absatz.`,
//
// ── ZWEI SCHREIBWEISEN ──────────────────────────────────────
// A) Normaler Text  → String, komplett 100 % blau:
//      5: `Mein Fließtext ...`,
//
// B) Interview       → Array aus { intro } / { frage } / { antwort }:
//      6: [
//        { intro:   "Ein Zeitzeuge erzählt:" },          // 100 % blau, links
//        { frage:   "Wie war die Arbeit am Hafen?" },    //  79 % blau, rechts
//        { antwort: "Hart, aber wir waren eine Gemeinschaft." }, // 100 % blau, links
//        { frage:   "Und nach der Schließung?" },
//        { antwort: "Viele sind weggezogen." },
//      ],
//    Jedes Element ist ein { ... }-Objekt – freier Text ohne
//    geschweifte Klammern ist NICHT erlaubt.
// ============================================================

const texte = {

  // Löwenkopf an der Wilhelm-Kaisen-Brücke
  1: `Die Löwenköpfe an der Schlachte sind Überbleibsel der vier historische Löwenköpfe, die einst die zweite große Weserbrücke, welche 1893 gebaut wurde, zierten. Zwei schauten flussaufwärts, zwei flussabwärts. Am 25. April 1945 wurde die Brücke von den Nationalsozialisten gesprengt, um den Vormarsch der alliierten Streitkräfte zu erschweren. Dabei stürzten die Löwenköpfe in die Weser und galten jahrzentelang als verschollen. 
  1998 wurden bei der Weserufer-Sanierung zwei der vier Löwenköpfe auf dem Flussgrund wiederentdeckt.`,

  // Ehemalige Kellogg's-Fabrik
  2: `Um eine vergleichende Beurteilung vornehmen zu können, wurden im Rahmen einer von der Stadtgemeinde Bremen, der Firma Kellogg sowie WPD initiierten Vorstudie sechs Teams beauftragt, mögliche Entwicklungen aufzuzeigen – zunächst bezogen auf die Gesamtfläche Europahafen-Süd. Diese Phase endete im Frühjahr 2018. Im nächsten Schritt wurde das Verfahren durch die Auswahl von drei auf das Kellogg-Grundstück beschränkte Entwürfe vertieft. Die Untersuchung dieser erfolgte dann durch die verbliebenenen beteiligten Parteien, Vertreter:innen der Stadt Bremen und den Unternehmen WPD sowie Robert C. Spies – das Immobilienunternehmen war zunächst durch Kellogg mandatiert und steht WPD bzw. einer mit der WPD verbundenen Projektgesellschaft zukünftig beratend zur Seite.

Der nächste Planungsschritt war die Erstellung eines städtebaulichen Rahmenplans für die Gesamtfläche der Überseeinsel zwischen dem Europahafen und der Weser unter Einbeziehung des Kellogg-Grundstücks. Hierzu gab es parallel ein breites öffentliches Beteiligungsverfahren. Dieser Rahmenplan war wiederum in einem weiteren Schritt Grundlage bzw. Bestandteil des weiterzuentwickelnden Masterplans für die gesamte Überseestadt. 
`,

  // ehemalige Zollkantine
  3: ``,

  // Molenfeuer
  4: ``,

  // ehemaliges Kühlhaus
  5: `Das ehemalige Kühllager in der Bremer Überseestadt entstand zwischen 1946 und 1949 in der unmittelbaren Nachkriegszeit. Angesichts der damals befürchteten Lebensmittel- und insbesondere Fleischknappheit plante die Stadt Bremen den Bau großer Kühlkapazitäten, um tiefgefrorene Warenlieferungen – unter anderem aus den USA – über längere Zeit lagern zu können. Noch während der Bauarbeiten verbesserte sich jedoch die Versorgungslage, sodass die ursprünglichen Pläne nur teilweise verwirklicht wurden und einige der vorgesehenen Nutzungen bereits früh wieder an Bedeutung verloren.
Trotzdem prägte das Kühllager über Jahrzehnte die Hafenlandschaft der Überseestadt. Rund 40 Jahre lang wurde es von der Bremerhavener Kühlhäuser GmbH betrieben, die später in die Bremer Lagerhausgesellschaft (BLG) überging. Mit dem Wandel der Hafenwirtschaft und veränderten Anforderungen an Lagerung und Logistik verlor das Gebäude schließlich seine Funktion und wurde stillgelegt.
Heute befinden sich das Grundstück und das markante Bauwerk im Besitz der Wirtschaftsförderung Bremen (WFB). Ein geplanter Abriss wurde bislang nicht umgesetzt, da das Gebäude stark schadstoffbelastet ist und ein Rückbau mit erheblichem Aufwand verbunden wäre. Stattdessen gibt es Überlegungen, den Standort künftig als Energieleitzentrale zu nutzen, die die umliegenden Industrie- und Gewerbeflächen versorgen soll. Wann diese Pläne umgesetzt werden, ist derzeit jedoch noch offen.`,

  // Hafencasino
  6: ``,

  // Altes Hafenbecken
  7: ``,

  // Ulrichsschuppen
  8: ``,

  // Gästehaus
  9: ``,

  // Gleise Überseehafen
  10: ``,

  // Atlas Werft
  11: ``,

  // Gleissysteme Überseehafen
  12: ``,

  // Vieh-Laderampe  ── INTERVIEW ──
  13: [
    { intro:   "Ein ehemaliger Zollbeamter erzählt über den Im- und Export von Tieren in Bremen." },
    { frage:   "Es gab da hinten eine Viehrampe Richtung Weser AG, oder? Ich habe Bilder gesehen, mit z.B. Giraffen und anderen exotischen Tieren. Gab es auch Tierschmuggel, oder lief das legal ab?" },
    { antwort: "Ja, die gab es hier, aber an Schmuggelfälle kann ich mich nicht erinnern. Giraffen und andere Tiere wurden importiert. Es gab in Bremen einen Tierpark, bei Oberneuland. In den 70ern, es ging Ende sechziger los. Ein Inder war das. Der hatte da einen Tierpark, und der war nebenbei auch Tierimporteur. Also nicht nur für seinen Tierpark Tiere importiert, allgemein. Für andere Zoos hat er auch Tiere importiert. Die kamen ja alle nach Bremen rein. Da waren Giraffen, Affen, Zebras, Löwen, also alles Mögliche. Ja, und da hat man sich keine Gedanken drüber gemacht, wie es den Tieren geht. Da hatte man noch keine andere Vorstellung. Die Schiffe, dann der Seegang und dann die Kisten offen und dann über See, ja. So war das früher." },
  ],

  // Bunker Hornisse
  14: ``,

  // ehemaliger Zollzaun Bremen
  15: ``,

  // damals AG-Weser
  16: ``,

  // ehemalige Hafenschule
  17: ``,

  // Unterstand
  18: ``,

};

// ============================================================
// Render-Helfer – wird von index.html (script.js) UND archiv.html
// genutzt. Erkennt automatisch: String = normaler Text,
// Array = Interview (intro / frage / antwort).
// ============================================================
function renderBeschreibung(quelle) {
  const esc = t => String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (!quelle) return '';

  // Interview: Array aus { intro } / { frage } / { antwort }
  if (Array.isArray(quelle)) {
    return quelle.map(e => {
      if (e && e.intro)   return '<p class="interview-intro">'   + esc(e.intro)   + '</p>';
      if (e && e.frage)   return '<p class="interview-frage">'   + esc(e.frage)   + '</p>';
      if (e && e.antwort) return '<p class="interview-antwort">' + esc(e.antwort) + '</p>';
      return '';
    }).join('');
  }

  // Normaler Text: String, ganz blau (Absätze über Leerzeilen)
  return esc(quelle);
}