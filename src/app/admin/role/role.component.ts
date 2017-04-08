import { Component, OnInit, Input } from '@angular/core';
import { Router }   from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'
import { RoleService } from './shared/role.service';
import { Role } from '../common/module/';

@Component({
    selector: 'admin-role',
    templateUrl: 'role.html',
    providers: [RoleService]
})

export class RoleComponent implements OnInit {

    tableInfo: Table;

    listDataArrray: Array<Role> = null;

    Addurl: string = '../addRole';

    pageSize: number = 10;

    pageCount: Promise<number>;

    constructor(private router:Router,
        private roleService: RoleService) {

        let rowtitle: Array<[string, string]> = [
            ["#", "index"],
            ["checkbox", "checkbox"],
            ["角色名", "roleName"],
            ["标识", "name"],
            ["操作", "operation"]
        ];
        
        let operation: Array<OperationType> = [
            OperationType.DELETE,
            OperationType.UPDATE
        ];

        let tableRow = new Row(rowtitle, operation);
        this.tableInfo = new Table(tableRow);

        this.pageCount = this.roleService.getCount();

        this.roleService.getList(1, this.pageSize).then((roles) => {
            this.listDataArrray = roles;
        });
    }

    ngOnInit() {

    }

    ongetPageList(index) {
       this.roleService.getList(index, this.pageSize)
                .then((roles) => { this.listDataArrray = roles; });
    }

    ondelInfo(id: string) {
        if (confirm("确认要删除")) {
            this.roleService.delInfo(id).then((result) => {
                if (result == true) {
                    alert("删除成功！");
                    this.listDataArrray = this.listDataArrray.filter(function (value, index) {
                        return value.id != id;
                    });
                }
            });
        }
    }

    onUpInfo(id: string) {
         this.router.navigate(['../admin/addRole',id]);
    }

    //全选
    onAllchecked(checkbox:boolean){
        
    }

    //查找
    onSearch(){
        console.log("onSearch");
    }

    //选择删除
    onDelete(){
        console.log('onDelete');
    }
}