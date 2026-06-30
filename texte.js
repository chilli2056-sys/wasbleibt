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
  1: `Die Löwenköpfe an der Schlachte sind Überbleibsel der vier historischen Löwenköpfe, die einst die zweite große Weserbrücke, welche 1893 gebaut wurde, zierten. Zwei schauten flussaufwärts, zwei flussabwärts. Am 25. April 1945 wurde die Brücke von den Nationalsozialisten gesprengt, um den Vormarsch der alliierten Streitkräfte zu erschweren. Dabei stürzten die Löwenköpfe in die Weser und galten jahrzehntelang als verschollen. 
  1998 wurden bei der Weserufer-Sanierung zwei der vier Löwenköpfe auf dem Flussgrund wiederentdeckt.`,

  // Ehemalige Kellogg's-Fabrik
  2: [{ intro: "TEXT COMING SOON..." }],

  // ehemalige Zollkantine
  3: [
    { intro:   "Ein ehemaliger Zollbeamter erzählt über die Zollämter und das Essen und Trinken in der Dienstzeit..." },
    { antwort: "...damals im Schuppen gab es sogar einen Bierautomaten, es wurde schon viel getrunken." },
    { frage:   "Ach krass." },
    { antwort: "Also das war mal. Ich habe mal gehört, das ist durch die Erlebnisse aus Kriegszeiten. Die Leute lebten ja noch und haben dann gearbeitet. Nach diesen schweren Zeiten haben die angefangen wirklich viel Alkohol zu trinken. Das war wirklich ein Problem. Und es gab überall Alkohol, auch im öffentlichen Dienst. Bei uns beim Zoll wurde auch ganz gerne einer genippt, während der Dienstleistung. Das ist echt eine andere Zeit gewesen, das war fast normal. Wenn einer Geburtstag hatte, der musste schon eine Flasche mitbringen. Also das war so, das gibt es eben heute nicht mehr. Die sind vorbei, die Zeiten." },
    { antwort: "...Als ich anfing, gab es 12 Zollämter. Zollamt Hansa war ein Zollamt, Zollamt Oberweser war eigenständiges Zollamt. Zollamt Überseestadt war eigenständig, Zollamt Neustädter Hafen. In Hemelingen gab es einen Zollarm, in Vegesack, ich glaube 12 Zollämter gab es einfach in den 70ern. Und heute gibt es nur noch ein einziges in Bremen." },
    { frage:   "Und die haben dann alle in der Zollkantine auch gegessen, oder?" },
    { antwort: "Nicht alle, nur die am Hansa-Tor, wo wir waren. Da gab es eine Kantine oben, und da war auch eine Dame, die war beschäftigt. Die war dort nebenbei, ich weiß gar nicht, ich glaube die war eigentlich Angestellte beim Zoll, wurde aber abgestellt, um für die Kollegen mal was zu kochen. Es gab einfaches Essen, Bockwurst und so. Aber es gab auf jeder Dienststelle Mittag. Beim Zollamt Europahafen z.B., da haben die Kollegen im kleinen Kocher irgendwas gemacht. Überall haben die Kollegen selber gekocht und im Neustädter Hafen war auch eine Kantine eingerichtet. Und da wurden dann Kollegen abgestellt zum, da gab es eine Fritteuse, für Bockwürstchen. Da wechselte der Küchendienst ab. Zum Küchendienst wurde man freiwillig abgestellt, dann durfte man etwas eher nach Hause gehen. Heute undenkbar. Ja, ja, das gibt es nicht mehr." },
    { antwort: "Aber das war ganz nett. Es gab auf jeder Dienststelle eine Kochecke und es gab auch Kühlschränke. Das gibt es heute nicht mehr. Ich war zum Schluss beim Hauptzollamt. Da gab es so eine Teeküche mit einem Kühlschrank. Und da konnte man sich einen Tee oder Kaffee machen. Ja. Aber nicht mal Sitzgelegenheiten. Also man musste, am Arbeitsplatz dann essen oder dort Kaffee trinken und war eher für sich allein. Also, das wär damals undenkbar gewesen. Beim Hansa-Tor, da haben die auch vorne am Zolltor, wo die Kontrolle stattfand - da waren die Wachmeister im einfachen Dienst tätig - die haben da immer auf dem Posten draußen einen Grill oder Elektrogrill aufgebaut und dann gebrutzelt oder gegrillt." },
    { frage:   "Ich stelle mir das viel gemeinschaftlicher vor, als es heute ist." },
    { antwort:   "Ja, es wurde auch viel unternommen, gemeinsam zum Freimarkt gegangen, Kohlfahrten gemacht, Kohlabende zusammen. Das war dann auch ein Stück Heimat und Leben, was dann wegbrach als das so weniger wurde." },
  ],

  // Molenfeuer
  4: [{ intro: "TEXT COMING SOON..." }],

  // ehemaliges Kühlhaus
  5: `Das ehemalige Kühllager in der Bremer Überseestadt entstand zwischen 1946 und 1949 in der unmittelbaren Nachkriegszeit. Angesichts der damals befürchteten Lebensmittel- und insbesondere Fleischknappheit plante die Stadt Bremen den Bau großer Kühlkapazitäten, um tiefgefrorene Warenlieferungen – unter anderem aus den USA – über längere Zeit lagern zu können. Noch während der Bauarbeiten verbesserte sich jedoch die Versorgungslage, sodass die ursprünglichen Pläne nur teilweise verwirklicht wurden und einige der vorgesehenen Nutzungen bereits früh wieder an Bedeutung verloren.
Trotzdem prägte das Kühllager über Jahrzehnte die Hafenlandschaft der Überseestadt. Rund 40 Jahre lang wurde es von der Bremerhavener Kühlhäuser GmbH betrieben, die später in die Bremer Lagerhausgesellschaft (BLG) überging. Mit dem Wandel der Hafenwirtschaft und veränderten Anforderungen an Lagerung und Logistik verlor das Gebäude schließlich seine Funktion und wurde stillgelegt.
Heute befinden sich das Grundstück und das markante Bauwerk im Besitz der Wirtschaftsförderung Bremen (WFB). Ein geplanter Abriss wurde bislang nicht umgesetzt, da das Gebäude stark schadstoffbelastet ist und ein Rückbau mit erheblichem Aufwand verbunden wäre. Stattdessen gibt es Überlegungen, den Standort künftig als Energieleitzentrale zu nutzen, die die umliegenden Industrie- und Gewerbeflächen versorgen soll. Wann diese Pläne umgesetzt werden, ist derzeit jedoch noch offen.`,

  // Hafencasino
  6: [{ intro: "TEXT COMING SOON..." }],

  // Altes Hafenbecken
  7: [{ intro: "Ein ehemaliger Hafenmitarbeiter berichtet..." },
    {antwort: "Eine meiner erste Erinnerung an den Hafenbereich ist das ehemalige Hafenbecken des Überseehafens. Es wurde im Jahr 1998 mit dem Sand der Außenweser bei Baggerarbeiten zugeschüttet." },
  ],

  // Ulrichsschuppen
  8: [{ intro: "TEXT COMING SOON..." }],

  // Gästehaus
  9: [{ intro: "TEXT COMING SOON..." }],

  // Gleise Überseehafen
  10: [{ intro: "Ein ehemaliger Mitarbeiter des Weserbahnhofs erzählt..." },
    { frage:   "Welche Erinnerungen verbinden sie mit den Orten?" },
     { antwort:   "1982 gab es für die Unterhaltung der Gleisanlagen in den Hafengebieten noch drei getrennte Dienststellen. Einmal die Bahnmeisterei Bremen-Inlandshafen, die sich erstreckte von der DB-Grenze in Oslebshausen bis zum Bereich des Holzhafens. Dann die Bahnmeisterei Bremen-Zollausschluß im Anschluss an den Holzhafen bis zur DB-Strecke Richtung Delmenhorst, sowie die Bahnmeisterei Bremen-Grolland vom Bahnhof Bremen-Neustadt nach Bremen-Rablinghausen. Im Zuge der Umstrukturierung wurden die Hafenbahnmeistereien dann zusammengelegt. Meine Erinnerung an diesen Ort sind die ehemaligen Mitarbeiter der DB und der alte Lokschuppen mit einer Drehscheibe. Es herrschte eine laute Betriebsamkeit, sei es auf der Straße oder auf den Gleisen. Viel Ladeverkehr an den Speichern und Schuppen rund um die Hafenbacken." },
 { frage:   "Und wie fühlt es sich heute an, wenn sie hier stehen und die meisten Spuren verschwunden sind?" },
{ antwort:   "Was ist noch vom Hafen geblieben, seitdem ich das erste Mal hier war? Mir fehlt dieses Gefühl in einen Hafenbereich zu kommen, mit vielen Gleisen, Speicher, Schuppen und Kajen, nachdem hier ja auch immer mehr alte Gebäude abgerissen wurden und durch neue Büro- und Wohngebäude ersetzt wurden. " },    
],

  // Gleissysteme Überseehafen
  12: [{ intro: "TEXT COMING SOON..." }],

  // Vieh-Laderampe  ── INTERVIEW ──
  13: [
    { intro:   "Ein ehemaliger Zollbeamter erzählt über den Im- und Export von Tieren in Bremen." },
    { frage:   "Es gab da hinten eine Viehrampe Richtung Weser AG, oder? Ich habe Bilder gesehen, mit z.B. Giraffen und anderen exotischen Tieren. Gab es auch Tierschmuggel, oder lief das legal ab?" },
    { antwort: "Ja, die gab es hier, aber an Schmuggelfälle kann ich mich nicht erinnern. Giraffen und andere Tiere wurden importiert. Es gab in Bremen einen Tierpark, bei Oberneuland. In den 70ern, es ging Ende 60er los. Ein Inder war das. Der hatte da einen Tierpark, und der war nebenbei auch Tierimporteur. Also nicht nur für seinen Tierpark Tiere importiert, allgemein. Für andere Zoos hat er auch Tiere importiert. Die kamen ja alle nach Bremen rein. Da waren Giraffen, Affen, Zebras, Löwen, also alles Mögliche. Ja, und da hat man sich keine Gedanken drüber gemacht, wie es den Tieren geht. Da hatte man noch keine andere Vorstellung. Die Schiffe, dann der Seegang und dann die Kisten offen und dann über See, ja. So war das früher." },
  ],

  // Bunker Hornisse
  14: [{ intro: "TEXT COMING SOON..." }],

  // ehemaliger Zollzaun Bremen
  15: [
    { intro:   "Ein ehemaliger Zollbeamter erzählt." },
    { antwort: "Und ja, dann sind wir Streife gelaufen, nachts sogar zum Teil alleine durch den Hafen am Zaun entlang. Das wäre heute undenkbar." },
    { frage:   "Aber dann auch an den Hafenbecken entlang, oder?" },
    { antwort: "Ja, also hoch, runter, quer rüber. Erst gab es den Dienst nach Vorschrift, da wurde vorgeschrieben, wo man hergehen sollte. Und dann gab es auch später nach Ermessen. Da konnte man sich aussuchen, wie man wollte oder wo man kontrolliert." },
    { frage:   "Was war dann so die Hauptware, die geschmuggelt wurde, Drogen oder eher Zigaretten und Alkohol?" },
    { antwort: "Die Seeleute, die hatten zum Beispiel Zigaretten aus Ägypten, die kosten da ja nichts. Ja. Aber hier bei uns ja durch die hohe Steuer ja schon. Und die versuchten dann die rauszuschmuggeln oder zu verscheuern, z.B. im Golden City, eine der Hafenkneipen. Die Hafenarbeiter haben das auch versucht, die haben aber auch dann im Raum geraucht oder die Zigaretten in versteuerte Schachteln umgepackt. Das konnte man nicht nachweisen. Und dann gab es auch Diebstahl im Hafen. Es gab ja genug Waren, die damals auch schon aus allen Ländern kamen. Nicht nur Kaffee, Tabak und Baumwolle, was ja hier das Hauptgeschäft war. Auch kleine Sachen aus China. Ich hatte auch mal einen Fall, dass jemand da aus dem Speicher 1 hier rauskam, mit einem Karton unter dem Arm. Das wird ja normalerweise im LKW verladen, aber mit einem einzelnen Karton, das war ungewöhnlich. Den haben wir dann beobachtet, der fuhr weg mit dem Fahrrad, glaube ich. Den haben wir dann den Abend festgehalten." },
    { frage:   "Was war da drin?" },
    { antwort: "Eine Kindernähmaschine. Das wollte er rausschmuggeln, nur die Kindernähmaschine. Wir dachten dann, dass er Kinder hat. Der Mann war ein Hafenarbeiter, dort haben wir dann eine Hausdurchsuchung gemacht, bei ihm und dann auch im Keller. Und dann haben wir im Keller Unmengen an Spielzeug gefunden. In Kartons verpackt. Aus, weiß nicht, Japan war das, glaube ich, viel Kinderspielzeug. Also nicht nur diese Nähmaschine, anderes Spielzeug auch. Und da haben wir ihn dann gefragt warum und er meinte das habe ich für meine Enkelkinder. Da haben wir dann gefragt, wie alt die seien und er meinte Nee, die gibt es noch nicht, aber wenn es mal so weit ist. Dann hat er immer mal wieder ein bisschen was abgeschleppt. Zur Seite geschafft von dem Spielzeug. Das war eine verrückte Nacht." },
    { antwort: "Ja. Und man versuchte z.B. auch Roh-Kaffee rauszuschmuggeln. Den konnte man zuhause selber rösten. Ja, ja. Rohkaffee-schmuggel wurde viel versucht. Aber im generellen war Hafendiebstahl bei der BLG (Bremer-Lagerhaus-Gesellschaft) eigentlich eher selten, weil da war die BLG rigoros. Jemand, der was gestohlen hatte, der wurde gleich entlassen." },
  ],

  // damals AG-Weser
  16: [
        { intro:   "Ein ehemaliger Schiffsbauer erzählt über seine Erfahrungen und seine Zeit bei der AG Weser…" },          
       { antwort: "Ich bin gelernter Stahlschiffbauer. Im Unterschied zu Leuten wie Bootsbauer, was früher hauptsächlich nur mit Holz gemacht wurde, wurde nur Stahlblech gearbeitet und heute auch Kunststoff. Wir haben mit dicken Blechen gearbeitet. Das Dickste, was ich in Arbeit hatte, war 35 Meter, pardon, Millimeter. Aber es ist ja trotzdem echt dick. Dreieinhalb Zentimeter dick. Die Arbeit des Stahlschiffbauers ist Knochenarbeit, das war damals auch gefährlich. Unfälle waren an der Tagesordnung. Das ist dann später aber alles besser geworden. " },
       {frage:   "Wie war denn so ein typischer Arbeitstag damals? " },
       {antwort:   "Ja, man ging zur Schicht. Es war so, dass damals, 1957, war eine Hochzeit des Schiffsbetriebes. Das halbe Jahr, wo ich dort gearbeitet habe, war ich am Bau von sechs Schiffen beteiligt. An einem Tag liefen mal zwei Schiffe zusammen vom Stapel. Es gab fünf Helden, wo die Schiffe gebaut wurden. Das lief da zu der Zeit, da konnten sie arbeiten satt. Es war schon damals die fünf 5-Tage-Woche eingeführt, aber sonntags durften sie jederzeit kommen und Überstunden machen. Da freuten die sich drüber. Je mehr, je besser. " },
       {frage:   "Aber wurde man ganz gut bezahlt, oder? " },
       { antwort:   "Normal, ich verdiente in Waremünde 1,56 Mark pro Stunde und damals kostete ein Bier 30 oder 35 Cent in der Kneipe und ein Schnaps 10 Cent. Das war damals das normale Verdienst. Und wenn sie fertig waren, gab es eine Stempeluhr, das ist ja heute auch noch so in Betrieben, ich weiß nicht. Morgens mussten sie stempeln und wenn Feierabend war, dann auch. Da standen die Leute schon in der Schlange vor der Stempeluhr. Jeder wollte zuerst raus sein. " },    
       {antwort:   "Einmal, das war natürlich nicht üblich, da war verabredet, dass auch ein Kollege am Sonnabend kommen sollte und er kam zu spät, hat man gedacht. Da hat ein Kollege für den die Karte mitgestempelt. Der war dann gar nicht da, das war Arbeitszeitbetrug. Und dann zum Feierabend hat er die Karte wieder gestempelt. Also wenn das rausgekommen wäre, wäre er vielleicht entlassen worden. Aber der Vorarbeiter und der Meister, die haben das natürlich auch gewusst. Aber das wurde dann eben mal unter den Tisch gekehrt mit dem Zusammenhalt der Kollegen. Der war also sehr gut in dieser Beziehung. Das da auch mal so ein Betrug gemacht wurde. Es wurde während der Arbeit auch Bier und so getrunken, war auch normal. Das gibt es heute gar nicht mehr. Lohn wurde zweimal im Monat gezahlt, Bar in einer Papiertüte. " },
       {frage:   "Und dann musste man sich das immer abholen kommen? " },
       {antwort:   "Na, abholen oder sie kriegten das auf die Hand. " },
       {frage:   "Und wann haben Sie angefangen bei der AG Weser zu arbeiten? " },
       { antwort: "Ich habe gelernt, auf der Warnowwerft in Warnemünde, in der damaligen DDR. Das war eine neue Großwerft. Dort habe ich nach der Lehre noch ein halbes Jahr gearbeitet und später, als ich dort abgehauen war, aus dem real existierenden Sozialismus, habe ich noch ein halbes Jahr bei der AG Weser gearbeitet. In der Zwischenzeit auch auf einer Binnenschiffswerft in Dresden und ich war auch mal anderthalb Jahre in Brasilien. Als ich zurückkam, habe ich hier auch noch ein paar Wochen gearbeitet bei der AG Weser. Ja. Als ich hier gearbeitet habe, war ich in der Vormontage. Damals wurden noch einzelne Sektionen, also große Bauteile, in einer Halle gebaut, die wurden dann rausgebracht, zum Vorplatz und dann auf die Halle gehievt und zusammengebohrt. Und als ich das zweite Mal hier war, war ich in der Reparatur. Die AG Weser hat nicht nur Schiffe gebaut, die hatte zwei Schwimmdocks, wo Schiffe aufgebockt worden sind, die dort repariert wurden." }, 
        { frage:   "Und das ist das, was man heute noch sieht, oder?" },
        { antwort: "Von den Docks sehen sie nichts mehr, die sind weg. Alles ist damals zu einem amerikanischen Marinestützpunkt zu den Philippinen gebracht worden. Und das andere, das habe ich vergessen, wo die dann hingekommen sind." },
     { frage:   "Ah ok. Also die Waterfront ist ja hier, da müsste das Hauptgebäude von der AG Weser gewesen sein. Und hier rechts und links wurden dann, glaube ich, die Schiffe ins Wasser gelassen. " },
      { antwort:   "Ach so, jetzt erkenne ich das. Da, wo jetzt diese Konzerte stattfinden. Das ist ja so schräg. Ja, das war der Helgen. Der Helgen ist der Schiffbauplatz. wo das Schiff dann zusammengebaut wurde. Ja, und hier war ein riesiges Krangerüst mit Laufkatzen, die alte Teile bewegt haben. Und wenn das Schiff fertig war, hat man das dann ablaufen lassen. Und da unten, wo das Wasser anfängt, da steht heute die Bühne. Und der Helgen, der so leicht hoch ist, das passt wunderbar wie im Theater. Da können die Leute gut sitzen. Die kommen da zur Wasserseite hin, das war die Stelle, wo das Schiff ins Wasser reinläuft. Aber ich war dahinter, bzw. davor, in einer Halle, wo die großen Teile zusammengekloppt, aufgestellt und zusammengeschweißt wurden." },
       { antwort:   "Ja, wenn der Schaden oberhalb der Wasserlinie ist, da kann das Schiff da an der Pier liegen und repariert werden, oder wenn es kleine Reparaturen sind auch direkt im Hafen. Da hatten wir extra ein Boot mit Werkzeugen und sind dort hingefahren, haben kleine Sachen repariert größere in der Werft dann. Aber wenn es unter Wasser war, musste das Schiff ja aus dem Wasser raus. Da wird es dann angehoben in einem Dock." },
        { antwort:   "Also es gibt zwei verschiedene Arten von Docks. Es gibt Trockendocks, das sind solche Becken gefüllt mit Wasser. Da fährt das Schiff hinein, dann macht man hinten ein Tor zu und pumpt das Wasser raus. Ja. Da sitzt das Schiff auf dem Trocken und da müssen Sie dann dran arbeiten. Als ich aus Brasilien zurückkam, im Oktober, wo es da schön warm war und hier schon ungemütlich im Oktober,  musste ich dann draußen arbeiten. Also bei einem Schiff eine Platte auswechseln zum Beispiel, mit dem Schneidbrenner. Kennen Sie das Ding? Mit Gas und Sauerstoff. Ja, auf einer wackeligen Stellage hängen sie da draußen, paar Meter zwischen der Schiffswand und der Wand vom Dock und der kalte Wind fegt die Weser hoch. Ja. Dann sitzen sie da wie in einer Düse, höchst ungemütlich." },
         { frage:   "Ja, das kann ich mir vorstellen. " },
         { antwort:   "Das aller ungemütlichste war, beschädigte oder zu dünn gewordene Stahlplatten im Boden auszuwechseln. Die mussten da erstmal rausgeschnitten werden mit dem Schneidbrenner überm Kopf. Wir hatten einen dicken Anzug aus so einer Art dicken Segelstoff. Ja, und Arbeitsschuhe und Handschuhe. Und dann sitzen sie dort und schneiden eine Platte aus und die glühenden Brocken fallen immer so auf den Kopf." },
         { frage:   "Und sie hatten keinen Helm auf? " },
         { antwort:   "Doch, sicher, so ein Kopf ist schnell verbrannt. Ich habe aber schon auch andere Geschichten gehört von den beiden anderen Herren, wie das mit der Sicherheit lief damals. Also 1957 auf der Werftanlage, da war weder eine Pflicht, für Arbeitsschuhe noch für Helme. Da liefen die Leute mit der Kappe rum und auch mit einfachen Arbeitsklamotten. Das hat sich dann durch viele Unfälle bemerkbar gemacht, man hat daraus gelernt, verbessert und gab es dann auch Vorschriften, was da gemacht werden muss und so weiter. Heute läuft da jeder Mensch mit einem Helm auf der Werft rum. Das ist halt selbstverständlich. " },
   { antwort:   "Aber wie gesagt, 1957 war das alles noch einfacher. Auch auf der Warnowwerft in Warnemünde, wo ich gelernt habe, da waren im Monat mindestens ein Toter und so fünf bis sieben schwerverletzte; Fuß ab und solche Sachen. Das war normal. Und das war dann bei der AG Weser auch noch so. Das war dann hier nicht besser. Übrigens, als ich hier anfing, stellte ich fest, dass bis auf den letzten Handgriff, alles das gleiche war wie wir das da auch gemacht hatten. Und dann habe ich da gesagt, das und das und da sagt er, ja, das haben die doch hier vom Osten eingeführt. Ich habe hier auf der AG-Weser mehrere Leute wieder getroffen, die auf der Warnowwerft in Warnemünde gearbeitet hatten. Und da hatten wir noch zwei Lehrlingsausbilder, die ganz überzeugte SED-Leute waren. Die waren von der Sozialistische Einheitspartei der Regierung, die politische Gruppe der DDR, da waren die Genossen, die beiden Ausbilder. Eines Tages waren sie weg und hier traf ich sie wieder. " },
        ],

  // ehemalige Hafenschule
  17: [{ intro: "TEXT COMING SOON..." }],

  // Unterstand
  18: [{ intro: "TEXT COMING SOON..." }],

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
