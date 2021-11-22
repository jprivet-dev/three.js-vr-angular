import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AviatorPageComponent } from './aviator-page.component';

describe('AviatorPageComponent', () => {
  let component: AviatorPageComponent;
  let fixture: ComponentFixture<AviatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AviatorPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AviatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
