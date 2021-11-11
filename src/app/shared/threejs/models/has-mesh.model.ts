import { Mesh } from 'three';
import { Loop } from './loop.model';

export interface HasMesh extends Loop {
  mesh: Mesh;
}
