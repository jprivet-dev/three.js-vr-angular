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
  Sun = 696340 / Radius.Earth,
  Mercury = 2440 / Radius.Earth,
  Venus = 6052 / Radius.Earth,
  Earth = 1,
  Moon = 1737 / Radius.Earth,
  Mars = 3390 / Radius.Earth,
  Jupiter = 69911 / Radius.Earth,
  Saturn = 58232 / Radius.Earth,
  Uranus = 25362 / Radius.Earth,
  Neptune = 24622 / Radius.Earth,
  Pluto = 1188 / Radius.Earth,
}
