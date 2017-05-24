import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SmallbizDetailsComponent } from './smallbiz/smallbiz-details/smallbiz-details.component';
import { SmallbizListComponent } from './smallbiz/smallbiz-list/smallbiz-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SmallbizDetailsComponent,
    SmallbizListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
