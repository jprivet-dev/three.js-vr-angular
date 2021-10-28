import { ElementRef, Injectable } from '@angular/core';
import { StoreService } from '@core/store/store.service';
import {
  CameraFactory,
  CloudsFactory,
  ContainerFactory,
  DollyFactory,
  EarthFactory,
  LensfareFactory,
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
  constructor(private window: Window, private store: StoreService) {
  }

  buildScene(containerRef: ElementRef): void {
    const container = ContainerFactory.create(this.window, containerRef);
    const scene = SceneFactory.create();
    const camera = CameraFactory.create(container);
    const renderer = RendererFactory.create(container, scene, camera);

    const dolly = DollyFactory.create(camera);
    scene.add(dolly);

    // Which is the best way to unsubscribe it ?
    this.store.textureDef$.subscribe((textureDev) => {
      const skybox = SkyboxFactory.create(textureDev);
      scene.setSkybox(skybox);
    });
    //
    // const sun = new SunFactory(this.store).create();
    // const lensflare = new LensfareFactory(this.store).create();
    // sun.add(lensflare);
    //
    // const earth = EarthFactory.create(this.store);
    // const clouds = CloudsFactory.create(this.store);
    // earth.add(clouds);
    //
    // scene.add(sun, earth);
    //
    // this.store.textureDef$.subscribe((textureDef) => {
    // });
    //
    renderer.enableVRButton().start();

    const controls = OrbitControlsFactory.create(camera, renderer);
    controls.enableAutoRotate();

    new AnimationLooperManager(scene, renderer, controls).start();
    new WindowResizeManager(container, camera, renderer).start();
    //
    // renderer.object().xr.addEventListener('sessionstart', function (event) {
    //   console.log('VR SESSION START');
    //   dolly.object().position.set(-2.5, 0, 0);
    //   camera.object().position.set(0, 0, 0);
    //   renderer.render();
    // });
    //
    // renderer.object().xr.addEventListener('sessionend', function (event) {
    //   console.log('VR SESSION END');
    //   dolly.object().position.set(0, 0, 0);
    //   camera.object().position.set(0, 0, 5);
    //   renderer.render();
    // });
  }
}
