import { Component, OnDestroy } from '@angular/core';
import { AppActions } from '@core/store/actions';
import { AppFacade } from '@core/store/app.facade';
import { Container } from '@shared/container';
import { Observable } from 'rxjs';
import { FlyingObject } from '../../models/aviator-colors.model';
import { AviatorService } from '../../services/aviator.service';
import { AviatorActions } from '../../store/actions';
import { AviatorFacade } from '../../store/aviator.facade';

@Component({
  selector: 'app-aviator-page',
  templateUrl: './aviator-page.component.html',
  styleUrls: ['./aviator-page.component.scss'],
})
export class AviatorPageComponent implements OnDestroy {
  stats$: Observable<boolean> = this.app.stats$;
  antialias$: Observable<boolean> = this.app.antialias$;
  flyingObject$: Observable<FlyingObject> = this.facade.flyingObject$;
  play$: Observable<boolean> = this.facade.play$;

  constructor(
    private window: Window,
    private service: AviatorService,
    private app: AppFacade,
    private facade: AviatorFacade
  ) {}

  onContainerInit(container: Container): void {
    this.service.buildScene(container);
  }

  onSwitchStats(): void {
    this.app.dispatch(AppActions.switchStats());
  }

  onSwitchAntialias(): void {
    this.app.dispatch(AppActions.switchAntialias());
  }

  onChangeFlyingObject(flyingObject: FlyingObject): void {
    this.facade.dispatch(AviatorActions.changeFlyingObject({ flyingObject }));
  }

  onSwitchPlay(): void {
    this.facade.dispatch(AviatorActions.switchPlay());
  }

  onVRSessionStart(): void {
    this.facade.dispatch(AviatorActions.vrSessionStart());
  }

  onVRSessionEnd(): void {
    this.facade.dispatch(AviatorActions.vrSessionEnd());
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }
}
