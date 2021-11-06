const ratio = (value: number): number => {
  return value / Radius.Earth;
}

export enum AxialTilt { // degrees
  Sun = 7.25,
  Mercury = 0.03,
  Venus = 2.64,
  Earth = 23.44,
  Moon = 6.68,
  Mars = 25.19,
  Jupiter = 3.13,
  Saturn = 26.73,
  Uranus = 82.23,
  Neptune = 28.32,
  Pluto = 57.47,
}

export enum Radius { // km
  Sun = 696340,
  Mercury = 2440,
  Venus = 6052,
  Earth = 6371,
  Moon = 1737,
  Mars = 3390,
  Jupiter = 69911,
  Saturn = 58232,
  Uranus = 25362,
  Neptune = 24622,
  Pluto = 1188,
}

export enum RadiusRatioEarth {
  Sun = ratio(Radius.Sun),
  Mercury = ratio(Radius.Mercury),
  Venus = ratio(Radius.Venus),
  Earth = 1,
  Moon = ratio(Radius.Moon),
  Mars = ratio(Radius.Mars),
  Jupiter = ratio(Radius.Jupiter),
  Saturn = ratio(Radius.Saturn),
  Uranus = ratio(Radius.Uranus),
  Neptune = ratio(Radius.Neptune),
  Pluto = ratio(Radius.Pluto),
}

export enum SaturnRings {
  innerRadius = 66900,
  outerRadius = 173000,
}

export enum SaturnRingsRatioEarth {
  innerRadius = ratio(SaturnRings.innerRadius),
  outerRadius = ratio(SaturnRings.outerRadius),
}
