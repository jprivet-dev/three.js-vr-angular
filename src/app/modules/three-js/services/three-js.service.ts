import { ElementRef, Injectable } from '@angular/core';
import { CameraBuilder, RendererBuilder, SceneBuilder } from '../builders';
import { ContainerBuilder } from '../builders/container-builder';
import { EarthBuilder } from '../builders/earth-builder';
import { OrbitControlsBuilder } from '../builders/orbit-controls-builder';
import { SkyboxBuilder } from '../builders/skybox-builder';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window) {
  }

  buildScene(containerRef: ElementRef): void {
    const container = new ContainerBuilder().create(this.window, containerRef);
    const scene = new SceneBuilder().create();
    const camera = new CameraBuilder().create(container);
    const renderer = new RendererBuilder().create().insertVRButton(container);
    const controls = new OrbitControlsBuilder().create(camera, renderer);

    const earth = new EarthBuilder().create();
    scene.add(earth);

    const skybox = new SkyboxBuilder().create();
    scene.addCubeTexture(skybox.cubeTexture);

    renderer.start(container, scene, camera);
    new AnimationLooperManager(scene, camera, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
