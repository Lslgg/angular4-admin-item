import { Injectable, Inject } from '@angular/core';
import { Role } from '../../common/module/index';

@Injectable()
export class RoleService {

    public Parse: any;

    constructor(@Inject("parse") parse) {
        this.Parse = parse.Parse;
    }

    public addInfo(role:Role): Promise<boolean> {
        //添加
        if (role.id==undefined) {
            let promise = new Promise<boolean>((resolve, reject) => {
                var roleACL = new this.Parse.ACL();
                roleACL.setPublicReadAccess(true);
                var roleinfo = new this.Parse.Role(role.name, roleACL);
                roleinfo.set("roleName",role.roleName);
                roleinfo.set("desc",role.desc);
                roleinfo.set("isValid",role.isValid);
                roleinfo.save();
                resolve(true);
            });
            return promise;

        } else { //修改信息
            let promise = new Promise<boolean>((resolve, reject) => {
                this.Parse.Cloud.run('updateRole',{
                    objectId: role.id,
                    roleName: role.roleName,
                    desc:role.desc,
                    isValid:role.isValid
                }).then(result => resolve(result));
            });
            return promise;
        }
    }

    public getList(pageIndex: number, pageSize: number): Promise<Array<Role>> {
        var query = new this.Parse.Query(this.Parse.Role);
        query.descending('updatedAt');
        query.skip((pageIndex - 1) * pageSize);
        query.limit(pageSize);
        let promise = new Promise<Array<Role>>((resolve, reject) => {
            query.find({
                success: (result: Array<Role>) => {
                    let roleList: Array<Role> = new Array<Role>();
                    for (let i = 0; i < result.length; i++) {
                        let role = new Role();
                        Object.assign(role, result[i]["attributes"]);
                        role.id = result[i]['id'];
                        roleList[i] = role;
                    }
                    resolve(roleList);
                },
                error: (error) => { reject(error) }
            });
        });

        return promise;
    }

    public getCount(): Promise<number> {
        var query = new this.Parse.Query(this.Parse.Role);
        let promise = new Promise<number>((resolve, reject) => {
            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });

        return promise;
    }

    public getInfo(id: any): Promise<Role> {

        let promise = new Promise<Role>((resolve, reject) => {
            var query = new this.Parse.Query(this.Parse.Role);
            query.equalTo('objectId', id);
            query.get(id, {
                success: (roule: Role) => {
                    let roleInfo = new Role();
                    Object.assign(roleInfo, roule['attributes']);
                    roleInfo.id = roule['id'];
                    resolve(roleInfo);
                },
                error: (error) => {
                    reject(false);
                }
            })
        });
        return promise;
    }

    public delInfo(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Cloud.run('deleteRole', { objectId: id }).then(
                (result) => { resolve(result); }
            );
        });
        return promise;
    }
}