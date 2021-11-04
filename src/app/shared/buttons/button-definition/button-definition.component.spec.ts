import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDefinitionComponent } from './button-definition.component';

describe('ButtonDefinitionComponent', () => {
  let component: ButtonDefinitionComponent;
  let fixture: ComponentFixture<ButtonDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonDefinitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
