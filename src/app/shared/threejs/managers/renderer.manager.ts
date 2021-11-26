import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Container } from '../containers';
import { WindowResize } from '../models';
import { LoopManager } from './index';

export class RendererManager implements WindowResize {
  constructor(
    private loop: LoopManager,
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: PerspectiveCamera
  ) {
    this.setAnimationLoop();
  }

  resize(container: Container): void  {
    this.camera.aspect = container.ratio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.width(), container.height());
  }

  updateRenderer(renderer: WebGLRenderer): void {
    this.renderer = renderer;
    this.setAnimationLoop();
  }

  private setAnimationLoop() {
    this.renderer.setAnimationLoop(() => {
      this.loop.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
}
