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
    const container = new ContainerBuilder().create(this.window, containerRef);
    const scene = new SceneBuilder().create();
    const camera = new CameraBuilder().create(container);
    const renderer = new RendererBuilder().create().insertVRButton(container);
    const controls = new OrbitControlsBuilder().create(camera, renderer);

    const skybox = new SkyboxBuilder().create();
    scene.addCubeTexture(skybox.cubeTexture);

    const sun = new SunBuilder().create();
    scene.add(sun);

    const earth = new EarthBuilder().create();
    scene.add(earth);

    renderer.start(container, scene, camera);
    new AnimationLooperManager(scene, camera, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
