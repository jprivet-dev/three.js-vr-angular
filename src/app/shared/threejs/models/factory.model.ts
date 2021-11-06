import { Object3D, Scene } from 'three';
import { DollyCamera, DollyCameraParams } from '../cameras';
import { Controls } from '../controls';
import { VRRenderer } from '../renderers';

export interface FactoryObject3D {
  create(): Object3D;
}

export interface FactoryControls {
  create(dolly: DollyCamera, renderer: VRRenderer): Controls;
}

export interface FactoryDollyCamera {
  create(params: DollyCameraParams): DollyCamera;
}

export interface FactoryVRRenderer {
  create(scene: Scene, dolly: DollyCamera): VRRenderer;
}
