import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreeJsService } from '../../services/three-js.service';

@Component({
  selector: 'app-three-js-page',
  templateUrl: './three-js-page.component.html',
  styleUrls: ['./three-js-page.component.scss'],
})
export class ThreeJsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;

  constructor(private threeJs: ThreeJsService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.threeJs.render(this.containerRef);
  }
}
