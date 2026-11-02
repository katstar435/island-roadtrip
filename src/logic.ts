import type { FilterCriteria, PlanSummary, Region, Stop } from './types.ts';

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

/** Sucht ein Ziel anhand seiner ID. */
export function findStopById(stops: Stop[], id: string): Stop | undefined {
  return stops.find((stop) => stop.id === id);
}

/** Fügt ein Ziel hinzu oder entfernt es, falls es schon im Plan ist. Gibt einen neuen Plan zurück. */
export function togglePlannedStop(plan: Stop[], stop: Stop): Stop[] {
  const isPlanned = plan.some((planned) => planned.id === stop.id);
  return isPlanned ? plan.filter((planned) => planned.id !== stop.id) : [...plan, stop];
}

/** Berechnet die Kennzahlen des Reiseplans in einem einzigen Durchlauf mit reduce. */
export function summarizePlan(plan: Stop[]): PlanSummary {
  const totals = plan.reduce(
    (acc, stop) => {
      acc.totalVisitHours += stop.visitHours;
      acc.regions.add(stop.region);
      if (!acc.farthestStop || stop.distanceFromReykjavikKm > acc.farthestStop.distanceFromReykjavikKm) {
        acc.farthestStop = stop;
      }
      return acc;
    },
    {
      totalVisitHours: 0,
      regions: new Set<Region>(),
      farthestStop: undefined as Stop | undefined,
    },
  );

  return {
    stopCount: plan.length,
    totalVisitHours: totals.totalVisitHours,
    regionCount: totals.regions.size,
    farthestStop: totals.farthestStop,
  };
}
