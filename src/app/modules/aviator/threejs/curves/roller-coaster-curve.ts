import { Curve, Vector3 } from 'three';

export class RollerCoasterCurve extends Curve<Vector3>{
  private point = new Vector3();
  private tangent = new Vector3();

  constructor(private size: number) {
    super();
  }

  getPointAt(t: number) {
    t = t * Math.PI * 2;

    const x = Math.sin(t * 3) * Math.cos(t * 4) * this.size;
    const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
    const z = Math.sin(t) * Math.sin(t * 4) * this.size;

    return this.point.set(x, y, z).multiplyScalar(2);
  }

  getTangentAt(t: number) {
    const delta = 0.0001;
    const t1 = Math.max(0, t - delta);
    const t2 = Math.min(1, t + delta);

    return this.tangent
      .copy(this.getPointAt(t2))
      .sub(this.getPointAt(t1))
      .normalize();
  }
}
