import { DollyCamera } from '@modules/earth/threejs';
import { Object3D, Renderer, Scene } from 'three';

export interface FactoryObject3D {
  create(): Object3D;
}

export interface FactoryRendererVR {
  create(scene: Scene, dolly: DollyCamera): Renderer;
}
