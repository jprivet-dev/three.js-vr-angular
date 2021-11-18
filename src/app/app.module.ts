import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { windowProvider } from '@core/window/window.provider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot({}, {})],
  providers: [windowProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
