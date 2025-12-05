export type NodeType = 
  | 'source' 
  | 'precursor' 
  | 'intermediate' 
  | 'stress' 
  | 'androgen' 
  | 'estrogen' 
  | 'hero' 
  | 'protein' 
  | 'potent' 
  | 'metabolite' 
  | 'mineral';

export interface HormoneNode {
  id: string;
  label: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  type: NodeType;
  desc: string;
}

export interface PathwayEdge {
  from: string;
  to: string;
  label: string;
  style?: 'dashed' | 'solid';
  type?: 'inhibit' | 'normal';
}

export interface AppSettings {
  finasteride: boolean;
  stress: boolean;
}

export type EdgeStatus = 'normal' | 'incoming' | 'outgoing' | 'boosted' | 'blocked' | 'dimmed';