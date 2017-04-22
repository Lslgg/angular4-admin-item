import { NgModule } from '@angular/core';
import { CommonModule as SysteCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonComponent } from './common.component';
import { EqualValidator } from './directive/equal.directive'

import {
    NavComponent,
    CrumbsComponent,
    TableOperationComponent,
    TableModule,
    FormFooterComponent,
    NotFindPageComponent,
    NotPowerComponent
} from './component/index';


@NgModule({
    imports: [
        SysteCommonModule,
        RouterModule
    ],
    declarations: [
        CommonComponent,
        NavComponent,
        CrumbsComponent,
        TableOperationComponent,
        EqualValidator,
        FormFooterComponent,
        NotFindPageComponent,
        NotPowerComponent
    ],
    exports: [
        CommonComponent,
        NavComponent,
        TableModule,
        CrumbsComponent,
        TableOperationComponent,
        EqualValidator,
        FormFooterComponent,
        NotFindPageComponent,
        NotPowerComponent
    ],
    bootstrap: [CommonComponent],
})
export class CommonModule { }

