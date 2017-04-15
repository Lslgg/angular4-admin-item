import { NgModule } from '@angular/core';
import { CommonModule as SystemCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu.component';
import { TreeComponent,NodeComponent } from './tree';
import { MenuDirective, MenuTrhover } from './directive/menu.directive';
import { MenuService } from './shared/menu.service';

@NgModule({
    imports: [
        SystemCommonModule,
        FormsModule
    ],
    exports: [
        TreeComponent,
        NodeComponent,
        MenuDirective,
        MenuTrhover
    ],
    declarations: [ 
        TreeComponent,
        NodeComponent,
        MenuDirective,
        MenuTrhover,
    ],
    providers: [ MenuService ],
})
export class MenuModule { }
