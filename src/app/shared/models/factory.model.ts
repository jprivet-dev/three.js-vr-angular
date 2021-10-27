import { Object3D } from 'three';

export interface Factory {
  create(): Object3D;
}
