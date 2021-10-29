import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonDefinitionComponent } from './button-definition/button-definition.component';

@NgModule({
  declarations: [ButtonDefinitionComponent],
  imports: [CommonModule],
  exports: [ButtonDefinitionComponent],
})
export class SharedModule {}
