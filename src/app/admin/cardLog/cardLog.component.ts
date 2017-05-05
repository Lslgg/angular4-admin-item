import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'

import { User,CardLog } from '../common/';
import { CardLogService } from './shared/cardLog.service';


@Component({
    selector: 'admin-cardLog',
    templateUrl: 'cardLog.html',
    providers: [CardLogService]
})

export class CardLogComponent implements OnInit {

    tableInfo: Table;

    listDataArrray: Array<CardLog> = null;

    Addurl: string = '#';

    pageSize: number = 10;

    pageCount: Promise<number>;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(private router: Router,
        private cardLogService: CardLogService) {

        let rowtitle: Array<[string, string]> = [
            ["#", "index"],
            ["用户名", "userName"],
            ["类型", "type"],
            ["目标用户", "targetName"],
            ["房卡", "card"],
            ["时间", "createAtFormt"]
        ];

        let operation: Array<OperationType> = [];

        let tableRow = new Row(rowtitle, operation);
        this.tableInfo = new Table(tableRow);

        this.pageCount = this.cardLogService.getCount();

        this.cardLogService.getList(1, this.pageSize).then((cardLogs) => {
            this.listDataArrray = cardLogs;
            this.listDataArrray.forEach(val=>{
                val.createAtFormt=val.createdAt.toLocaleString();
            })
        }).catch(error=>{
            console.log(error);
        });
    }

    ngOnInit() {

    }

    ongetPageList(index) {
        let userList = this.cardLogService.getList(index, this.pageSize)
            .then((users) => { this.listDataArrray = users; });
    }

    ondelUser(id: string) {
       
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