import { Injectable, Inject } from '@angular/core';
import { Menu } from './menu';
import { Parse } from '../../../common/parse';

@Injectable()
export class MenuService {

    Parse: ParserServer;

    tableName: string = "Menu"

    constructor(@Inject("parse") parse: ParserServer) {
        this.Parse = parse;
        
    }

    public add(menu: Menu): Promise<boolean> {
        var DbMenu = this.Parse.Parse.Object.extend(this.tableName);
        let dbMenu = new DbMenu();
        var menuInfo = this.setInfo(menu, dbMenu);
        let promise = this.Parse.add(menuInfo);
        return promise;
    }

    public delete(id:string):Promise<boolean>{
        let promise=this.Parse.delete(id,this.tableName);
        return promise;
    }

    public getInfo(id: string): Promise<Menu> {
        let promise = this.Parse.getInfo<Menu>(id, "Menu");
        return promise;
    }

    public findbyPid(pid: string):Promise<Array<Menu>> {
        let table = this.Parse.Parse.Object.extend(this.tableName);
        let query = new this.Parse.Parse.Query(table);
        query.equalTo("pid",pid);
        let promise=this.Parse.findWhere<Menu>(query);
        return promise;
    }

    private setInfo(menu: Menu, dbInfo: any) {
        dbInfo.set("id", menu.id);
        dbInfo.set("title", menu.title);
        dbInfo.set("code", menu.code);
        dbInfo.set("url", menu.url);
        dbInfo.set("pid", menu.pid);
        dbInfo.set("isLeaf",menu.isLeaf);
        dbInfo.set("isValid", menu.isValid);
        return dbInfo;
    }


}