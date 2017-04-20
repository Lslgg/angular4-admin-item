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
        var powerList = [];
        for (var i = 0; i < powers.length; i++) {
            var obj = powers[i];
            powerList.push(this.setInfo(obj));
        }

        var promise = this.Parse.addAll(powerList);
        return promise;
    }

    getMenuList() {
        let table = this.Parse.Parse.Object.extend("Menu");
        let query = new this.Parse.Parse.Query(table);
        query.equalTo("isLeaf", true);
        let promise = this.Parse.findWhere2<NavMenu>(query, NavMenu);
        return promise;
    }

    getPowerList() {
        let table = this.Parse.Parse.Object.extend(this.tableName);
        let query = new this.Parse.Parse.Query(table);
        let promise = this.Parse.findWhere<Power>(query);
        return promise;
    }

    private setInfo(power: Power) {
        var DBInfo = this.Parse.Parse.Object.extend(this.tableName);
        var dbInfo = new DBInfo();
        //如果id为一样的话，不管有多少条数据都会一样
        if (power.id != "")  dbInfo.set("id", power.id);
        dbInfo.set("title", power.title);
        dbInfo.set("code", power.code);
        dbInfo.set("url", power.url);
        dbInfo.set("type", power.type);
        dbInfo.set("explain", power.explain);
        dbInfo.set("isValid", power.isValid);
        dbInfo.set("menuId", power.menuId);
        dbInfo.set("operation", power.operation);
        return dbInfo;
    }
}