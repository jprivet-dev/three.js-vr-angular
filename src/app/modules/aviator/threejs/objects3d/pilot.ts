import { HasMesh, Loop } from '@shared/threejs/models';
import {
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
} from 'three';
import { AviatorColors } from '../../models/aviator-colors.model';

export class Pilot implements HasMesh, Loop {
  mesh: Object3D;
  hairsTop: Object3D;
  angleHairs: number;

  constructor() {
    this.mesh = new Object3D();
    this.mesh.name = 'pilot';
    this.angleHairs = 0;

    const bodyGeom = new BoxGeometry(15, 15, 15);
    const bodyMat = new MeshPhongMaterial({
      color: AviatorColors.brown,
      flatShading: true,
    });
    const body = new Mesh(bodyGeom, bodyMat);
    body.position.set(2, -12, 0);

    this.mesh.add(body);

    const faceGeom = new BoxGeometry(10, 10, 10);
    const faceMat = new MeshLambertMaterial({ color: AviatorColors.pink });
    const face = new Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    const hairGeom = new BoxGeometry(4, 4, 4);
    const hairMat = new MeshLambertMaterial({ color: AviatorColors.brown });
    const hair = new Mesh(hairGeom, hairMat);
    hair.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 2, 0));
    const hairs = new Object3D();

    this.hairsTop = new Object3D();

    for (let i = 0; i < 12; i++) {
      const h = hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }
    hairs.add(this.hairsTop);

    const hairSideGeom = new BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix4(new Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new Mesh(hairSideGeom, hairMat);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    const hairBackGeom = new BoxGeometry(2, 8, 10);
    const hairBack = new Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0);
    hairs.add(hairBack);
    hairs.position.set(-5, 5, 0);

    this.mesh.add(hairs);

    const glassGeom = new BoxGeometry(5, 5, 5);
    const glassMat = new MeshLambertMaterial({
      color: AviatorColors.brown,
    });
    const glassR = new Mesh(glassGeom, glassMat);
    glassR.position.set(6, 0, 3);
    const glassL = glassR.clone();
    glassL.position.z = -glassR.position.z;

    const glassAGeom = new BoxGeometry(11, 1, 11);
    const glassA = new Mesh(glassAGeom, glassMat);
    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(glassA);

    const earGeom = new BoxGeometry(2, 3, 2);
    const earL = new Mesh(earGeom, faceMat);
    earL.position.set(0, 0, -6);
    const earR = earL.clone();
    earR.position.set(0, 0, 6);
    this.mesh.add(earL);
    this.mesh.add(earR);
  }

  update(delta: number) {
    const hairs = this.hairsTop.children;

    const l = hairs.length;
    for (let i = 0; i < l; i++) {
      const h = hairs[i];
      h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }
    this.angleHairs += 0.16;
  }
}
