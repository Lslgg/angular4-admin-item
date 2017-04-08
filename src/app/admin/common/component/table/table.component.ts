import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Table, Row, OperationType } from './index'

@Component({
	selector: 'common-table',
	templateUrl: 'table.html'
})

export class TableComponent implements OnInit {

	@Input() tableInfo: Table;

	@Input() listData: Array<Object>;

	@Input() pageSize:number=10;

	@Input() key:string="id";

	@Input() pageCount:Promise<number>;

	public listTitle: Array<string>;

	public listField: Array<string>;

	public listOperation: Array<OperationType>;

    @Output() ongetPageList = new EventEmitter<number>();

    @Output() onDelInfo = new EventEmitter<string>();

    @Output() onUpInfo = new EventEmitter<string>();

    @Output() onAllchecked = new EventEmitter<boolean>();

	checkstr:boolean=false;

	constructor() {
		
	}

	ngOnInit() {
		
		let self = this;
		let showTitleList = [];
		let showColList = [];
		let showOperation = [];

		if(this.tableInfo==undefined) return;

		this.tableInfo.RowInfo.Title.map(function (value) {
			showTitleList.push(value[0]);
			showColList.push(value[1]);
		});

		this.listTitle = showTitleList;
		this.listField = showColList;

		this.tableInfo.RowInfo.Operation.map(function (value) {
			if (value == OperationType.ADD) {
				showOperation.push("添加");
			} else if (value == OperationType.DELETE) {
				showOperation.push("删除");
			} else if (value == OperationType.UPDATE) {
				showOperation.push("修改");
			} else if (value == OperationType.SHOW) {
				showOperation.push("显示");
			}
		});

		this.listOperation = showOperation;
	}

	ongetPage(index){
		this.ongetPageList.emit(index);
	}

	delInfo(id:string){
		this.onDelInfo.emit(id);
	}

	upInfo(id:string){
		this.onUpInfo.emit(id);
	}

	allchecked(checked:boolean){
		this.checkstr=checked;
		this.onAllchecked.emit(checked);
	}

	onCheckbox(id:string){
		console.log(id);
	}
}