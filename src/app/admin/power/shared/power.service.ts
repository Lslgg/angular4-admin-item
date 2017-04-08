import { Injectable, Inject } from '@angular/core';

@Injectable()
export class PowerService {
    Parse: any;

    constructor( @Inject("parse") parse) {
        this.Parse = parse.Parse;
    }
    
    //查找权限表
    getInfo(roleId: string): Promise<any> {
        var Role_Module = this.Parse.Object.extend("Role_Module");
        var query = new this.Parse.Query(Role_Module);
        query.equalTo("roleId", roleId);

        let promise = new Promise<any>((resolve, reject) => {
            query.first({
                success: (roleModule) => {
                    resolve(roleModule)
                },
                error: (error) => {
                    reject("error");
                }
            });
        });

        return promise;
    }

    //修改或保存权限表
    saveInfo(roleId: string, menuList: string): Promise<boolean>  {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.getInfo(roleId).then(info => {
                if (info == undefined) {
                    var Role_Module = this.Parse.Object.extend("Role_Module");
                    let role_Module = new Role_Module();
                    role_Module.set("roleId", roleId);
                    role_Module.set("menuList", menuList);
                    role_Module.save(null, {
                        success: function (role_ModuleScore) {
                            resolve(true);
                        },
                        error: function (role_ModuleScore, error) {
                            reject(false);
                        }
                    });
                } else {
                    info.set("menuList", menuList);
                    info.save({
                        success: (success) => { resolve(true); },
                        error: (error) => { reject(false); }
                    });
                }
            });
        });

        return promise;
    }
}