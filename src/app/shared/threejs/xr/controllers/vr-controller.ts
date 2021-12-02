import {
  AdditiveBlending,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Mesh,
  Object3D,
  RingGeometry,
  WebXRManager,
} from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Container } from '../../../container';
import { VRControllerIndex, VRControllerPosition } from './vr-controller.model';

export abstract class VRController {
  readonly controller: any;
  readonly controllerGrip: any;
  protected xr: WebXRManager;

  protected constructor(
    protected container: Container,
    protected position: VRControllerPosition,
    protected index: VRControllerIndex
  ) {
    this.xr = this.container.renderer.xr;

    this.controller = this.xr.getController(this.index);
    this.connectEvents();

    this.controllerGrip = this.xr.getControllerGrip(this.index);
    this.controllerGrip.add(
      new XRControllerModelFactory().createControllerModel(this.controllerGrip)
    );
  }

  private connectEvents(): void {
    this.controller.addEventListener('selectstart', () => {
      this.log('selectstart');
    });

    this.controller.addEventListener('selectend', () => {
      this.log('selectend');
    });

    this.controller.addEventListener('connected', (event: any) => {
      this.log('connected');
      this.controller.add(this.createPointer(event));
    });

    this.controller.addEventListener('disconnected', () => {
      this.log('disconnected');
      this.controller.remove(this.controller.children[0]);
    });
  }

  private createPointer(event: any): Object3D | undefined {
    const targetRayMode = event?.data?.targetRayMode;

    switch (targetRayMode) {
      case 'tracked-pointer':
        return this.createTrackedPointer();
      case 'gaze':
      //return this.createGaze(); // TODO: do not work very well
    }

    return;
  }

  private createTrackedPointer(): Line {
    const geometry = new BufferGeometry();

    geometry.setAttribute(
      'position',
      new Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
    );

    geometry.setAttribute(
      'color',
      new Float32BufferAttribute([5, 5, 5, 0, 0, 0], 3)
    );

    const material = new LineBasicMaterial({
      vertexColors: true,
      blending: AdditiveBlending,
    });

    return new Line(geometry, material);
  }

  private createGaze(): Mesh {
    const geometry = new RingGeometry(0.2, 0.5, 32).translate(0, 0, -1);
    const material = new MeshBasicMaterial({ opacity: 0.5, transparent: true });
    return new Mesh(geometry, material);
  }

  private log(value: any): void {
    console.log(`VRController | ${this.position} (${this.index}):`, value);
  }
}
