import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'common-tableOperation',
    styles:[`.hidden {
          display:none !important;
        }`
    ],
    templateUrl:'table.html'

})

export class TableOperationComponent implements OnInit {

    @Input() addurl:string;

    @Output() onSearch=new EventEmitter();

    @Output() onDelete=new EventEmitter();

    @Input() isAddHidden="";

    @Input() isDelHidden="";
    
    constructor() { }

    ngOnInit() { 
        
    }

	search(){
		this.onSearch.emit();
	}

    delete(){
        this.onDelete.emit();
    }
}