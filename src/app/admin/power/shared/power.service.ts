import { Injectable, Inject } from '@angular/core';
import { NavMenu, Power } from './power';

@Injectable()
export class PowerService {

    Parse: ParserServer;

    tableName: string = "power"

    constructor( @Inject("parse") parse: ParserServer) {
        this.Parse = parse;
    }

    //查找权限表
    getInfo(roleId: string): Promise<any> {
        return null;
    }

    //修改或保存权限表
    saveInfo(powers: Array<Power>): Promise<boolean> {
        var DBInfo = new this.Parse.Parse.Object.extend(this.tableName);
        var list = [];
        powers.forEach(info => {
            var dbInfo = this.setInfo(info, DBInfo);
            list.push(dbInfo);
        })
        let promise = this.Parse.addAll(list);
        return promise;
    }

    getMenuList() {
        let table = this.Parse.Parse.Object.extend("Menu");
        let query = new this.Parse.Parse.Query(table);
        query.equalTo("isLeaf", true);
        let promise = this.Parse.findWhere2<NavMenu>(query,NavMenu);
        return promise;
    }

    private setInfo(power: Power, dbInfo: any) {
        dbInfo.set("id", power.id);
        dbInfo.set("title", power.title);
        dbInfo.set("code", power.code);
        dbInfo.set("url", power.url);
        dbInfo.set("type", power.type);
        dbInfo.set("explain", power.explain);
        dbInfo.set("isValid", power.isValid);
        return dbInfo;
    }
}