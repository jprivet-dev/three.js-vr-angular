import { HasMesh, Loop } from '@shared/threejs/models';
import { applyOffsetXYZAs } from '@shared/utils';
import {
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  MeshPhongMaterial,
  Object3D,
} from 'three';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { AviatorColors } from '../../models/aviator-colors.model';

export class Spaceship implements HasMesh, Loop {
  mesh: Object3D;

  constructor() {
    const all = new Object3D();

    this.mesh = new Object3D();
    this.mesh.name = 'airPlane';

    // Cockpit

    const geomBody = new CylinderGeometry(35, 35, 120, 16, 1);
    const matBody = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const body = new Mesh(geomBody, matBody);
    body.rotation.x = Math.PI / 2;
    all.add(body);

    const geomBodyHead = new CylinderGeometry(35, 0, 60, 16, 1);
    const verticesBodyHead = geomBodyHead.getAttribute('position');
    applyOffsetXYZAs(verticesBodyHead, 20, 0, 0, 10);

    const matBodyHead = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const bodyHead = new Mesh(geomBodyHead, matBodyHead);
    bodyHead.position.y = -90;
    body.add(bodyHead);
    // Flames

    const reactor = (): Mesh => {
      const geomReactor = new BoxGeometry(20, 30, 20, 1, 1, 1);
      const matReactor = new MeshPhongMaterial({
        color: 0x1d1e1c,
        flatShading: true,
      });

      const geomFlame = new CylinderGeometry(0, 8, 30, 16, 1);
      const matFlame = new MeshBasicMaterial({
        color: 0xffa435,
        transparent: true,
      });

      const reactor = new Mesh(geomReactor, matReactor);
      const flame = new Mesh(geomFlame, matFlame);
      reactor.rotation.y = Math.PI / 4;
      flame.rotation.x = Math.PI;
      flame.position.y = -30;
      reactor.add(flame);

      return reactor;
    };

    const reactorX = 55;
    const reactorZ = 45;

    const reactor1 = reactor();
    reactor1.position.set(reactorX, 0, reactorZ);
    all.add(reactor1);

    const reactor2 = reactor1.clone();
    reactor2.position.set(-reactorX, 0, reactorZ);
    all.add(reactor2);

    const reactor3 = reactor1.clone();
    reactor3.position.set(reactorX, 0, -reactorZ);
    all.add(reactor3);

    const reactor4 = reactor1.clone();
    reactor4.position.set(-reactorX, 0, -reactorZ);
    all.add(reactor4);

    const reactor5: Mesh = reactor1.clone();
    reactor5.scale.set(2, 2, 2);
    reactor5.position.set(0, 0, 50);
    reactor5.rotation.x = -Math.PI / 2;
    all.add(reactor5);

    all.castShadow = true;
    all.receiveShadow = true;

    this.mesh.add(all);
  }

  update(delta: number): void {}
}
