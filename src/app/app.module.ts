import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './admin/login/login.component';

import { Parse } from './common/parse';
import { CommonHttp } from './common/commonHttp';
import { Global } from './common/global';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'parse', useClass: Parse },
    { provide: 'commonHttp', useClass: CommonHttp },
    { provide: 'global', useClass: Global }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
