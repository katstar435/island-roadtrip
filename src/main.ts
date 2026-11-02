import './style.css';
import { CATEGORIES, REGIONS, STOPS } from './data.ts';
import { filterStops, findStopById, summarizePlan, togglePlannedStop } from './logic.ts';
import { renderOptions, renderPlanList, renderPlanSummary, renderStopList } from './render.ts';
import type { Category, FilterCriteria, Region, Stop } from './types.ts';

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
const planList = getElement<HTMLOListElement>('plan-liste');
const planEmpty = getElement<HTMLParagraphElement>('plan-leer');
const planSummary = getElement<HTMLElement>('plan-zusammenfassung');
const clearPlanButton = getElement<HTMLButtonElement>('plan-leeren');

/** Zustand der Anwendung: die Ziele im Reiseplan in der Reihenfolge des Hinzufügens. */
let plan: Stop[] = [];

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
  const plannedIds = new Set(plan.map((stop) => stop.id));
  renderStopList(stopList, visibleStops, plannedIds);
  resultCount.textContent = `${visibleStops.length} von ${STOPS.length} Zielen angezeigt`;
}

/** Aktualisiert Reiseplan, Kennzahlen und Sichtbarkeit der zugehörigen Elemente. */
function updatePlan(): void {
  const hasStops = plan.length > 0;
  renderPlanList(planList, plan);
  renderPlanSummary(planSummary, summarizePlan(plan));
  planEmpty.hidden = hasStops;
  planList.hidden = !hasStops;
  clearPlanButton.hidden = !hasStops;
}

/** Reagiert auf Klicks auf die Buttons in den Karten (Event Delegation). */
function handleStopClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const button = target.closest<HTMLButtonElement>('button[data-stop-id]');
  const stopId = button?.dataset.stopId;
  if (!stopId) {
    return;
  }
  const stop = findStopById(STOPS, stopId);
  if (!stop) {
    return;
  }
  plan = togglePlannedStop(plan, stop);
  updateStops();
  updatePlan();
  // Nach dem Neuzeichnen den Fokus auf den neuen Button derselben Karte setzen.
  stopList.querySelector<HTMLButtonElement>(`button[data-stop-id="${stopId}"]`)?.focus();
}

renderOptions(regionSelect, REGIONS);
renderOptions(categorySelect, CATEGORIES);

form.addEventListener('input', updateStops);
form.addEventListener('submit', (event) => event.preventDefault());
// Das reset-Event feuert, bevor die Felder zurückgesetzt sind, daher kurz warten.
form.addEventListener('reset', () => setTimeout(updateStops));
stopList.addEventListener('click', handleStopClick);
clearPlanButton.addEventListener('click', () => {
  plan = [];
  updateStops();
  updatePlan();
  planEmpty.focus();
});

updateStops();
updatePlan();
