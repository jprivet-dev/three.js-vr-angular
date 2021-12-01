import { Component, OnDestroy } from '@angular/core';
import { AppActions } from '@core/store/actions';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { Observable } from 'rxjs';
import { PlanetsService } from '../../services/planets.service';
import { PlanetsActions } from '../../store/actions';
import { PlanetsFacade } from '../../store/planets.facade';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss'],
})
export class PlanetsPageComponent implements OnDestroy {
  flyMode$: Observable<boolean> = this.facade.flyMode$;
  stats$: Observable<boolean> = this.app.stats$;
  isHDDefinition$: Observable<boolean> = this.app.isHDDefinition$;
  antialias$: Observable<boolean> = this.app.antialias$;

  constructor(
    private window: Window,
    private service: PlanetsService,
    private app: AppFacade,
    private facade: PlanetsFacade
  ) {}

  onContainerInit(container: Container): void {
    this.service.buildScene(container);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(PlanetsActions.switchFlyMode());
  }

  onSwitchStats(): void {
    this.app.dispatch(AppActions.switchStats());
  }

  onSwitchDefinition(): void {
    this.app.dispatch(AppActions.switchDefinition());
  }

  onSwitchAntialias(): void {
    this.app.dispatch(AppActions.switchAntialias());
  }

  onVRSessionStart() {
    this.facade.dispatch(PlanetsActions.vrSessionStart());
  }

  onVRSessionEnd() {
    this.facade.dispatch(PlanetsActions.vrSessionEnd());
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
