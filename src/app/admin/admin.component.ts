import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.html'
})

export class AdminComponent implements OnInit {
    Global:any;
    constructor(
        @Inject("global") global,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) { 
        this.Global=global;
    }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.titleService.setTitle(event['title']);
                this.Global.title=event['title'];
            });
    }
}