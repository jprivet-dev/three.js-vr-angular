import { DollyCamera } from '@modules/earth/threejs';
import { Object3D, Scene } from 'three';
import { VRRenderer } from '../threejs';

export interface FactoryObject3D {
  create(): Object3D;
}

export interface FactoryVRRenderer {
  create(scene: Scene, dolly: DollyCamera): VRRenderer;
}
