import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Menu } from './shared/menu';
import { MenuService } from './shared/menu.service';

@Component({
    selector: 'admin-add-menu',
    templateUrl: 'addMenu.html',
    providers: [MenuService]
})

export class AddMenuComponent implements OnInit {

    submitValue: string = "添加";

    menu: Menu=new Menu();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private menuService: MenuService) {
        let id = this.route.snapshot.params['id'];
        if (id == undefined) {
            this.menu.isValid=true;
            this.menu.pid="0";
        } else {
            this.submitValue = "修改";
            this.menuService.find(id).then(val=>{
                console.log(val);
                Object.assign(this.menu, val['attributes']);
                this.menu.id=val["id"];
            });
        }
    }

    ngOnInit() { }

    onSubmit() {
        this.menuService.add(this.menu);
    }
}