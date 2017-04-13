import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';

@Component({
    selector: 'menuContent',
    styleUrls:["menu.scss"],
    template: `
        <li style="padding-left:20px;">
            <i class="fa icon-folder" (click)='getSubMenu(item.id)'></i> {{item.title}}
            <span>
                <i class="fa fa-plus"></i>
                <i class="fa fa-edit"></i>
                <i class="fa fa-minus"></i>
            </span>
            <ul *ngIf="Menulist">
          		 <ng-container  *ngFor="let menu of Menulist">
                    <menuContent [item]="menu" class="table_tr tr_0" menuTrhover></menuContent>
                </ng-container>
          	</ul>
        </li>
   
    `,
})
export class NodeComponent implements OnInit {

    @Input() item: any;

    Menulist: Array<Menu>;

    IsExpanded: boolean = false;

    constructor() {

    }

    ngOnInit() {

    }

    getSubMenu(id: string) {
        this.Menulist = Menu.MenuList().filter(m => m.pid == id);
        console.log(this.Menulist);
    }
}

