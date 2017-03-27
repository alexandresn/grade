import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridModule } from "app/grid/grid.module";
import { AppService } from "app/app.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    GridModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
