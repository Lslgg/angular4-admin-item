import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';

@Component({
    selector: 'admin-tree',
    styleUrls:["menu.scss"],
    template: `
          <ul>
            <li menuhover>
                <p menuhover>
                    <i class="fa fa-folder-open" id="0" menuroot></i> 根目录
                    <span>
                        <i class="fa fa-plus"></i>
                        <i class="fa fa-edit"></i>
                        <i class="fa fa-minus"></i>
                    </span>
                </p>
            </li>
            <ng-container  *ngFor="let menu of FirstMenulist">
                <menuContent [item]="menu" class="menu_0"></menuContent>
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