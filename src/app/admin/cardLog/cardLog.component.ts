import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Table, Row, OperationType } from '../common/component/table/index'

import { User, CardLog } from '../common/';
import { CardLogService } from './shared/cardLog.service';
import { CardLogSearch } from './shared/cardLogSearch';

@Component({
    selector: 'admin-cardLog',
    styles: [`
        .form-control-label{
            margin-bottom:0px; 
            padding-right:12px; 
            line-height:32px
        }
        .form-control{
            flex-direction:row; 
        }
        `
    ],
    templateUrl: 'cardLog.html',
    providers: [CardLogService]
})

export class CardLogComponent implements OnInit {

    tableInfo: Table;

    cardLogSearch: CardLogSearch = new CardLogSearch();

    listDataArrray: Array<CardLog> = null;

    Addurl: string = '#';

    pageSize: number = 10;

    pageCount: Promise<number>;

    constructor(private router: Router,
        private cardLogService: CardLogService) {

        this.getList();
    }

    getList() {
        let rowtitle: Array<[string, string]> = [
            ["用户名", "userName"],
            ["类型", "type"],
            ["目标用户", "targetName"],
            ["房卡", "card"],
            ["时间", "createAtFormt"]
        ];

        let operation: Array<OperationType> = [];

        let tableRow = new Row(rowtitle, operation);
        this.tableInfo = new Table(tableRow);

        this.pageCount = this.cardLogService.getCount(this.cardLogSearch);

        this.cardLogService.getList(1, this.pageSize, this.cardLogSearch).then((cardLogs) => {
            this.listDataArrray = cardLogs;
            this.listDataArrray.forEach(val => {
                val.createAtFormt = val.createdAt.toLocaleString();
            })
        }).catch(error => {
            console.log(error);
        });
    }

    ngOnInit() {

    }

    ongetPageList(index) {
        let userList = this.cardLogService.getList(index, this.pageSize, this.cardLogSearch)
            .then((carsLog) => {
                this.listDataArrray = carsLog;
                this.listDataArrray.forEach(val => {
                    val.createAtFormt = val.createdAt.toLocaleString();
                })
            });
    }

    search() {
        this.pageCount = this.cardLogService.getCount(this.cardLogSearch);

        this.cardLogService.getList(1, this.pageSize, this.cardLogSearch).then((cardLogs) => {
            this.listDataArrray = cardLogs;
            this.listDataArrray.forEach(val => {
                val.createAtFormt = val.createdAt.toLocaleString();
            })
        }).catch(error => {
            console.log(error);
        });
    }
}