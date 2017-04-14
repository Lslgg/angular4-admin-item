import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-tree',
    styleUrls:["menu.scss"],
    template: `
          <ul>
            <li menuhover>
                <p menuhover>
                    <i class="fa fa-folder-open" id="0" menuroot></i> 根目录
                    <span>
                       <i class="fa fa-plus mouse" title="添加" (click)="addMenu(0)"></i>
                       <i class="fa fa-edit mouse" title="修改" (click)="addMenu(0)"></i>
                       <i class="fa fa-minus mouse" title="删除" (click)="addMenu(0)"></i>
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


    constructor(private router:Router) {
       // this.FirstMenulist = Menu.MenuList().filter(m => m.pid == "0");
    }

    ngOnInit() { }

    addMenu(id:string){
        this.router.navigate(['/admin/addMenu']);
    }
}