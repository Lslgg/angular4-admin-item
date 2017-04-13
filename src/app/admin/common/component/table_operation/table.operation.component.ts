import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'common-tableOperation',
    styleUrls:['table.css'],
    templateUrl:'table.html'

})

export class TableOperationComponent implements OnInit {

    @Output() onSearch=new EventEmitter();

    @Output() onDelete=new EventEmitter();

    @Output() onAddInfo=new EventEmitter();

    @Output() onUpdate=new EventEmitter();

    @Input() isAddHidden="";

    @Input() isDelHidden="";

    @Input() addurl="";
    
    constructor() { }

    ngOnInit() { 
        
    }

	search(){
		this.onSearch.emit();
	}

    delete(){
        this.onDelete.emit();
    }

    addInfo(){
        this.onAddInfo.emit();
    }

    upInfo(){
        this.onUpdate.emit();
    }
}