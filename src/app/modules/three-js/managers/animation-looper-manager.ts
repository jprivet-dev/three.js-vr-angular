import { Clock } from 'three';
import { RendererDecorator, SceneDecorator } from '../decorators';
import { OrbitControlsDecorator } from '../decorators/orbit-controls-decorator';

export class AnimationLooperManager {
  private clock = new Clock();

  constructor(
    private scene: SceneDecorator,
    private renderer: RendererDecorator,
    private controls: OrbitControlsDecorator
  ) {}

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.controls.update();
      this.scene.animate(this.delta());
      this.renderer.render();
    });
  }

  delta(): number {
    return this.clock.getDelta(); // Get the seconds passed since the time oldTime was set and sets oldTime to the current time.
  }
}
