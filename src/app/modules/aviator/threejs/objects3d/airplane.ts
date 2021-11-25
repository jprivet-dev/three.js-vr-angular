import { HasMesh, Loop } from '@shared/threejs/models';
import { applyOffsetXYZAs } from '@shared/utils';
import { BoxGeometry, Matrix4, Mesh, MeshPhongMaterial, Object3D } from 'three';
import { AviatorColors } from '../../models/aviator-colors.model';
import { Pilot } from './pilot';

export class AirPlane implements HasMesh, Loop {
  mesh: Object3D;
  propeller: Mesh;
  pilot: Pilot;

  constructor() {
    this.mesh = new Object3D();
    this.mesh.name = 'airPlane';

    // Cockpit

    const geomCockpit = new BoxGeometry(80, 50, 50, 1, 1, 1);

    const verticesCockpit = geomCockpit.getAttribute('position');
    applyOffsetXYZAs(verticesCockpit, 4, 0, -10, 20);
    applyOffsetXYZAs(verticesCockpit, 5, 0, -10, -20);
    applyOffsetXYZAs(verticesCockpit, 6, 0, 30, 20);
    applyOffsetXYZAs(verticesCockpit, 7, 0, 30, -20);

    const matCockpit = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });

    const cockpit = new Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Engine

    const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new MeshPhongMaterial({
      color: AviatorColors.white,
      flatShading: true,
    });
    const engine = new Mesh(geomEngine, matEngine);
    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Tail Plane

    const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const tailPlane = new Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-40, 20, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Wings

    const geomSideWing = new BoxGeometry(30, 5, 120, 1, 1, 1);
    const matSideWing = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const sideWing = new Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    const geomWindshield = new BoxGeometry(3, 15, 20, 1, 1, 1);
    const matWindshield = new MeshPhongMaterial({
      color: AviatorColors.white,
      transparent: true,
      opacity: 0.3,
      flatShading: true,
    });
    const windshield = new Mesh(geomWindshield, matWindshield);
    windshield.position.set(5, 27, 0);

    windshield.castShadow = true;
    windshield.receiveShadow = true;

    this.mesh.add(windshield);

    const geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);

    const verticesPropeller = geomPropeller.getAttribute('position');
    applyOffsetXYZAs(verticesPropeller, 4, 0, -5, 5);
    applyOffsetXYZAs(verticesPropeller, 5, 0, -5, -5);
    applyOffsetXYZAs(verticesPropeller, 6, 0, 5, 5);
    applyOffsetXYZAs(verticesPropeller, 7, 0, 5, -5);

    const matPropeller = new MeshPhongMaterial({
      color: AviatorColors.brown,
      flatShading: true,
    });
    this.propeller = new Mesh(geomPropeller, matPropeller);

    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    const geomBlade = new BoxGeometry(1, 80, 10, 1, 1, 1);
    const matBlade = new MeshPhongMaterial({
      color: AviatorColors.brownDark,
      flatShading: true,
    });

    const blade1 = new Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;

    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;
    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);

    const wheelProtecGeom = new BoxGeometry(30, 15, 10, 1, 1, 1);
    const wheelProtecMat = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const wheelProtecR = new Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);

    const wheelTireGeom = new BoxGeometry(24, 24, 4);
    const wheelTireMat = new MeshPhongMaterial({
      color: AviatorColors.brownDark,
      flatShading: true,
    });
    const wheelTireR = new Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);

    const wheelAxisGeom = new BoxGeometry(10, 10, 6);
    const wheelAxisMat = new MeshPhongMaterial({
      color: AviatorColors.brown,
      flatShading: true,
    });
    const wheelAxis = new Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    this.mesh.add(wheelTireR);

    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    const wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(0.5, 0.5, 0.5);
    wheelTireB.position.set(-35, -5, 0);
    this.mesh.add(wheelTireB);

    const suspensionGeom = new BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix4(new Matrix4().makeTranslation(0, 10, 0));
    const suspensionMat = new MeshPhongMaterial({
      color: AviatorColors.red,
      flatShading: true,
    });
    const suspension = new Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -0.3;
    this.mesh.add(suspension);

    this.pilot = new Pilot();
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  update(delta: number): void {
    this.propeller.rotation.x += 0.3;
    this.pilot.update(delta);
  }
}
