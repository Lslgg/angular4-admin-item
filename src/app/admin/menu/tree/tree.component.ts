import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';

@Component({
    selector: 'admin-tree',
    styleUrls:["menu.scss"],
    template: `
          <ul>
            <li>
                 <i class="fa icon-folder" menuroot></i> 根目录
                        <span>
                            <i class="fa fa-plus"></i>
                            <i class="fa fa-edit"></i>
                            <i class="fa fa-minus"></i>
                     </span>
            </li>
            <ng-container  *ngFor="let menu of FirstMenulist">
                <menuContent [item]="menu" class="table_tr tr_0" menuTrhover></menuContent>
            </ng-container>
        </ul>
    `
})
export class TreeComponent implements OnInit {

    FirstMenulist: Array<Menu>;


    constructor() {
        this.FirstMenulist = Menu.MenuList().filter(m => m.pid == "0");
    }

    ngOnInit() { }
}