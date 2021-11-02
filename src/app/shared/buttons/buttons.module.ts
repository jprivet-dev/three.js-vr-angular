import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonAntialiasComponent } from './button-antialias/button-antialias.component';
import { ButtonDefinitionComponent } from './button-definition/button-definition.component';
import { ButtonHomeComponent } from './button-home/button-home.component';

const components = [
  ButtonDefinitionComponent,
  ButtonAntialiasComponent,
  ButtonHomeComponent,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule],
  exports: [components],
})
export class ButtonsModule {}
