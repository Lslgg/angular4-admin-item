import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'
import { UserService } from '../user/shared/user.service';
import { RoleService } from '../role/shared/role.service';

import { User,Player } from '../common/module/';

import { PlayerService } from './shared/player.service';


@Component({
    selector: 'admin-player',
    templateUrl: 'player.html',
    providers: [UserService, RoleService,PlayerService],
})

export class PlayerComponent implements OnInit {

    tableInfo: Table;

    listDataArrray: Array<Player> = null;

    Addurl: string = '../addPlayer';

    pageSize: number = 15;

    pageCount: Promise<number>;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(private router: Router,
        private userService: UserService,
        private roleService: RoleService,
        private playerService:PlayerService) {

        let rowtitle: Array<[string, string]> = [
            ["#", "index"],
            ["id","id"],
            ["用户名", "name"],
            ["房卡", "cardNum"],
            ["操作", "operation"]
        ];

        let operation: Array<OperationType> = [
            OperationType.UPDATE
        ];

        let tableRow = new Row(rowtitle, operation);
        this.tableInfo = new Table(tableRow);

        this.pageCount = this.playerService.getCount();
      
        this.playerService.getList(1, this.pageSize).then((list) => {
            this.listDataArrray = list;
        });
    }

    ngOnInit() {

    }

    ongetPageList(index) {
        let userList = this.playerService.getList(index, this.pageSize)
            .then((list) => { this.listDataArrray = list; });
    }

    onUpInfoUser(id: string) {
        this.router.navigate(['../admin/addPlayer', id]);
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