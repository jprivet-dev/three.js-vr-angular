import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAntialiasComponent } from './button-antialias.component';

describe('ButtonAntialiasComponent', () => {
  let component: ButtonAntialiasComponent;
  let fixture: ComponentFixture<ButtonAntialiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAntialiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAntialiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
