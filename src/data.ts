import type { Category, Region, Stop } from './types.ts';

export const REGIONS: Region[] = ['Südwesten', 'Süden', 'Südosten', 'Osten', 'Norden', 'Westen'];

export const CATEGORIES: Category[] = [
  'Wasserfall',
  'Gletscher',
  'Küste',
  'Geothermie',
  'Nationalpark',
  'Berg',
];

/** Entfernungen und Dauern sind gerundete Richtwerte. */
export const STOPS: Stop[] = [
  {
    id: 'thingvellir',
    name: 'Þingvellir',
    region: 'Südwesten',
    category: 'Nationalpark',
    description:
      'Hier treffen die Nordamerikanische und die Eurasische Kontinentalplatte aufeinander. Zugleich Ort des historischen Althing-Parlaments.',
    distanceFromReykjavikKm: 45,
    visitHours: 2,
  },
  {
    id: 'geysir',
    name: 'Geysir und Strokkur',
    region: 'Südwesten',
    category: 'Geothermie',
    description:
      'Der Strokkur schießt etwa alle fünf bis zehn Minuten eine Wassersäule in die Höhe.',
    distanceFromReykjavikKm: 105,
    visitHours: 1,
  },
  {
    id: 'gullfoss',
    name: 'Gullfoss',
    region: 'Südwesten',
    category: 'Wasserfall',
    description:
      'Der „goldene Wasserfall“ stürzt in zwei Stufen in eine enge Schlucht des Flusses Hvítá.',
    distanceFromReykjavikKm: 115,
    visitHours: 1,
  },
  {
    id: 'seljalandsfoss',
    name: 'Seljalandsfoss',
    region: 'Süden',
    category: 'Wasserfall',
    description:
      'Ein Pfad führt hinter den rund 60 Meter hohen Wasserfall. Regenjacke nicht vergessen.',
    distanceFromReykjavikKm: 125,
    visitHours: 1,
  },
  {
    id: 'skogafoss',
    name: 'Skógafoss',
    region: 'Süden',
    category: 'Wasserfall',
    description:
      'Breiter, kraftvoller Wasserfall. Über eine Treppe gelangt man zu einer Aussichtsplattform oberhalb der Kante.',
    distanceFromReykjavikKm: 155,
    visitHours: 1.5,
  },
  {
    id: 'reynisfjara',
    name: 'Reynisfjara',
    region: 'Süden',
    category: 'Küste',
    description:
      'Schwarzer Sandstrand bei Vík mit Basaltsäulen. Achtung vor plötzlichen, starken Wellen.',
    distanceFromReykjavikKm: 180,
    visitHours: 1,
  },
  {
    id: 'skaftafell',
    name: 'Skaftafell',
    region: 'Südosten',
    category: 'Nationalpark',
    description:
      'Teil des Vatnajökull-Nationalparks. Wanderung zum Svartifoss mit seinen Basaltsäulen.',
    distanceFromReykjavikKm: 325,
    visitHours: 3,
  },
  {
    id: 'jokulsarlon',
    name: 'Jökulsárlón',
    region: 'Südosten',
    category: 'Gletscher',
    description:
      'Gletscherlagune, in der abgebrochene Eisberge treiben. Oft lassen sich Robben beobachten.',
    distanceFromReykjavikKm: 375,
    visitHours: 2,
  },
  {
    id: 'diamond-beach',
    name: 'Diamond Beach',
    region: 'Südosten',
    category: 'Küste',
    description:
      'Eisbrocken aus der Lagune werden an den schwarzen Strand gespült und glitzern wie Diamanten.',
    distanceFromReykjavikKm: 377,
    visitHours: 1,
  },
  {
    id: 'seydisfjordur',
    name: 'Seyðisfjörður',
    region: 'Osten',
    category: 'Küste',
    description:
      'Kleiner Ort am Ende eines Fjords mit bunten Holzhäusern und einer Passstraße mit Aussicht.',
    distanceFromReykjavikKm: 680,
    visitHours: 2,
  },
  {
    id: 'dettifoss',
    name: 'Dettifoss',
    region: 'Norden',
    category: 'Wasserfall',
    description:
      'Gilt als einer der wasserreichsten Wasserfälle Europas. Die Gischt ist schon von weitem sichtbar.',
    distanceFromReykjavikKm: 560,
    visitHours: 1.5,
  },
  {
    id: 'myvatn',
    name: 'Mývatn',
    region: 'Norden',
    category: 'Geothermie',
    description:
      'Vulkanische Seenlandschaft mit Pseudokratern, dampfenden Solfataren und einem Naturbad.',
    distanceFromReykjavikKm: 480,
    visitHours: 4,
  },
  {
    id: 'godafoss',
    name: 'Goðafoss',
    region: 'Norden',
    category: 'Wasserfall',
    description:
      'Der „Wasserfall der Götter“ liegt direkt an der Ringstraße zwischen Akureyri und Mývatn.',
    distanceFromReykjavikKm: 435,
    visitHours: 1,
  },
  {
    id: 'kirkjufell',
    name: 'Kirkjufell',
    region: 'Westen',
    category: 'Berg',
    description:
      'Markanter Berg auf der Halbinsel Snæfellsnes, eines der meistfotografierten Motive Islands.',
    distanceFromReykjavikKm: 180,
    visitHours: 1,
  },
];
