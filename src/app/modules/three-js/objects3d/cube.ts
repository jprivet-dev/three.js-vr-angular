import * as THREE from 'three';
import { Animation } from '../models/animation';

export class Cube extends THREE.Mesh implements Animation {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    super(geometry, material);
  }

  animate() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}
