import { Mesh } from 'three';
import { Animation } from '../managers/animation.model';

export interface ComplexObject3D extends Animation {
  mesh: Mesh;
}
