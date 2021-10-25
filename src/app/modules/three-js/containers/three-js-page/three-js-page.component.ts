import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StoreService } from '@core/store/store.service';
import { ThreeJsService } from '../../services/three-js.service';

@Component({
  selector: 'app-three-js-page',
  templateUrl: './three-js-page.component.html',
  styleUrls: ['./three-js-page.component.scss'],
})
export class ThreeJsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;

  constructor(private store: StoreService, private threeJs: ThreeJsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.threeJs.buildScene(this.containerRef);
  }
}
