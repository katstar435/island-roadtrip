import type { FilterCriteria, Stop } from './types.ts';

/** Vereinheitlicht Text für einen Vergleich ohne Rücksicht auf Groß- und Kleinschreibung. */
export function normalize(text: string): string {
  return text.trim().toLocaleLowerCase('de');
}

/** Prüft, ob der Suchbegriff in Name, Beschreibung, Region oder Kategorie vorkommt. */
export function matchesSearch(stop: Stop, searchTerm: string): boolean {
  const term = normalize(searchTerm);
  if (term === '') {
    return true;
  }
  const searchableText = normalize(
    [stop.name, stop.description, stop.region, stop.category].join(' '),
  );
  return searchableText.includes(term);
}

/** Liefert alle Ziele, die zu den gewählten Filterkriterien passen. */
export function filterStops(stops: Stop[], criteria: FilterCriteria): Stop[] {
  return stops.filter(
    (stop) =>
      (criteria.region === 'alle' || stop.region === criteria.region) &&
      (criteria.category === 'alle' || stop.category === criteria.category) &&
      matchesSearch(stop, criteria.searchTerm),
  );
}

/** Formatiert eine Stundenzahl lesbar, z. B. 1.5 → "1,5 Std.". */
export function formatHours(hours: number): string {
  return `${hours.toLocaleString('de-AT')} Std.`;
}
