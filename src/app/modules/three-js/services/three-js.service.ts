import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  ContainerBuilder,
  EarthBuilder,
  OrbitControlsBuilder,
  RendererBuilder,
  SceneBuilder,
  SkyboxBuilder,
  SunBuilder,
} from '../builders';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {}

  buildScene(containerRef: ElementRef): void {
    const container = ContainerBuilder.create(this.window, containerRef);
    const scene = SceneBuilder.create();
    const camera = CameraBuilder.create(container);
    const renderer = RendererBuilder.create(
      container,
      scene,
      camera
    ).enableVRButton();
    const controls = OrbitControlsBuilder.create(camera, renderer);

    const skybox = SkyboxBuilder.create();
    scene.addCubeTexture(skybox.cubeTexture);

    const sun = SunBuilder.create();
    scene.add(sun);

    const earth = EarthBuilder.create();
    scene.add(earth);

    renderer.start();
    new AnimationLooperManager(scene, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
