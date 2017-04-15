import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../shared/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../shared/menu.service';

@Component({
    selector: 'menuContent',
    styleUrls: ["menu.scss"],
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
                    <i class="fa fa-plus mouse" title="添加" (click)="addMenu(item.id,1)"></i>
                    <i class="fa fa-edit mouse" title="修改" (click)="addMenu(item.id,2)"></i>
                    <i class="fa fa-minus mouse" title="删除" (click)="deleteMenu(item.id,item.pid);"></i>
                </span>
            </p>
            <ul *ngIf="IsSubMenu" class="menu_{{item.id}}">
          		 <ng-container  *ngFor="let menu of Menulist">
                    <menuContent [item]="menu" (onDelete)="onDeleteInfo($event)"></menuContent>
                </ng-container>
          	</ul>
        </li>
   
    `,
})
export class NodeComponent implements OnInit {

    @Input() item: any;

    @Output() onDelete = new EventEmitter<string>();

    Menulist: Array<Menu>;

    IsSubMenu: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {

    }

    ngOnInit() {

    }

    getSubMenu(id: string) {
        this.menuService.findbyPid(id).then(list => {
            this.Menulist = list;
            this.IsSubMenu = this.Menulist.length != 0;
        });
    }

    addMenu(id: string, type: number) {
        this.router.navigate(['/admin/addMenu/' + id + "/" + type]);
    }

    deleteMenu(id: string, pid: string) {
        if (confirm("确认要删除！")) {
            this.menuService.findbyPid(id).then(list => {
                if (list.length > 0) {
                    alert("有子菜单不能删除，请先删除子菜单！");
                } else {
                    this.menuService.delete(id).then(val => {
                        this.router.navigateByUrl("/admin/menu", { skipLocationChange: true });
                        alert("删除" + val ? "成功！" : "失败！");
                        this.onDelete.emit(pid);
                    });
                }
            })

        }
    }

    //删除重新加载新新数据
    onDeleteInfo(id: string) {
        this.getSubMenu(id);
    }
}

