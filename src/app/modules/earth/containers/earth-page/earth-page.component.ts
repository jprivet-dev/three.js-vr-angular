import { Component, OnDestroy } from '@angular/core';
import { AppActions } from '@core/store/actions';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { Observable } from 'rxjs';
import { EarthService } from '../../services/earth.service';
import { EarthActions } from '../../store/actions';
import { EarthFacade } from '../../store/earth.facade';

@Component({
  selector: 'app-earth-page',
  templateUrl: './earth-page.component.html',
  styleUrls: ['./earth-page.component.scss'],
})
export class EarthPageComponent implements OnDestroy {
  flyMode$: Observable<boolean> = this.facade.flyMode$;
  stats$: Observable<boolean> = this.app.stats$;
  isHDDefinition$: Observable<boolean> = this.app.isHDDefinition$;
  antialias$: Observable<boolean> = this.app.antialias$;

  constructor(
    private window: Window,
    private service: EarthService,
    private app: AppFacade,
    private facade: EarthFacade
  ) {}

  onContainerInit(container: Container): void {
    this.service.buildScene(container);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(EarthActions.switchFlyMode());
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

  onVRSessionStart(): void {
    this.facade.dispatch(EarthActions.vrSessionStart());
  }

  onVRSessionEnd(): void {
    this.facade.dispatch(EarthActions.vrSessionEnd());
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }
}
