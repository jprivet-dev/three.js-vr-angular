import { Object3D, Renderer } from 'three';

export interface FactoryObject3D {
  create(): Object3D;
}

export interface FactoryRenderer {
  create(): Renderer;
}
