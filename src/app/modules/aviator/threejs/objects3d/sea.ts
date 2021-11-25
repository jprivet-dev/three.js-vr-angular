import { HasMesh, Loop } from '@shared/threejs/models';
import { CylinderGeometry, Matrix4, Mesh, MeshPhongMaterial } from 'three';
import { AviatorColors } from '../../models/aviator-colors.model';

export class Sea implements HasMesh, Loop {
  mesh: Mesh;

  constructor() {
    const geom = new CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));

    const mat = new MeshPhongMaterial({
      color: AviatorColors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    });

    this.mesh = new Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }

  update(delta: number) {
    this.mesh.rotation.z += 0.005;
  }
}
