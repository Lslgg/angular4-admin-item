export class Power{
    public id:string;
    public code:string;
    public url:string;
    public title:string;
    public explain:string;
    public type:string;
    public isValid:boolean;
}

export class NavMenu{
    public id:string;
    public code:string;
    public url:string;
    public isValid:boolean=true;
    public isLeaf:boolean=false;
    public title:string;
    public isChecked:boolean=false;
}

