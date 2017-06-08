import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing Module
import { AppRoutingModule } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './admin/login/login.component';

import { Parse } from './common/parse';
import { CommonHttp } from './common/commonHttp';

import { AuthGuard } from './admin/common/server/auth-guard.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'parse', useClass: Parse },
    { provide: 'commonHttp', useClass: CommonHttp },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
