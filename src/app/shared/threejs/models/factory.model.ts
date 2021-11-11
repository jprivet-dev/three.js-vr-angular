import { Object3D } from 'three';
import { VRController } from '../controls';

export interface FactoryObject3D {
  create(): Object3D;
}

export interface FactoryVRController {
  createRight(): VRController;

  createLeft(): VRController;
}
