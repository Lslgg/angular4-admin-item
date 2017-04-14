import { Injectable, Inject } from '@angular/core';
import { Menu } from './menu';
import { Parse } from '../../../common/parse';

@Injectable()
export class MenuService {

    Parse: any;

    ParserService: any;

    constructor( @Inject("parse") parse: Parse) {
        this.Parse = parse.Parse;
        this.ParserService = parse;
    }

    add(menu: Menu): Promise<string> {
        var DbMenu = this.Parse.Object.extend("Menu");
        let dbMenu = new DbMenu();
        var menuInfo = this.setInfo(menu, dbMenu);
        let promise = this.ParserService.add(menuInfo);
        return promise;
    }

    update(menu: Menu): Promise<boolean> {
        let dbMenu = this.ParserService.find(menu.id);
        let promise = new Promise((re, rj) => {
            dbMenu.then(info => {
                this.setInfo(menu, info);
                this.ParserService.update(info).then(v => re(v)).catch(error => rj(false))
            });
        });

        return promise;
    }

    find(id:string):Promise<Menu>{
        let promise=this.ParserService.find(id,"Menu");
        return promise;
    }

    private setInfo(menu: Menu, dbInfo: any) {
        console.log(menu);
        dbInfo.set("id", menu.id);
        dbInfo.set("title", menu.title);
        dbInfo.set("code", menu.code);
        dbInfo.set("url", menu.url);
        dbInfo.set("pid", menu.pid);
        dbInfo.set("isValid",menu.isValid);
        return dbInfo;
    }
}