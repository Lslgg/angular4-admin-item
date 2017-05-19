import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'
import { UserService } from '../user/shared/user.service';
import { RoleService } from '../role/shared/role.service';

import { User } from '../common/module/';

@Component({
    selector: 'admin-card',
    templateUrl: 'card.html',
    providers: [UserService, RoleService],
})

export class CardComponent implements OnInit {

    tableInfo: Table;

    listDataArrray: Array<User> = null;

    Addurl: string = '../addCard';

    pageSize: number = 10;

    pageCount: Promise<number>;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(private router: Router,
        private userService: UserService,
        private roleService: RoleService) {

        let rowtitle: Array<[string, string]> = [
            ["#", "index"],
            ["用户名", "username"],
            ["房卡数量", "card"],
            ["操作", "operation"]
        ];

        let operation: Array<OperationType> = [
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

    onUpInfoUser(id: string) {
        this.router.navigate(['../admin/addCard', id]);
    }

    //全选
    onAllchecked(checkbox: boolean) {

    }

    //查找
    search() {
        console.log("onSearch");
    }
}