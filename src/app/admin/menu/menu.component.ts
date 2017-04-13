import { Component, OnInit } from '@angular/core';
import { Menu } from './shared/menu';

@Component({
    selector: 'admin-menu',
    templateUrl: 'menu.html'
})

export class MenuComponent implements OnInit {

    FirstMenulist:Array<Menu>;

    heroes = Menu.MenuList().filter(m=>m.pid=="0");//['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

    constructor() {
        this.FirstMenulist=Menu.MenuList().filter(m=>m.pid=="0");
    }

    ngOnInit() { }
}