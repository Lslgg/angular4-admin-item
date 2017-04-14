export class Parse {
    public Parse: any;
    constructor() {
        let parse = require("parse");
        parse.initialize("myAppId");
        parse.serverURL = 'http://211.149.219.127:1337/parse';
        this.Parse = parse;
    }

    add(table: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            table.save(null, {
                success: function (menu) {
                    resolve(true);
                },
                error: function (menu, error) {
                    reject(false);
                }
            });
        });

        return promise;
    }

    update(info: any): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            info.save({
                success: (success) => { resolve(true); },
                error: (error) => { reject(false); }
            });
        });

        return promise;
    }

    delete(id: string): Promise<any> {
        return null;
    }

    find(id: string, tableName): Promise<any> {
        var table = this.Parse.Object.extend(tableName);
        var query = new this.Parse.Query(table);
        query.equalTo('objectId', id);
        let promise = new Promise<any>((resolve, reject) => {
            query.get(id, {
                success: (info) => {
                    resolve(info)
                },
                error: (error) => {
                    reject("error");
                }
            });
        });

        return promise;
    }

    findPage(pageIndex: number, pageSize: number): Promise<any> {
        return null;
    }

    findCount(): Promise<number> {
        return null;
    }
}