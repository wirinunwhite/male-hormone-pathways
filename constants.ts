import { HormoneNode, PathwayEdge } from './types';

export const NODES: HormoneNode[] = [
  // Row 1: The Source
  { id: 'chol', label: 'Cholesterol', x: 10, y: 10, type: 'source', desc: 'The raw material for all steroid hormones. Absorbs UV light. Transport into mitochondria is influenced by Thyroid Hormone & LH.' },
  { id: 'preg', label: 'Pregnenolone', x: 35, y: 10, type: 'precursor', desc: 'The "Grandmother" hormone. Made in mitochondria. This production is the rate-limiting step (CYP450scc).' },
  { id: 'prog', label: 'Progesterone', x: 60, y: 10, type: 'precursor', desc: 'Precursor to Cortisol and Aldosterone. Has a calming effect on the brain (GABA pathways).' },
  { id: 'aldo', label: 'Aldosterone', x: 85, y: 10, type: 'mineral', desc: 'Regulates blood pressure and salt balance.' },

  // Row 2: Divergence
  { id: '17ohpreg', label: '17-OH Preg', x: 35, y: 30, type: 'intermediate', desc: '17-Hydroxy-Pregnenolone. Intermediate pathway to DHEA.' },
  { id: '17ohprog', label: '17-OH Prog', x: 60, y: 30, type: 'intermediate', desc: 'Junction point: Can go to Stress (Cortisol) or Androgens (via Androstenedione).' },
  { id: 'cort', label: 'Cortisol', x: 85, y: 30, type: 'stress', desc: 'The Stress Hormone. Essential for life, but catabolic in excess. Chronic elevation steals resources from Androgens ("Pregnenolone Steal").' },

  // Row 3: Androgen Precursors
  { id: 'dhea', label: 'DHEA', x: 35, y: 50, type: 'androgen', desc: 'Most abundant circulating steroid. Precursor to Testosterone and Estrogen. Sulfated form is DHEA-S.' },
  { id: 'andro', label: 'Androstenedione', x: 60, y: 50, type: 'androgen', desc: 'Direct precursor to Testosterone and Estrone. "Backdoor" pathway from Progesterone can also feed here.' },
  { id: 'estrone', label: 'Estrone (E1)', x: 85, y: 50, type: 'estrogen', desc: 'Weaker estrogen. Often elevated by excess body fat (Aromatization).' },

  // Row 4: The Main Event
  { id: 'shbg', label: 'SHBG', x: 10, y: 70, type: 'protein', desc: 'Sex Hormone Binding Globulin. Acts as a "taxi" that deactivates Testosterone while carrying it. High Insulin lowers SHBG.' },
  { id: 'test', label: 'TESTOSTERONE', x: 60, y: 70, type: 'hero', desc: 'Primary Male Hormone. Anabolic, Libido, Mood, Muscle, Bone Density. Converted to E2 or DHT.' },
  { id: 'estradiol', label: 'Estradiol (E2)', x: 85, y: 70, type: 'estrogen', desc: 'Potent Estrogen. Men need some for joints/brain, but excess causes side effects. Detoxed via Methylation.' },

  // Row 5: Metabolites & Potent Androgens
  { id: 'andosterone', label: 'Androsterone', x: 35, y: 90, type: 'androgen', desc: 'Part of the "Backdoor Pathway". Can bypass Testosterone to create DHT directly.' },
  { id: 'dht', label: 'DHT', x: 60, y: 90, type: 'potent', desc: 'Dihydrotestosterone. 5x more potent than T. Drives body hair, balding, prostate growth.' },
  { id: '3adiol', label: '3α-Diol', x: 85, y: 90, type: 'metabolite', desc: 'DHT metabolite acting on GABA receptors (Neurosteroid).' },
];

export const EDGES: PathwayEdge[] = [
  { from: 'chol', to: 'preg', label: 'CYP450scc' },
  { from: 'preg', to: 'prog', label: '3β-HSD' },
  { from: 'prog', to: 'aldo', label: '' },
  { from: 'preg', to: '17ohpreg', label: '' },
  { from: 'prog', to: '17ohprog', label: '' },
  { from: '17ohpreg', to: '17ohprog', label: '' },
  { from: '17ohpreg', to: 'dhea', label: '17,20-Lyase' },
  { from: '17ohprog', to: 'cort', label: 'Stress Pathway' },
  { from: '17ohprog', to: 'andro', label: '' },
  { from: 'dhea', to: 'andro', label: '3β-HSD' },
  { from: 'andro', to: 'test', label: '17β-HSD' },
  { from: 'andro', to: 'estrone', label: 'Aromatase' },
  { from: 'estrone', to: 'estradiol', label: '' },
  { from: 'test', to: 'estradiol', label: 'Aromatase' },
  { from: 'test', to: 'dht', label: '5α-Reductase' },
  { from: 'prog', to: 'andosterone', label: 'Backdoor', style: 'dashed' },
  { from: 'andosterone', to: 'dht', label: '', style: 'dashed' },
  { from: 'dht', to: '3adiol', label: '' },
  { from: 'shbg', to: 'test', label: 'Binds', type: 'inhibit' }
];