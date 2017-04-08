import { NgModule } from '@angular/core';
import { CommonModule as SysteCommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { TableComponent } from './table.component';
import { PagiationComponent } from './pagiation/pagiation.component';
export {Table,Row,OperationType} from './module/table';

@NgModule({
    imports:[ 
        SysteCommonModule 
    ],
    exports:[
        TableComponent,
    ],
    declarations: [
        TableComponent,
        PagiationComponent
    ],
    bootstrap: [TableComponent],
})
export class TableModule { }
