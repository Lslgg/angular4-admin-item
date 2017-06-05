export class Parse implements ParserServer {

    public Parse: any;

    constructor() {
        let parse = require("parse");
        parse.initialize("webSite");
        parse.serverURL = 'http://211.149.220.134:1337/parse';
        this.Parse = parse;
    }

    /*
    * 添加与修改
    */
    public add(table: any): Promise<boolean> {
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

    /*
    * 批量添加与修改
    */
    public addAll(list: any): Promise<boolean> {
        let promise = new Promise((resolve, reject) => {
            this.Parse.Object.saveAll(list, {
                success: function (list) {
                    resolve(true);
                },
                error: function (error) {
                    reject(false);
                },
            })
        });
        return promise;
    }

    /*
    * 根据ID删除
    */
    public delete(id: string, tableName: string): Promise<boolean> {
        let promise = new Promise((resolve, reject) => {
            var table = this.Parse.Object.extend(tableName);
            var query = new this.Parse.Query(table);
            query.get(id, {
                success: (myObject) => {
                    myObject.destroy({
                        success: function (myObject) {
                            resolve(true);
                        },
                        error: function (myObject, error) {
                            reject(error);
                        }
                    });
                }
            })
        });
        return promise;
    }

    /*
    * 根据ID查找
    */
    public getInfo<T>(id: string, tableName: string | {}, tClass?: { new (): T }): Promise<T> {
        var query: any;
        if (typeof tableName == "string") {
            let table = this.Parse.Object.extend(tableName);
            query = new this.Parse.Query(table);
        } else {
            query = new this.Parse.Query(tableName);
        }
        let promise = new Promise<any>((resolve, reject) => {
            query.get(id, {
                success: (val) => {
                    let info: T = {} as T;
                    if (tClass != undefined) {
                        info = new tClass();
                    }
                    Object.assign(info, val['attributes']);
                    info["id"] = val["id"];
                    resolve(info);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });

        return promise;
    }

    /*
    * 分页查找
    */
    public findPage<T>(pageIndex: number, pageSize: number,
        tableName: string | {}, tClass?: { new (): T }): Promise<T> {
            
        var query: any;
        if (typeof tableName == "string") {
            let table = this.Parse.Object.extend(tableName);
            query = new this.Parse.Query(table);
        } else {
            query = new this.Parse.Query(tableName);
        }
        query.descending('updatedAt');
        query.skip((pageIndex - 1) * pageSize);
        query.limit(pageSize);
        let promise = new Promise<any>((resolve, reject) => {
            query.find({
                success: (result: Array<any>) => {
                    let list: Array<T> = new Array<T>();
                    for (let i = 0; i < result.length; i++) {
                        let info: T = {} as T;
                        if (tClass != undefined) {
                            info = new tClass();
                        }
                        Object.assign(info, result[i]["attributes"]);
                        info["id"] = result[i]['id'];
                        list[i] = info;
                    }

                    resolve(list);
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });

        return promise;
    }

    /*
    * 查找所有总数
    */
    public findCount(tableName: string | {}): Promise<number> {
        var query: any;
        if (typeof tableName == "string") {
            let table = this.Parse.Object.extend(tableName);
            query = new this.Parse.Query(table);
        } else {
            query = new this.Parse.Query(tableName);
        }
        let promise = new Promise<number>((resolve, reject) => {
            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });

        return promise;
    }

    /*
    * 条件查找
    */
    public findWhere<T>(query: any, tClass?: { new (): T }): Promise<Array<T>> {
        let promise = new Promise<Array<T>>((resolve, reject) => {
            query.find({
                success: (result: Array<T>) => {
                    let list: Array<T> = new Array<T>();
                    for (let i = 0; i < result.length; i++) {
                        var info: T = {} as T;
                        if (tClass != undefined) {
                            info = new tClass();
                        }
                        Object.assign(info, result[i]["attributes"]);
                        info["id"] = result[i]['id'];
                        list[i] = info;
                    }

                    resolve(list);
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });

        return promise;
    }

    /** 
     * 当前登录ID
     */
    public getCurrentUserId(): string {
        var currentUser = this.Parse.User.current();
        return currentUser["id"];
    }


    public setQuery(tableName: string): any {
        var table = this.Parse.Object.extend(tableName);
        var query = new this.Parse.Query(table);
        return query;
    }


    public setParseObj(tableName: string): any {
        var DBInfo = this.Parse.Object.extend(tableName);
        var dbInfo = new DBInfo();
        return dbInfo;
    }
}