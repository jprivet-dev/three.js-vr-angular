import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { RendererModule } from './renderer/renderer.module';

@NgModule({
  imports: [CommonModule, MenuModule, RendererModule],
  exports: [MenuModule, RendererModule],
})
export class SharedModule {}
