import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from './buttons/buttons.module';

@NgModule({
  imports: [CommonModule, ButtonsModule],
  exports: [ButtonsModule],
})
export class SharedModule {}
