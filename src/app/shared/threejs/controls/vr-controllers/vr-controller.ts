import { StoreService } from '@core/store/store.service';
import {
  AdditiveBlending,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Mesh,
  Object3D,
  RingGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { VRControllerIndex, VRControllerType } from './vr-controller.model';

export class VRController {
  private controller: any;

  constructor(
    private store: StoreService,
    private scene: Scene,
    private renderer: WebGLRenderer,
    private type: VRControllerType,
    private index: VRControllerIndex
  ) {
    this.createController();
    this.createControllerGrip();
  }

  getType(): VRControllerType {
    return this.type;
  }

  getIndex(): VRControllerIndex {
    return this.index;
  }

  private createController() {
    this.controller = this.renderer.xr.getController(this.index);

    this.controller.addEventListener('selectstart', () => {
      this.store.vrControllerSelectStartByType(this.type);
    });

    this.controller.addEventListener('selectend', () => {
      this.store.vrControllerSelectEndByType(this.type);
    });

    this.controller.addEventListener('connected', (event: any) => {
      this.controller.add(this.createPointer(event));
      this.store.vrControllerConnectedByType(this.type);
    });

    this.controller.addEventListener('disconnected', () => {
      this.controller.remove(this.controller.children[0]);
      this.store.vrControllerDisconnectedByType(this.type);
    });

    this.scene.add(this.controller);
  }

  private createControllerGrip() {
    const controllerModelFactory = new XRControllerModelFactory();
    const controllerGrip = this.renderer.xr.getControllerGrip(this.index);
    controllerGrip.add(
      controllerModelFactory.createControllerModel(controllerGrip)
    );
    this.scene.add(controllerGrip);
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
      new Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
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
}
