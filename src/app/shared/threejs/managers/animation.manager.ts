import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Container } from '../containers';
import { LoopManager } from './index';

export class AnimationManager {
  constructor(
    private loop: LoopManager,
    private container: Container,
    private scene: Scene,
    private camera: PerspectiveCamera
  ) {
    this.setAnimationLoop();
  }

  updateRenderer(renderer: WebGLRenderer): void {
    this.container.renderer.setAnimationLoop(null);
    this.container.renderer = renderer;
    this.setAnimationLoop();
  }
  
  private setAnimationLoop() {
    this.container.renderer.setAnimationLoop(() => {
      this.loop.update();
      this.container.renderer.render(this.scene, this.camera);
    });
  }
}
