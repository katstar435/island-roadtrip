import { formatHours } from './logic.ts';
import type { Stop } from './types.ts';

/** Erstellt ein Element mit optionaler CSS-Klasse und Textinhalt. */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

/** Füllt ein select-Element mit Optionen. Die erste Option ("alle") bleibt erhalten. */
export function renderOptions(select: HTMLSelectElement, values: string[]): void {
  const options = values.map((value) => new Option(value, value));
  select.append(...options);
}

/** Baut die Karte für eine Sehenswürdigkeit als article innerhalb eines Listeneintrags. */
export function createStopCard(stop: Stop, isPlanned: boolean): HTMLLIElement {
  const item = createElement('li');
  const article = createElement('article', isPlanned ? 'stop-card is-planned' : 'stop-card');
  const headingId = `ziel-${stop.id}`;
  article.setAttribute('aria-labelledby', headingId);

  const header = createElement('header');
  const heading = createElement('h3', undefined, stop.name);
  heading.id = headingId;

  const tags = createElement('ul', 'stop-tags');
  tags.setAttribute('aria-label', 'Merkmale');
  tags.append(createElement('li', undefined, stop.region), createElement('li', undefined, stop.category));
  header.append(heading, tags);

  const description = createElement('p', undefined, stop.description);
  const meta = createElement(
    'p',
    'stop-meta',
    `ca. ${stop.distanceFromReykjavikKm} km ab Reykjavík · Aufenthalt ${formatHours(stop.visitHours)}`,
  );

  const button = createElement(
    'button',
    isPlanned ? 'button button-secondary' : 'button',
    isPlanned ? 'Aus dem Reiseplan entfernen' : 'Zum Reiseplan hinzufügen',
  );
  button.type = 'button';
  button.dataset.stopId = stop.id;
  button.setAttribute(
    'aria-label',
    isPlanned ? `${stop.name} aus dem Reiseplan entfernen` : `${stop.name} zum Reiseplan hinzufügen`,
  );

  article.append(header, description, meta, button);
  item.append(article);
  return item;
}

/** Zeichnet die gefilterte Liste neu und markiert bereits geplante Ziele. */
export function renderStopList(
  container: HTMLElement,
  stops: Stop[],
  plannedIds: ReadonlySet<string>,
): void {
  if (stops.length === 0) {
    const empty = createElement(
      'li',
      'no-results',
      'Keine Ziele gefunden. Passe die Filter an oder setze sie zurück.',
    );
    container.replaceChildren(empty);
    return;
  }
  const cards = stops.map((stop) => createStopCard(stop, plannedIds.has(stop.id)));
  container.replaceChildren(...cards);
}
