export class Menu{
    public id:string;
    public pid:string;
    public title:string;
    public isLeaf:boolean;
    public url:string;
    public code:string;
    public isValid:boolean;
    
    // constructor(id:string,pid:string,title:string,isLeaf:boolean){
    //     this.id=id;
    //     this.pid=pid;
    //     this.title=title;
    //     this.isLeaf=isLeaf;
    // }

    // public static MenuList(){
    //     return Array<Menu>(
    //         new Menu("1","0","样目管理",false),
    //         new Menu("2","0","系统管理",false),
    //         new Menu("3","1","房卡管理",false),
    //         new Menu("4","3","房卡管理",true),
    //         new Menu("5","3","房卡日志",true),
    //         new Menu("6","1","游戏设置",true),
    //         new Menu("7","1","玩家管理",true),
    //         new Menu("8","2","系统管理",false),
    //         new Menu("9","8","角色管理",true),
    //         new Menu("10","8","菜单管理",true)
    //     );
    // }
}