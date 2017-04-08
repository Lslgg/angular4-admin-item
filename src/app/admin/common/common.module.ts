import { NgModule } from '@angular/core';
import { CommonModule as SysteCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonComponent }   from './common.component';
import { EqualValidator } from './directive/equal.directive'

import {
    NavComponent,
    CrumbsComponent,
    TableOperationComponent,
    TableModule,
    FormFooterComponent,
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
        FormFooterComponent
    ],
    exports:[
        CommonComponent,
        NavComponent,
        TableModule,
        CrumbsComponent,
        TableOperationComponent,
        EqualValidator,
        FormFooterComponent,
    ],
    bootstrap: [CommonComponent],
})
export class CommonModule { }

