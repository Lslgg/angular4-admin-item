// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var Parse: any;

interface ParserServer {
    Parse: any;
    add(table: any): Promise<boolean>;
    delete(id: string, tableName: string): Promise<boolean>;
    getInfo<T>(id: string, tablename: string): Promise<T>;
    findPage<T>(pageIndex: number, pageSize: number, tableName: string): Promise<Array<T>>;
    findCount(tableName: string): Promise<number>;
    findWhere<T>(query: any): Promise<Array<T>>;
}