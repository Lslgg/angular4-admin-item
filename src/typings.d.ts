// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare var Parse: any;

interface ParserServer {

    Parse: any;

    add(table: any): Promise<boolean>;

    /*
    * 批量添加与修改
    */
    addAll(list: any): Promise<boolean>;

    delete(id: string, tableName: string): Promise<boolean>;

    getInfo<T>(id: string, tablename: string): Promise<T>;

    getInfo2<T>(id: string, tablename: string, tClass: { new (): T }): Promise<T>;

    findPage<T>(pageIndex: number, pageSize: number, tableName: string): Promise<Array<T>>;

    findPage2<T>(pageIndex: number, pageSize: number, tableName: string, tClass: { new (): T }): Promise<Array<T>>;

    findCount(tableName: string): Promise<number>;

    findWhere<T>(query: any): Promise<Array<T>>;

    findWhere2<T>(query: any, tClass: { new (): T }): Promise<Array<T>>;

     /** 
     * 当前登录ID
     */
    getCurrentUserId():string;

    setQuery(tableName:string):any;

    setParseObj(tableName:string):any;
}


