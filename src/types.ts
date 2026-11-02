/** Regionen Islands entlang der Ringstraße. */
export type Region = 'Südwesten' | 'Süden' | 'Südosten' | 'Osten' | 'Norden' | 'Westen';

/** Art der Sehenswürdigkeit. */
export type Category = 'Wasserfall' | 'Gletscher' | 'Küste' | 'Geothermie' | 'Nationalpark' | 'Berg';

/** Eine Sehenswürdigkeit, die in den Reiseplan aufgenommen werden kann. */
export interface Stop {
  id: string;
  name: string;
  region: Region;
  category: Category;
  description: string;
  /** Ungefähre Straßenentfernung ab Reykjavík in Kilometern. */
  distanceFromReykjavikKm: number;
  /** Empfohlene Aufenthaltsdauer vor Ort in Stunden. */
  visitHours: number;
}

/** Aktuelle Auswahl im Filterformular. "alle" bedeutet: kein Filter. */
export interface FilterCriteria {
  searchTerm: string;
  region: Region | 'alle';
  category: Category | 'alle';
}

/** Berechnete Kennzahlen zum Reiseplan. */
export interface PlanSummary {
  stopCount: number;
  totalVisitHours: number;
  regionCount: number;
  farthestStop: Stop | undefined;
}
