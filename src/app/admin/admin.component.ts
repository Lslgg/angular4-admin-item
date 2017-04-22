import { Component, OnInit, Inject } from '@angular/core';
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
    global: Global;
    constructor(
        @Inject("global") global: Global,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {
        this.global = global;
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
                this.global.urlTitle = event['title'];
            });
    }
}