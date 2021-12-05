import { HasMesh, Loop } from '@shared/threejs/models';
import { applyOffsetXYZAs } from '@shared/utils';
import { CylinderGeometry, Mesh, MeshPhongMaterial, Object3D } from 'three';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { AviatorColors } from '../../models/aviator-colors.model';

export class Spaceship implements HasMesh, Loop {
  mesh: Object3D;
  flames: Mesh[] = [];

  constructor() {
    const all = new Object3D();

    this.mesh = new Object3D();
    this.mesh.name = 'airPlane';

    // Body

    const createBody = (): Mesh => {
      const geomBody = new CylinderGeometry(35, 35, 120, 8, 1);
      const matBody = new MeshPhongMaterial({
        color: AviatorColors.red, flatShading: true,
      });
      const body = new Mesh(geomBody, matBody);
      body.rotation.x = Math.PI / 2;

      const geomBodyFront = new CylinderGeometry(35, 0, 40, 8, 1);
      const verticesBodyFront = geomBodyFront.getAttribute('position');
        applyOffsetXYZAs(verticesBodyFront, 9, 0, 0, 10);

      const matBodyFront = new MeshPhongMaterial({
        color: AviatorColors.red, flatShading: true,
      });
      const bodyFront = new Mesh(geomBodyFront, matBodyFront);
      bodyFront.position.y = -80;
      body.add(bodyFront);

      return body;
    };

    const body = createBody();
    all.add(body);

    // Flames

    const createReactor = (): Mesh => {
      const geomReactor = new CylinderGeometry(14, 14, 30, 8, 1);
      const matReactor = new MeshPhongMaterial({
        color: 0x1d1e1c, flatShading: true,
      });

      const geomFlame = new CylinderGeometry(0, 8, 30, 16, 1);
      const matFlame = new MeshBasicMaterial({
        color: 0xffa435, transparent: true,
      });

      const reactor = new Mesh(geomReactor, matReactor);
      const flame = new Mesh(geomFlame, matFlame);
      reactor.rotation.y = Math.PI / 4;
      flame.rotation.x = Math.PI;
      flame.position.y = -30;
      reactor.add(flame);

      this.flames.push(flame);

      return reactor;
    };

    const reactorPos = {
      x: 55, z: 45,
    };

    const reactor1 = createReactor();
    reactor1.position.set(reactorPos.x, 0, reactorPos.z);
    all.add(reactor1);

    const reactor2 = createReactor();
    reactor2.position.set(-reactorPos.x, 0, reactorPos.z);
    all.add(reactor2);

    const reactor3 = createReactor();
    reactor3.position.set(reactorPos.x, 0, -reactorPos.z);
    all.add(reactor3);

    const reactor4 = createReactor();
    reactor4.position.set(-reactorPos.x, 0, -reactorPos.z);
    all.add(reactor4);

    const reactor5: Mesh = createReactor();
    reactor5.scale.set(1.8, 1.8, 1.8);
    reactor5.position.set(0, 0, 40);
    reactor5.rotation.x = -Math.PI / 2;
    all.add(reactor5);

    all.castShadow = true;
    all.receiveShadow = true;

    this.mesh.add(all);
  }

  update(delta: number): void {
    this.flames.map((flame, index) => {
      const scale = Math.random() * 0.4 + 0.8;
      this.flames[index].scale.set(1, scale, 1);
      this.flames[index].position.y = -15 - 15 * scale;
    })
  }
}
