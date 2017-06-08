export class User{
    public id:string;
    public username:string;
    public passWord:string;
    public oldpassWord:string;
    public confirmpassword:string;
    public roleId:string;
    public roleName:string="角色名称";
    public card:Number;
    public addCard:Number;
    public email:string;
    public phone:string;
    public address:string;
    public lastLoginTime:Date;
    public lastLoginIp:string;
    public updateAt:Date;
    public createdAt:Date;
    public isDel:boolean;
    public isValid:boolean;
}

export class CardLog{
    public id:string;
    public userId:string;
    public userName:string;
    public targetId:string;
    public targetName:string;
    public card:Number;
    public type:string;
    public desc:string;
    public updateAt:Date;
    public createdAt:Date;
    public createAtFormt:string;
    public userType:number;
}

export class Role{
    public id:string;
    public roleName:string;
    public name:string;
    public desc:string;
    public isValid:boolean;
}

export class Role_Module{
    public id:string;
    public roleId:string;
    public menuList:string;  
}

export class Player{
    public id:string;
    public name:string;
    public cardNum:number;
    public addCardNum:number;
}

export class SystemLog{
    public id:string;
    public type:string;
    public userId:string;
    public userName:string;
    public operationType:string;
    public ipAddress:string;
    public desc:string;
}



