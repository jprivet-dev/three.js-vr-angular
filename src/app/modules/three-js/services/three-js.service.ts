import { ElementRef, Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
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
  constructor(private window: Window, private store: StoreService) {}

  buildScene(containerRef: ElementRef): void {
    const container = ContainerBuilder.create(this.window, containerRef);
    const scene = SceneBuilder.create();
    const camera = CameraBuilder.create(container);
    const renderer = RendererBuilder.create(container, scene, camera);
    const controls = OrbitControlsBuilder.create(camera, renderer);

    this.store.textureDef$.subscribe((textureDev) => {
      const skybox = SkyboxBuilder.create(textureDev);
      scene.setSkybox(skybox);
    });

    const sun = SunBuilder.create(this.store);
    const clouds = CloudsBuilder.create(this.store);
    const earth = EarthBuilder.create(this.store);
    scene.add(sun, earth, clouds);

    renderer.enableVRButton().start();

    new AnimationLooperManager(scene, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
