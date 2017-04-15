import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Menu } from './shared/menu';
import { MenuService } from './shared/menu.service';

@Component({
    selector: 'admin-add-menu',
    templateUrl: 'addMenu.html'
})

export class AddMenuComponent implements OnInit {

    submitValue: string = "添加";

    menu: Menu = new Menu();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private menuService: MenuService) {
        let id = this.route.snapshot.params['id'];
        let type = this.route.snapshot.params['type'];
        this.submitValue = "修改";
        if (id == "0") {
            this.submitValue = "添加";
            this.menu.parentTitle = "根目录";
            this.menu.pid = "0";
            this.menu.isValid = true;
        } else {
            this.menuService.getInfo(id).then(val => {
                this.menu = val
                if (type == 1) {
                    this.submitValue = "添加";
                    this.menu.parentTitle = this.menu.title;
                    this.menu.pid = this.menu.id;
                    this.menu.isValid = true;
                    this.menu.id = "";
                    this.menu.code = "";
                    this.menu.title = "";
                    this.menu.url = "";
                } else {
                    if (val.pid != "0") {
                        this.menuService.getInfo(val.pid).then(val => {
                            this.menu.parentTitle = val.title;
                        })
                    }else{
                        this.menu.parentTitle="根目录";
                    }

                }
            });
        }
    }

    ngOnInit() { }

    onSubmit() {
        //添加修改
        this.menuService.add(this.menu).then(val => {
            if(val){
                alert("操作成功！");
                //this.router.navigate(['admin/menu']);
            }
        })
    }

    onBack() {
        this.router.navigate(['admin/menu']);
    }
}