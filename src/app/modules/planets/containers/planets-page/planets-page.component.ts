import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { Container } from '@shared/threejs/containers';
import { Observable } from 'rxjs';
import { PlanetsService } from '../../services/planets.service';
import { PlanetsActions } from '../../store/actions';
import { PlanetsFacade } from '../../store/planets.facade';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss'],
})
export class PlanetsPageComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;

  isFlyMode$: Observable<boolean> = this.store.isFlyMode$;
  isAntialias$: Observable<boolean> = this.store.isAntialias$;
  isHDDefinition$: Observable<boolean> = this.store.isHDDefinition$;

  constructor(
    private window: Window,
    private store: StoreService,
    private service: PlanetsService,
    private facade: PlanetsFacade,
  ) {}

  ngAfterViewInit(): void {
    const container = new Container(this.window, this.containerRef);
    this.service.buildScene(container);
  }

  onSwitchFlyMode(): void {
    this.store.switchFlyMode();
  }

  onSwitchAntialias(): void {
    this.store.switchAntialias();
  }

  onSwitchDefinition(): void {
    //this.store.switchDefinition();
    this.facade.dispatch(PlanetsActions.switchDefinition())
  }
}
