import { Mesh, Object3D } from 'three';

export interface HasMesh {
  mesh: Mesh | Object3D;
}
