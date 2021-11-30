import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerModule } from './container/container.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  imports: [CommonModule, MenuModule, ContainerModule],
  exports: [MenuModule, ContainerModule],
})
export class SharedModule {}
