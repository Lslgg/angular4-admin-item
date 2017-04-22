import { Component, OnInit, Input,Inject } from '@angular/core';

@Component({
    selector: 'template-panel-table',
    templateUrl: 'panel.table.html'
})

export class PanelTableComponent implements OnInit {

    urlTitle:string;

    constructor(@Inject("global") global:Global) { 
        this.urlTitle=global.urlTitle;
    }

    ngOnInit() {

    }
}