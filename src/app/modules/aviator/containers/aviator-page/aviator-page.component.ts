import { Component, OnDestroy } from '@angular/core';
import { AppActions } from '@core/store/actions';
import { Container } from '@shared/container';
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
  antialias$: Observable<boolean> = this.facade.antialias$;

  constructor(
    private window: Window,
    private service: AviatorService,
    private facade: AviatorFacade
  ) {}

  onContainerInit(container: Container): void {
    this.service.buildScene(container);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(AviatorActions.switchFlyMode());
  }

  onSwitchAntialias(): void {
    this.facade.dispatch(AppActions.switchAntialias());
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
