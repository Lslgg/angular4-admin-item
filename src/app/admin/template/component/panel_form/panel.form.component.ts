import { Component, OnInit, Input,Inject } from '@angular/core';

@Component({
    selector: 'template-panel-form',
    templateUrl: 'panel.form.html'
})
export class PanelFormComponent implements OnInit {

    urlTitle:string;

    constructor(@Inject("global") global:Global) { 
        this.urlTitle=global.urlTitle;
    }

    ngOnInit() {

    }
}