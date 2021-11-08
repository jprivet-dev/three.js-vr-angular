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
} from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { DollyCamera } from '../cameras';
import { VRRenderer } from '../renderers';
import { VRControllerIndex } from './controls.model';

export class VRControls {
  private controllerModelFactory: XRControllerModelFactory;

  constructor(
    private store: StoreService,
    private dolly: DollyCamera,
    private renderer: VRRenderer,
    private scene: Scene
  ) {
    this.controllerModelFactory = new XRControllerModelFactory();
  }

  createAllControllers() {
    this.createControllerByIndex(VRControllerIndex.Right);
    this.createControllerByIndex(VRControllerIndex.Left);
  }

  private createControllerByIndex(index: VRControllerIndex): void {
    this.createController(index);
    this.createControllerGrip(index);
  }

  private createController(index: VRControllerIndex): void {
    const controller = this.renderer.xr.getController(index);

    controller.addEventListener('selectstart', () => {
      if (index === VRControllerIndex.Right) {
        this.store.vrControllerRightSelectStart();
      } else {
        this.store.vrControllerLeftSelectStart();
      }
    });

    controller.addEventListener('selectend', () => {
      if (index === VRControllerIndex.Right) {
        this.store.vrControllerRightSelectEnd();
      } else {
        this.store.vrControllerLeftSelectEnd();
      }
    });

    controller.addEventListener('connected', (event) => {
      controller.add(this.buildController(event));
      if (index === VRControllerIndex.Right) {
        this.store.vrControllerRightConnected();
      } else {
        this.store.vrControllerLeftConnected();
      }
    });

    controller.addEventListener('disconnected', () => {
      controller.remove(controller.children[0]);
      if (index === VRControllerIndex.Right) {
        this.store.vrControllerRightDisconnected();
      } else {
        this.store.vrControllerLeftDisconnected();
      }
    });

    this.scene.add(controller);
  }

  private buildController(event: any): Object3D {
    const targetRayMode = event.data && event.data.targetRayMode;

    let geometry, material;

    if (targetRayMode === 'tracked-pointer') {
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
    geometry = new RingGeometry(0.2, 0.5, 32).translate(0, 0, -1);
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
