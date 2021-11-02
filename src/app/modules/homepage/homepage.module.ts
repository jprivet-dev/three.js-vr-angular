import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, SharedModule, HomepageRoutingModule],
})
export class HomepageModule {}
