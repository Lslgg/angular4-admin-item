import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';
import { Router } from '@angular/router';
import { MenuService } from '../shared/menu.service';

@Component({
    selector: 'admin-tree',
    styleUrls:["menu.scss"],
    template: `
          <ul>
            <li menuhover>
                <p menuhover>
                    <i class="fa fa-folder-open" id="0" menuroot></i> 根目录
                    <span>
                       <i class="fa fa-plus mouse" title="添加" (click)="addMenu('0')"></i>
                    </span>
                </p>
            </li>
            <ng-container  *ngFor="let menu of FirstMenulist">
                <menuContent [item]="menu" class="menu_0" (onDelete)="onDelete($event)"></menuContent>
            </ng-container>
        </ul>
    `
})
export class TreeComponent implements OnInit {

    FirstMenulist: Array<Menu>;


    constructor(private router:Router,private menuServer: MenuService) {
        this.menuServer.findbyPid("0").then(val=>this.FirstMenulist=val);
    }

    ngOnInit() { }

    addMenu(id:string){
        this.router.navigate(['/admin/addMenu/'+id+"/1"]);
    }
    
    //删除重新加载新数据
    onDelete(id:string){
        this.menuServer.findbyPid("0").then(val=>{
            this.FirstMenulist=val;
        });
    }
}