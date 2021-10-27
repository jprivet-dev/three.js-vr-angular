import { Scene } from 'three';
import { StarsTexture } from '../textures/stars.texture';

export class Space extends Scene {
  private stars!: StarsTexture;

  setStars(stars: StarsTexture) {
    // this.background = stars.cubeTex
  }
}
