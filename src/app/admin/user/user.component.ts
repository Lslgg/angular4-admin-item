import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'
import { UserService } from './shared/user.service';
import { RoleService } from '../role/shared/role.service';
import { User } from '../common/module/';


@Component({
    selector: 'admin-user',
    templateUrl: 'user.html',
    providers: [UserService, RoleService],
})

export class UserComponent implements OnInit {

    tableInfo: Table;

    listDataArrray: Array<User> = null;

    Addurl: string = '../addUser';

    pageSize: number = 10;

    pageCount: Promise<number>;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(private router: Router,
        private userService: UserService,
        private roleService: RoleService) {

        let rowtitle: Array<[string, string]> = [
            ["#", "index"],
            ["checkbox", "checkbox"],
            ["用户名", "username"],
            ["角色", "roleId"],
            ["操作", "operation"]
        ];

        let operation: Array<OperationType> = [
            OperationType.DELETE,
            OperationType.UPDATE
        ];

        let tableRow = new Row(rowtitle, operation);
        this.tableInfo = new Table(tableRow);

        this.pageCount = this.userService.getUserCount();

        this.userService.getUserList(1, this.pageSize).then((users) => {
            this.listDataArrray = users;
        });
    }

    ngOnInit() {

    }

    ongetPageList(index) {
        let userList = this.userService.getUserList(index, this.pageSize)
            .then((users) => { this.listDataArrray = users; });
    }

    ondelUser(id: string) {
        if (confirm("确认要删除")) {
            this.userService.delUser(id).then((result) => {
                if (result == true) {
                    alert("删除成功！");
                    this.listDataArrray = this.listDataArrray.filter(function (value, index) {
                        return value.id != id;
                    });
                }
            });
        }
    }

    onUpInfoUser(id: string) {
        this.router.navigate(['../admin/addUser', id]);
    }

    //全选
    onAllchecked(checkbox: boolean) {

    }

    //查找
    onSearch() {
        console.log("onSearch");
    }

    //选择删除
    onDelete() {
        console.log('onDelete');
    }
}