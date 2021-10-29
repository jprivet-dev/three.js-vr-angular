import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonAntialiasComponent } from './button-antialias/button-antialias.component';
import { ButtonDefinitionComponent } from './button-definition/button-definition.component';

const components = [ButtonDefinitionComponent, ButtonAntialiasComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class SharedModule {}
