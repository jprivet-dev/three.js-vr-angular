import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { ContainerModule } from './container/container.module';

@NgModule({
  imports: [CommonModule, MenuModule, ContainerModule],
  exports: [MenuModule, ContainerModule],
})
export class SharedModule {}
