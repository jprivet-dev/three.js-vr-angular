import {
  AdditiveBlending,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Mesh,
  Object3D,
  RingGeometry,
  Scene,
} from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { DollyCamera } from '../cameras';
import { VRRenderer } from '../renderers';
import { VRControllerIndex } from './controls.model';

export class VRControls {
  private gazeAllReadyExists: boolean = false;
  private selecting: boolean = false;
  private controllerModelFactory: XRControllerModelFactory;
  readonly INDEX_0: VRControllerIndex = 0;
  readonly INDEX_1: VRControllerIndex = 1;

  constructor(
    private dolly: DollyCamera,
    private renderer: VRRenderer,
    private scene: Scene
  ) {
    this.controllerModelFactory = new XRControllerModelFactory();
  }

  createAllControllers() {
    this.createController(this.INDEX_0);
    this.createControllerGrip(this.INDEX_0);

    if (!this.gazeAllReadyExists) {
      this.createController(this.INDEX_1);
      this.createControllerGrip(this.INDEX_1);
    }
  }

  onSelectStart() {
    this.selecting = true;
  }

  onSelectEnd() {
    this.selecting = false;
  }

  private createController(index: VRControllerIndex): any {
    const controller = this.renderer.xr.getController(index);

    controller.addEventListener('selectstart', this.onSelectStart);
    controller.addEventListener('selectend', this.onSelectEnd);

    controller.addEventListener('connected', (event) => {
      controller.add(this.buildController(event));
    });

    controller.addEventListener('disconnected', () => {
      controller.remove(controller.children[0]);
    });

    this.scene.add(controller);
  }

  private buildController(event: any): Object3D {
    const xrInputSource = event.data;

    let geometry, material;

    if (xrInputSource.targetRayMode === 'tracked-pointer') {
      console.log('build tracked-pointer');
      geometry = new BufferGeometry();

      geometry.setAttribute(
        'position',
        new Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
      );

      geometry.setAttribute(
        'color',
        new Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
      );

      material = new LineBasicMaterial({
        vertexColors: true,
        blending: AdditiveBlending,
      });

      return new Line(geometry, material);
    }

    // gaze
    console.log('build gaze');
    this.gazeAllReadyExists = true;
    geometry = new RingGeometry(0.2, 10, 32).translate(0, 0, -10);
    material = new MeshBasicMaterial({ opacity: 0.5, transparent: true });
    return new Mesh(geometry, material);
  }

  private createControllerGrip(index: VRControllerIndex): void {
    const controllerGrip = this.renderer.xr.getControllerGrip(index);
    controllerGrip.add(
      this.controllerModelFactory.createControllerModel(controllerGrip)
    );
    this.scene.add(controllerGrip);
  }
}
