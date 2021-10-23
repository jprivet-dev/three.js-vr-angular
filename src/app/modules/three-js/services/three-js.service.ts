import { ElementRef, Injectable } from '@angular/core';
import {
  CameraBuilder,
  CloudsBuilder,
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
    const renderer = RendererBuilder.create(container, scene, camera);
    const controls = OrbitControlsBuilder.create(camera, renderer);

    const skybox = SkyboxBuilder.create();
    const sun = SunBuilder.create();
    const clouds = CloudsBuilder.create();
    const earth = EarthBuilder.create();

    scene.addSkybox(skybox).add(sun, earth, clouds);
    renderer.enableVRButton().start();

    new AnimationLooperManager(scene, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
