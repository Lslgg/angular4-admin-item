import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
    selector: 'common-crumbs',
    template: `
        <a routerLink="../index"> 首页 </a>
        <span *ngFor="let item of crumbs let i=index">
            > <a routerLink="{{item[1]}}" >{{item[0]}}</a>
        </span>
    `
})

export class CrumbsComponent implements OnInit {
    @Input() crumbs: Array<[string, string]>;

    ngOnInit(){
       
    }
    
}