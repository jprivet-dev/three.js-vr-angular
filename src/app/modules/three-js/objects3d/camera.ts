import * as THREE from 'three';

export class Camera extends THREE.PerspectiveCamera {
  constructor(private container: Element) {
    super(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.position.z = 5
  }
}
