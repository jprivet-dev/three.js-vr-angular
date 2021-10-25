import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ThreeJsPageComponent } from './containers/three-js-page/three-js-page.component';

@NgModule({
  declarations: [ThreeJsPageComponent],
  imports: [CommonModule, SharedModule],
})
export class ThreeJsModule {}
