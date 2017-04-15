import { Injectable,Inject } from '@angular/core';
import { NavMenu } from './layouts';
@Injectable()
export class LayoutsService {

    Parse: ParserServer;

    tableName: string = "Menu"

    constructor(@Inject("parse") parse: ParserServer) {
        this.Parse = parse;
    }

     public findAllMenu():Promise<Array<NavMenu>> {
        let table = this.Parse.Parse.Object.extend(this.tableName);
        let query = new this.Parse.Parse.Query(table);
        let promise=this.Parse.findWhere<NavMenu>(query);
        return promise;
    }
}