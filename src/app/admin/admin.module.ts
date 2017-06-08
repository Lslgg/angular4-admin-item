import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MenuModule } from './menu/menu.module';
import { HeaderComponent, FooterComponent, SidebarComponent } from './layouts';
import { BreadcrumbsComponent } from './common/component/crumbs'
import { DatepickerModule } from 'angular2-material-datepicker';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule, ComponentList } from './admin.routing';
import { SIDEBAR_TOGGLE_DIRECTIVES, NAV_DROPDOWN_DIRECTIVES, AsideToggleDirective } from './common/directive';
import { CommonModule as MyCommonModule } from './common/common.module';

import { TemplateModule } from './template/template.module'
import { CardLogService } from './cardLog/shared/cardLog.service';
import { CheckedPipe, KeysPipe } from './power/shared/power.pipe'

@NgModule({
  imports: [
    SystemCommonModule,
    FormsModule,
    HttpModule,
    DatepickerModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    MyCommonModule,
    TemplateModule,
    AdminRoutingModule,
    MenuModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    AsideToggleDirective,
    CheckedPipe,
    KeysPipe,
    ComponentList
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    CardLogService,
  ],
  bootstrap: [
    AdminComponent
  ]
})

export class AdminModule { }
