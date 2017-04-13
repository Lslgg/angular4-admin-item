import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { MenuModule } from './menu/menu.module';

import { CommonModule as SystemCommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent, SidebarComponent, AsideComponent } from './layouts';

import { BreadcrumbsComponent } from './common/component/crumbs'

import { AdminComponent } from './admin.component';

import { AdminRoutingModule, ComponentList } from './admin.routing';

import {
  SIDEBAR_TOGGLE_DIRECTIVES,
  NAV_DROPDOWN_DIRECTIVES,
  AsideToggleDirective
} from './common/directive';



import { CommonModule as MyCommonModule } from './common/common.module';
import { TemplateModule } from './template/template.module'

import { CardLogService } from './cardLog/shared/cardLog.service';

@NgModule({
  imports: [
    SystemCommonModule,
    FormsModule,
    HttpModule,
    MyCommonModule,
    TemplateModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    AdminRoutingModule,
    MenuModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AsideComponent,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    AsideToggleDirective,
    ComponentList
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    CardLogService
  ],
  bootstrap: [
    AdminComponent
  ]
})

export class AdminModule { }
