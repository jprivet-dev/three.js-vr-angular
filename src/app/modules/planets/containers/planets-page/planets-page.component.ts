import { Component } from '@angular/core';
import { RendererInitEvent } from '@shared/renderer/renderer.model';
import { Observable } from 'rxjs';
import { PlanetsService } from '../../services/planets.service';
import { PlanetsActions } from '../../store/actions';
import { PlanetsFacade } from '../../store/planets.facade';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss'],
})
export class PlanetsPageComponent {
  flyMode$: Observable<boolean> = this.facade.flyMode$;
  isHDDefinition$: Observable<boolean> = this.facade.isHDDefinition$;
  antialias$: Observable<boolean> = this.facade.antialias$;

  constructor(
    private window: Window,
    private service: PlanetsService,
    private facade: PlanetsFacade
  ) {}

  onRendererInit(event: RendererInitEvent): void {
    this.service.buildScene(event.container, event.renderer);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(PlanetsActions.switchFlyMode());
  }

  onSwitchDefinition(): void {
    this.facade.dispatch(PlanetsActions.switchDefinition());
  }

  onSwitchAntialias(): void {
    this.facade.dispatch(PlanetsActions.switchAntialias());
  }

  onVRSessionStart() {
    this.facade.dispatch(PlanetsActions.vrSessionStart());
  }

  onVRSessionEnd() {
    this.facade.dispatch(PlanetsActions.vrSessionEnd());
  }
}
