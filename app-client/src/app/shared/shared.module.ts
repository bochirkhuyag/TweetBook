import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
  declarations: [TimeAgoPipe],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    ToastModule
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    TimeAgoPipe
  ]
})
export class SharedModule { }
