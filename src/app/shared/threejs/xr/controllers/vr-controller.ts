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
import {
  XRControllerModel,
  XRControllerModelFactory,
} from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Container } from '../../../container';
import {
  VRControllerIndex,
  VRControllerPosition,
  VRControllerSelectCallback,
} from './vr-controller.model';

export abstract class VRController {
  public controller: any;
  public controllerGrip: any;

  protected xr!: WebXRManager;
  protected selectStartCallback: VRControllerSelectCallback = () => {};
  protected selectEndCallback: VRControllerSelectCallback = () => {};

  protected constructor(
    container: Container,
    protected position: VRControllerPosition,
    protected index: VRControllerIndex,
    protected size: number
  ) {
    this.create(container);
  }

  updateContainer(container: Container): void {
    this.disconnect();
    this.create(container);
  }

  private create(container: Container): void {
    this.xr = container.renderer.xr;

    this.controller = this.xr.getController(this.index);
    this.connect();

    this.controllerGrip = this.xr.getControllerGrip(this.index);
    const xrController: XRControllerModel =
      new XRControllerModelFactory().createControllerModel(this.controllerGrip);
    this.controllerGrip.add(xrController);
  }

  onSelectStart(callback: VRControllerSelectCallback): this {
    this.selectStartCallback = callback;
    return this;
  }

  onSelectEnd(callback: VRControllerSelectCallback): this {
    this.selectEndCallback = callback;
    return this;
  }

  private connect(): void {
    this.controller.addEventListener('selectstart', () => {
      this.onSelectStartEvent();
    });

    this.controller.addEventListener('selectend', () => {
      this.onSelectEndEvent();
    });

    this.controller.addEventListener('connected', (event: any) => {
      this.onConnectedEvent(event);
    });

    this.controller.addEventListener('disconnected', () => {
      this.onDisconnectedEvent();
    });
  }

  private disconnect(): void {
    if (!this.controller) {
      return;
    }

    this.controller.removeEventListener('selectstart', () => {
      this.onSelectStartEvent();
    });

    this.controller.removeEventListener('selectend', () => {
      this.onSelectEndEvent();
    });

    this.controller.removeEventListener('connected', (event: any) => {
      this.onConnectedEvent(event);
    });

    this.controller.removeEventListener('disconnected', () => {
      this.onDisconnectedEvent();
    });
  }

  private onSelectStartEvent() {
    this.log('selectstart');
    this.selectStartCallback();
  }

  private onSelectEndEvent() {
    this.log('selectend');
    this.selectEndCallback();
  }

  private onConnectedEvent(event: any) {
    this.log('connected');
    this.controller.add(this.createPointer(event));
  }

  private onDisconnectedEvent() {
    this.log('disconnected');
    this.controller.remove(this.controller.children[0]);
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
      new Float32BufferAttribute([this.size, this.size, this.size, 0, 0, 0], 3)
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

  private log(label: any, value?: any): void {
    const base: string[] = [];
    base.push(`VRController | ${this.position} (${this.index})`);

    if (value) {
      base.push(label);
    } else {
      value = label;
    }

    label = base.join(' | ') + ':';

    console.log(label, value);
  }
}
