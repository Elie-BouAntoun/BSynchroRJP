import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { ClickOutsideDirective } from './_shared/directives/click-outside.directive';
import { SharedFunctions } from './_shared/shared-functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,

    AppComponent,
    FeedbackComponent
  ], 
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [SharedFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
