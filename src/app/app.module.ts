import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemateComponent } from './components/temate/temate.component';
import { DataComponent } from './components/data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    TemateComponent,
    DataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
