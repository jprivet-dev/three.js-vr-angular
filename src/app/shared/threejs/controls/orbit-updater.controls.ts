import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera } from 'three/src/Three';
import { Loop } from '../models';
import { OrbitControlsUpdaterParams } from '../models/orbit-controls-updater.model';

export class OrbitUpdaterControls implements Loop {
  private controls: OrbitControls;

  constructor(
    private camera: Camera,
    private domElement: HTMLElement,
    private params?: OrbitControlsUpdaterParams
  ) {
    this.controls = this.createControls();
  }

  createControls(): OrbitControls {
    let controls = new OrbitControls(this.camera, this.domElement);

    controls.autoRotateSpeed =
      this.params?.autoRotateSpeed ?? controls.autoRotateSpeed;

    controls.autoRotate = this.params?.autoRotate ?? controls.autoRotate;

    controls.enableDamping =
      this.params?.enableDamping ?? controls.enableDamping;

    controls.target = this.params?.target ?? controls.target;

    controls.minDistance = this.params?.minDistance ?? controls.minDistance;
    controls.maxDistance = this.params?.maxDistance ?? controls.maxDistance;

    return controls;
  }

  updateDomElement(domElement: HTMLElement): void {
    this.domElement = domElement;
    this.controls = this.createControls();
  }

  enable(): void {
    this.controls.enabled = true;
  }

  disable(): void {
    this.controls.enabled = false;
  }

  update() {
    if (this.controls.enabled === false) return;
    this.controls.update();
  }
}
