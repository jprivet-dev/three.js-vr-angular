import { Component, OnDestroy } from '@angular/core';
import { ContainerEvent } from '@shared/container/container.model';
import { Observable } from 'rxjs';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { AviatorService } from '../../services/aviator.service';
import { AviatorActions } from '../../store/actions';
import { AviatorFacade } from '../../store/aviator.facade';

@Component({
  selector: 'app-aviator-page',
  templateUrl: './aviator-page.component.html',
  styleUrls: ['./aviator-page.component.scss'],
})
export class AviatorPageComponent implements OnDestroy {
  rendererParameters: WebGLRendererParameters = {
  };

  flyMode$: Observable<boolean> = this.facade.flyMode$;
  antialias$: Observable<boolean> = this.facade.antialias$;

  constructor(
    private window: Window,
    private service: AviatorService,
    private facade: AviatorFacade
  ) {}

  onContainerInit(event: ContainerEvent): void {
    this.service.buildScene(event);
  }

  onContainerUpdate(event: ContainerEvent): void {
    this.service.updateContainer(event);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(AviatorActions.switchFlyMode());
  }

  onSwitchAntialias(): void {
    this.facade.dispatch(AviatorActions.switchAntialias());
  }

  onVRSessionStart() {
    this.facade.dispatch(AviatorActions.vrSessionStart());
  }

  onVRSessionEnd() {
    this.facade.dispatch(AviatorActions.vrSessionEnd());
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
