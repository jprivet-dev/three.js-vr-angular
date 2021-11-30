import { Component, OnDestroy } from '@angular/core';
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
  isHDDefinition$: Observable<boolean> = this.facade.isHDDefinition$;
  antialias$: Observable<boolean> = this.facade.antialias$;

  constructor(
    private window: Window,
    private service: EarthService,
    private facade: EarthFacade
  ) {}

  onContainerInit(container: Container): void {
    this.service.buildScene(container);
  }

  onSwitchFlyMode(): void {
    this.facade.dispatch(EarthActions.switchFlyMode());
  }

  onSwitchDefinition(): void {
    this.facade.dispatch(EarthActions.switchDefinition());
  }

  onSwitchAntialias(): void {
    this.facade.dispatch(EarthActions.switchAntialias());
  }

  onVRSessionStart() {
    this.facade.dispatch(EarthActions.vrSessionStart());
  }

  onVRSessionEnd() {
    this.facade.dispatch(EarthActions.vrSessionEnd());
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
