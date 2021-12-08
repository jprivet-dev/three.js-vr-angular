import { HasMesh, Loop, LoopWithControls } from '@shared/threejs/models';
import { gsap } from 'gsap';
import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Vector3,
} from 'three';

const materials = {
  orange: new MeshPhongMaterial({ color: 0xb7513c, flatShading: true }),
  green: new MeshPhongMaterial({ color: 0x379351, flatShading: true }),
  brown: new MeshPhongMaterial({ color: 0x5c2c22, flatShading: true }),
  pink: new MeshPhongMaterial({ color: 0xb1325e, flatShading: true }),
  gray: new MeshPhongMaterial({ color: 0x666666, flatShading: true }),
  clouds: new MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
  rabbit: new MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true }),
};

const shadowSupport = (group: Group) => {
  group.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
};

class Carrot {
  public mesh: any;
  private body: any;
  private wings: any;
  private leafs: any;
  public pilot: any;

  constructor() {
    this.mesh = new Group();

    this.body = this._createBody();
    this.wings = this._createWings();
    this.leafs = this._createLeafs();
    this.pilot = new Pilot();

    this.mesh.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 2);
    this.mesh.rotateOnAxis(new Vector3(0, 0, 1), Math.PI);

    this.mesh.add(this.body);
    this.mesh.add(this.wings);
    this.mesh.add(this.leafs);
    this.mesh.add(this.pilot.mesh);
  }

  _createBody() {
    const group = new Group();

    const bodyGeom = new CylinderGeometry(5, 2, 25);
    // bodyGeom.vertices[16].y += 3;
    // bodyGeom.vertices[17].y -= 2;

    group.add(new Mesh(bodyGeom, materials.orange));

    shadowSupport(group);

    return group;
  }

  _createWings() {
    const group = new Group();
    const geometry = new BoxGeometry(7, 7, 0.5);

    // geometry.vertices[2].y += 2;
    // geometry.vertices[3].y += 2;
    // geometry.vertices[2].x -= 1;
    // geometry.vertices[3].x -= 1;

    const wingR = new Mesh(geometry, materials.brown);
    wingR.position.x = 6;
    wingR.position.y = 2;
    wingR.position.z = 1;

    const wingL = wingR.clone();
    wingL.position.x = -6;
    wingL.rotation.y = Math.PI;

    group.add(wingR);
    group.add(wingL);

    shadowSupport(group);

    return group;
  }

  _createLeafs() {
    const group = new Group();
    const geometry = new CylinderGeometry(1.5, 1, 5, 4);

    // geometry.vertices[8].y += 0.5;

    const leafA = new Mesh(geometry, materials.green);
    leafA.position.y = 16;

    const leafB = leafA.clone();
    leafB.position.x = -1.75;
    leafB.position.y = 15;
    leafB.rotation.z = 0.4;

    const leafC = leafB.clone();
    leafC.position.x = leafB.position.x * -1;
    leafC.rotation.z = leafB.rotation.z * -1;

    group.add(leafA);
    group.add(leafB);
    group.add(leafC);

    return group;
  }
}

class Pilot {
  private mesh: any;
  private pilot: any;
  public earPivotL: any;
  public earPivotR: any;
  private eye: any;
  private eyeb: any;

  constructor() {
    this.mesh = new Group();

    this.pilot = this._createPilot();

    this.mesh.rotation.x = 1.5;
    this.mesh.position.set(0, 7, 5);

    this.mesh.add(this.pilot);
  }

  _createPilot() {
    const group = new Group();

    const bodyGeo = new BoxGeometry(5, 5, 5);
    // bodyGeo.vertices[3].y += 0.5;
    // bodyGeo.vertices[6].y += 0.5;

    const body = new Mesh(bodyGeo, materials.rabbit);
    body.position.y = 1;
    body.position.z = 4;

    const seatGeo = new BoxGeometry(6, 1, 6);
    const seat = new Mesh(seatGeo, materials.brown);
    seat.position.set(0, -2.5, 0);
    seat.rotation.set(0.25, 0, 0);
    body.add(seat);

    this.earPivotL = new Object3D();
    this.earPivotL.applyMatrix(new Matrix4().makeTranslation(0, 2.5, 0));
    this.earPivotL.rotation.x = -Math.PI / 2.25;

    this.earPivotR = this.earPivotL.clone();
    this.earPivotR.rotation.x = -Math.PI / 3;

    const earGeo = new BoxGeometry(2, 6, 0.5);
    // earGeo.vertices[2].x -= 0.5;
    // earGeo.vertices[3].x -= 0.5;
    // earGeo.vertices[6].x += 0.5;
    // earGeo.vertices[7].x += 0.5;

    const ear = new Mesh(earGeo, materials.rabbit);
    ear.position.x = -1.5;
    ear.position.y = 2.5;

    const earInside = new Mesh(earGeo, materials.pink);
    earInside.scale.set(0.5, 0.7, 0.5);
    earInside.position.set(0, 0, 0.25);
    ear.add(earInside);

    this.earPivotL.add(ear);
    body.add(this.earPivotL);

    const ear2 = ear.clone();
    ear2.position.x = ear.position.x * -1;
    this.earPivotR.add(ear2);
    body.add(this.earPivotR);

    const eyeGeo = new BoxGeometry(0.5, 1, 0.5);
    const eye = new Mesh(eyeGeo, materials.gray);
    eye.position.set(1, 0.5, 2.5);
    body.add(eye);
    this.eye = eye;

    const eyeb = eye.clone();
    eyeb.position.x = eye.position.x * -1;
    this.eyeb = eyeb;
    body.add(eyeb);

    const noseGeo = new BoxGeometry(0.5, 0.5, 0.5);
    // noseGeo.vertices[2].x = 0;
    // noseGeo.vertices[3].x = 0;
    // noseGeo.vertices[6].x = 0;
    // noseGeo.vertices[7].x = 0;
    const nose = new Mesh(noseGeo, materials.pink);
    nose.position.set(0, -0.5, 2.5);
    body.add(nose);

    const mouthGeo = new BoxGeometry(0.25, 0.25, 0.5);
    const mouth = new Mesh(mouthGeo, materials.gray);
    mouth.position.set(0, -1.5, 2.5);
    body.add(mouth);

    group.add(body);

    return group;
  }
}

/**
 * https://codepen.io/noeldelgado/pen/PxwKPW
 */
export class Rabbit extends LoopWithControls implements HasMesh, Loop {
  private carrot: Carrot;

  constructor() {
    super();
    this.carrot = new Carrot();
  }

  get mesh(): Object3D {
    return this.carrot.mesh;
    this.animate();
  }

  animate() {
    gsap.to(this.carrot.pilot.earPivotL.rotation, 0.1, {
      x: () => Math.sin(-Math.PI / 3),
      repeat: -1,
      yoyo: true,
    });

    gsap.to(this.carrot.pilot.earPivotR.rotation, 0.1, {
      x: () => -Math.PI / 2.25,
      repeat: -1,
      yoyo: true,
    });
  }

  update(delta: number): void {
    if (this.isLoopDisabled) return;
  }
}
