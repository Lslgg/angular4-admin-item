import { Component, OnInit, Input,Inject } from '@angular/core';

@Component({
    selector: 'template-panel-table',
    templateUrl: 'panel.table.html'
})

export class PanelTableComponent implements OnInit {
    Global:any;
    constructor(@Inject("global") global

    ) { 
        this.Global=global;
    }

    ngOnInit() {

    }
}