import { Component, OnInit, Input,Inject } from '@angular/core';

@Component({
    selector: 'template-panel-form',
    templateUrl: 'panel.form.html'
})
export class PanelFormComponent implements OnInit {
    Global:any;
    constructor(@Inject("global") global

    ) { 
        this.Global=global;
    }

    ngOnInit() {

    }
}