import { ElementRef, Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  CameraFactory,
  CloudsFactory,
  ContainerFactory,
  EarthFactory,
  OrbitControlsFactory,
  RendererFactory,
  SceneFactory,
  SkyboxFactory,
  SunFactory,
} from '../factories';
import { AnimationLooperManager, WindowResizeManager } from '../managers';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  constructor(private window: Window, private store: StoreService) {}

  buildScene(containerRef: ElementRef): void {
    const container = ContainerFactory.create(this.window, containerRef);
    const scene = SceneFactory.create();
    const camera = CameraFactory.create(container);
    const renderer = RendererFactory.create(container, scene, camera);
    const controls = OrbitControlsFactory.create(camera, renderer);

    // Which is the best way to unsubscribe it ?
    this.store.textureDef$.subscribe((textureDev) => {
      const skybox = SkyboxFactory.create(textureDev);
      scene.setSkybox(skybox);
    });

    const sun = (new SunFactory(this.store)).create();
    const clouds = CloudsFactory.create(this.store);
    const earth = EarthFactory.create(this.store);
    scene.add(sun, earth, clouds);

    this.store.textureDef$.subscribe((textureDef) => {
    });

    renderer.enableVRButton().start();

    new AnimationLooperManager(scene, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
  }
}
