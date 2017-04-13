import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'menuContent',
    styleUrls:["menu.scss"],
    template: `
        <li class="ul_li">
            <p class="li_p" menuhover>
                <ng-container *ngIf="!item.isLeaf">
                    <i class="fa fa-folder" id="{{item.id}}" (click)="getSubMenu(item.id)" menuroot></i> {{item.title}}
                </ng-container>
                <ng-container *ngIf="item.isLeaf">
                    <i class="fa fa-file" id="{{item.id}}"></i> {{item.title}}
                </ng-container>
                <span>
                    <i class="fa fa-plus mouse" title="添加" (click)="addMenu(item.id)"></i>
                    <i class="fa fa-edit mouse" title="修改" (click)="addMenu(item.id)"></i>
                    <i class="fa fa-minus mouse" title="删除" (click)="addMenu(item.id)"></i>
                </span>
            </p>
            <ul *ngIf="IsSubMenu" class="menu_{{item.id}}">
          		 <ng-container  *ngFor="let menu of Menulist">
                    <menuContent [item]="menu"></menuContent>
                </ng-container>
          	</ul>
        </li>
   
    `,
})
export class NodeComponent implements OnInit {

    @Input() item: any;

    Menulist: Array<Menu>;

    IsSubMenu: boolean = false;

    constructor(private router:Router) {

    }

    ngOnInit() {

    }

    getSubMenu(id: string) {
        this.Menulist = Menu.MenuList().filter(m => m.pid == id);
        this.IsSubMenu=this.Menulist.length!=0;
    }

    addMenu(id:string){
        this.router.navigate(['/admin/addMenu']);
    }
}

