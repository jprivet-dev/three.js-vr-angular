import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsPageComponent } from './three-js-page.component';

describe('ThreeJsPageComponent', () => {
  let component: ThreeJsPageComponent;
  let fixture: ComponentFixture<ThreeJsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeJsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
