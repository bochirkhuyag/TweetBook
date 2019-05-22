import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {TimeAgoPipe} from "time-ago-pipe";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/primeng";

@NgModule({
  declarations: [TimeAgoPipe],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BrowserModule,
    DialogModule,
    ConfirmDialogModule
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
    TimeAgoPipe,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class SharedModule { }
