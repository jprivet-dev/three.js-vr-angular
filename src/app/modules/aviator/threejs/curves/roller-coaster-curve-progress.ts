import { DollyCamera } from '@shared/threejs/cameras';
import { Loop, LoopWithControls } from '@shared/threejs/models';
import { angleXZ } from '@shared/utils';
import { Object3D, Vector3 } from 'three';
import { RollerCoasterCurve } from './roller-coaster-curve';

export class RollerCoasterCurveProgress extends LoopWithControls implements Loop {
  private position = new Vector3();
  private positionOffset = new Vector3();
  private tangent = new Vector3();
  private lookAt = new Vector3();

  private velocity = 0; // 0.00008
  private progress = 0;
  private offset = 0.0001;
  private diffY = 0;
  private angleXZ = {
    current: 0,
    last: 0,
    diff: 0,
  };

  constructor(
    private curve: RollerCoasterCurve,
    private dolly: DollyCamera,
    private train: Object3D,
    private object: Object3D
  ) {
    super();
  }

  update(delta: number): void {
    if(this.isLoopDisabled) return;

    this.progress += this.velocity;
    this.progress = this.progress % 1;

    this.positionOffset.copy(
      this.curve.getPointAt(this.progress - this.offset)
    );

    this.diffY = this.positionOffset.y - this.position.y;
    this.angleXZ.current = angleXZ(this.position, this.positionOffset);
    this.angleXZ.diff = this.angleXZ.last - this.angleXZ.current;

    // Position

    this.position.copy(this.curve.getPointAt(this.progress));
    this.train.position.copy(this.position);
    this.object.position.y = -this.diffY * 30 + 0.2;

    // Rotation

    this.object.rotation.set(
      -this.diffY * 10,
      this.angleXZ.diff * 30,
      this.angleXZ.diff * 110
    );

    this.dolly.rotation.set(0, 0, this.angleXZ.diff * 20);

    // Tangent

    this.tangent.copy(this.curve.getTangentAt(this.progress));
    this.velocity -= this.tangent.y * 0.0000001 * delta;
    this.velocity = Math.max(0.00008, Math.min(0.0002, this.velocity));

    // Look At

    const vector: Vector3 = this.lookAt.copy(this.position).sub(this.tangent);
    this.train.lookAt(vector);

    this.angleXZ.last = this.angleXZ.current;
  }

  reset(): void {
    this.progress = 0;
  }
}
