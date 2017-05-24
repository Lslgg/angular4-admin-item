export class Table {
    public RowInfo: Row;
    public DataList:Array<Object>;
    constructor(rowInfo: Row) {
        this.RowInfo=rowInfo;
    }
}

export class Row{
    public Title:Array<[string,string]>;
    public Operation:Array<OperationType>;
    constructor(title:Array<[string,string]>,operation:Array<OperationType>){
        this.Title=title;
        this.Operation=operation;
    }
}

export enum OperationType{
    ADD,
    UPDATE,
    DELETE,
    SHOW,
    DISABLED,
    RECHARGE,
}