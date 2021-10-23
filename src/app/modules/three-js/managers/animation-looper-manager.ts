import { Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CameraDecorator,
  RendererDecorator,
  SceneDecorator,
} from '../decorators';

export class AnimationLooperManager {
  private clock = new Clock();

  constructor(
    private scene: SceneDecorator,
    private camera: CameraDecorator,
    private renderer: RendererDecorator,
    private controls: OrbitControls,
  ) {}

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.controls.update();
      this.scene.animate(this.delta());
      this.renderer.render(this.scene, this.camera);
    });
  }

  delta(): number {
    return this.clock.getDelta(); // Get the seconds passed since the time oldTime was set and sets oldTime to the current time.
  }
}
