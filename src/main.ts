import './style.css';
import { CATEGORIES, REGIONS, STOPS } from './data.ts';
import { filterStops } from './logic.ts';
import { renderOptions, renderStopList } from './render.ts';
import type { Category, FilterCriteria, Region } from './types.ts';

/** Holt ein Element per ID und bricht mit klarer Meldung ab, falls es fehlt. */
function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element #${id} nicht gefunden`);
  }
  return element as T;
}

const form = getElement<HTMLFormElement>('filter-form');
const searchInput = getElement<HTMLInputElement>('filter-suche');
const regionSelect = getElement<HTMLSelectElement>('filter-region');
const categorySelect = getElement<HTMLSelectElement>('filter-kategorie');
const resultCount = getElement<HTMLParagraphElement>('ergebnis-anzahl');
const stopList = getElement<HTMLUListElement>('ziele-liste');

const plannedIds = new Set<string>();

/** Liest die aktuellen Werte aus dem Filterformular. */
function readCriteria(): FilterCriteria {
  return {
    searchTerm: searchInput.value,
    region: regionSelect.value as Region | 'alle',
    category: categorySelect.value as Category | 'alle',
  };
}

/** Aktualisiert die Liste der Sehenswürdigkeiten und die Trefferanzahl. */
function updateStops(): void {
  const visibleStops = filterStops(STOPS, readCriteria());
  renderStopList(stopList, visibleStops, plannedIds);
  resultCount.textContent = `${visibleStops.length} von ${STOPS.length} Zielen angezeigt`;
}

renderOptions(regionSelect, REGIONS);
renderOptions(categorySelect, CATEGORIES);

form.addEventListener('input', updateStops);
form.addEventListener('submit', (event) => event.preventDefault());
// Das reset-Event feuert, bevor die Felder zurückgesetzt sind, daher kurz warten.
form.addEventListener('reset', () => setTimeout(updateStops));

updateStops();
