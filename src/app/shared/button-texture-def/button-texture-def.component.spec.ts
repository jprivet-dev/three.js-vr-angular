import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTextureDefComponent } from './button-texture-def.component';

describe('ButtonTextureDefComponent', () => {
  let component: ButtonTextureDefComponent;
  let fixture: ComponentFixture<ButtonTextureDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonTextureDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTextureDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
