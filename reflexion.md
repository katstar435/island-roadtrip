# Reflexionsbericht ESA 1

SED502 Frontend Development · Teresa · November 2026

## Thema und Motivation

Ich habe 2026 eine Reise nach Island gemacht, weshalb dies mein Thema wurde. Entstanden ist ein Roadtrip-Planer für die isländische Ringstraße. Das Thema eignet sich gut für Interaktivität: Sehenswürdigkeiten lassen sich als klar strukturierte Daten beschreiben, filtern und zu einem Reiseplan zusammenfassen. Ich entschied mich, das Design schlicht in den Farben von Island zu halten: Blau, Weiß und Rot aus der isländischen Flagge.

## Schwierigste technische Entscheidung

Am schwierigsten war das Zusammenspiel von dynamischem Rendern und Barrierefreiheit. Nach jedem Klick wird die Kartenliste neu erzeugt. Dabei ging zunächst der Tastaturfokus verloren, weil der geklickte Button aus dem DOM verschwand. Gelöst habe ich das, indem nach dem Neuzeichnen gezielt der neue Button derselben Karte fokussiert wird. Ursprünglich wollte ich außerdem `aria-pressed` mit wechselnder Beschriftung kombinieren. Da sich das für Screenreader widerspricht, ändert sich jetzt nur die Beschriftung („hinzufügen“ bzw. „entfernen“), ergänzt um den Namen des Ziels im `aria-label`.

Eine zweite Entscheidung war die Trennung in reine Logikfunktionen (`logic.ts`) und DOM-Funktionen (`render.ts`). So bleibt etwa `summarizePlan` mit `reduce` unabhängig von der Oberfläche nachvollziehbar.

## Ressourcen und AI-Tools

- Modulunterlagen 01 und 02 für Setup, Git-Workflow und TypeScript-Grundlagen
- MDN Web Docs zu semantischen Elementen und ARIA
- Chrome Lighthouse für den Accessibility-Audit

Als AI-Tool habe ich Claude (Anthropic) eingesetzt. Claude hat auf Basis der Aufgabenstellung die Projektstruktur, große Teile des HTML-, CSS- und TypeScript-Codes, die README und einen Entwurf dieses Berichts erstellt. Den Code bin ich anschließend gemeinsam mit Claude Schritt für Schritt durchgegangen, habe ihn im Browser getestet und die Texte an meine Sicht angepasst. Als eigene Erweiterung habe ich fünf weitere Sehenswürdigkeiten nach dem Interface `Stop` ergänzt und selbst committet. Gemäß der Grundregel des Kurses habe ich nur Code übernommen, den ich erklären kann.
