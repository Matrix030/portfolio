export type DataPoint = {
  id: string;
  value: number;
  x: number;
  y: number;
  cluster: number | null;
  selected: boolean;
  scoreByBin: number[];
};

export type BinData = {
  id: string;
  fillPercentage: number;
  color: string;
  capacity: number;
  points: string[];
  count: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type P5Instance = {
  createCanvas: (width: number, height: number) => void;
  background: (color: string | number) => void;
  fill: (color: string | number) => void;
  stroke: (color: string | number) => void;
  strokeWeight: (weight: number) => void;
  ellipse: (x: number, y: number, width: number, height: number) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  rect: (x: number, y: number, width: number, height: number) => void;
  text: (text: string, x: number, y: number) => void;
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
  mouseIsPressed: boolean;
  windowWidth: number;
  windowHeight: number;
  textAlign: (alignment: unknown) => void;
  CENTER: unknown;
  textSize: (size: number) => void;
  noStroke: () => void;
  noFill: () => void;
}; 