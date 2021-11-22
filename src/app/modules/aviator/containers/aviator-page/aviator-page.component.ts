import { Component, OnDestroy } from '@angular/core';
import { RendererInitEvent } from '@shared/renderer/renderer.model';
import { Observable } from 'rxjs';
import { AviatorService } from '../../services/aviator.service';
import { AviatorActions } from '../../store/actions';
import { AviatorFacade } from '../../store/aviator.facade';

@Component({
  selector: 'app-aviator-page',
  templateUrl: './aviator-page.component.html',
  styleUrls: ['./aviator-page.component.scss'],
})
export class AviatorPageComponent implements OnDestroy {
  flyMode$: Observable<boolean> = this.facade.flyMode$;
  isHDDefinition$: Observable<boolean> = this.facade.isHDDefinition$;
  antialias$: Observable<boolean> = this.facade.antialias$;

  constructor(
    private window: Window,
    private service: AviatorService,
    private facade: AviatorFacade
  ) {}

  onRendererInit(event: RendererInitEvent): void {
    this.service.buildScene(event.container, event.renderer);
  }

  onRendererUpdate(event: RendererInitEvent): void {
    this.service.updateRenderer(event.renderer);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(AviatorActions.switchFlyMode());
  }

  onSwitchDefinition(): void {
    this.facade.dispatch(AviatorActions.switchDefinition());
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
