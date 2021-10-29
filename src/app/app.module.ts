import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { windowProvider } from '@core/window/window.provider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [windowProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
