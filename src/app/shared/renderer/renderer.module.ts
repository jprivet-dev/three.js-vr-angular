import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RendererComponent } from './renderer.component';

@NgModule({
  declarations: [RendererComponent],
  imports: [CommonModule],
  exports: [RendererComponent],
})
export class RendererModule {}
