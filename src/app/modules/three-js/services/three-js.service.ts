import { ElementRef, Injectable } from '@angular/core';
import { CameraBuilder, RendererBuilder, SceneBuilder } from '../builders';
import { ContainerBuilder } from '../builders/container-builder';
import { EarthBuilder } from '../builders/earth-builder';
import { OrbitControlsBuilder } from '../builders/orbit-controls-builder';
import { SkyboxBuilder } from '../builders/skybox-builder';
import { SunBuilder } from '../builders/sun-builder';
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
    const renderer = RendererBuilder.create(container, scene, camera).enableVRButton();
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
