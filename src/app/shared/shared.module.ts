import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';

@NgModule({
  imports: [CommonModule, MenuModule],
  exports: [MenuModule],
})
export class SharedModule {}
