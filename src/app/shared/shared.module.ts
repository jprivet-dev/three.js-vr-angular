import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from './buttons/buttons.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  imports: [CommonModule, ButtonsModule, MenuModule],
  exports: [ButtonsModule, MenuModule],
})
export class SharedModule {}
