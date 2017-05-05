import { Injectable, Inject } from '@angular/core';
import { User, CardLog } from '../../common/module/index';
import { CardLogService } from '../../cardLog/shared/cardLog.service';

@Injectable()
export class UserService {

    Parse: ParserServer;

    constructor( @Inject("parse") parse: ParserServer,
        private cardLogService: CardLogService) {
        this.Parse = parse;
    }

    addUser(user: User): Promise<boolean> {
        let parseUser = this.setUser(user);
        let promise = new Promise<boolean>((resolve, reject) => {
            parseUser.save(null, {
                success: (userInfo) => {
                    this.getRoleInfo(user.roleId).then(val => {
                        val.getUsers().add(userInfo);
                        val.save();
                        resolve(true);
                    })
                },
                error: (user, error) => { reject(false); }
            });
        });
        return promise;
    }

    updateUser(user: User, oldRoleId: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateUser',
                {
                    objectId: user.id,
                    username: user.username,
                    roleId: user.roleId,
                    isValid: user.isValid
                }
            ).then((result) => {
                if (user.roleId == oldRoleId) {
                    resolve(true);
                } else {
                    this.getUserInfo2(user.id).then(userInfo => {
                        let roleId = userInfo["attributes"]["roleId"];
                        this.getRoleInfo(roleId).then(val => {//添加新的角色
                            val.getUsers().add(userInfo);
                            val.save();
                            this.getUserInfo2(user.id).then(odlUserInfo => {//删除旧的角色
                                this.getRoleInfo(oldRoleId).then(oldVal => {
                                    oldVal.getUsers().remove(odlUserInfo);
                                    oldVal.save();
                                    resolve(true);
                                })
                            })
                        })
                    });
                }

            })
        });

        return promise;
    }

    getUserList(pageIndex: number, pageSize: number): Promise<Array<User>> {
        let promise = this.Parse.findPage<User>(pageIndex, pageSize, this.Parse.Parse.User);
        return promise;
    }

    getUserCount(): Promise<number> {
        let promise = this.Parse.findCount(this.Parse.Parse.User);
        return promise;
    }

    getUserInfo(id: string): Promise<User> {
        let promise = this.Parse.getInfo<User>(id, this.Parse.Parse.User);
        return promise;
    }

    delUser(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('deleteUser', { objectId: id }).then(
                (result) => { resolve(result); }
            );
        });
        return promise;
    }

    upUserCard(id: string, card: Number, username: string): Promise<boolean> {

        let promise = new Promise<boolean>((resolve, reject) => {
            let currentUserCard = (-(card));
            let currentUser = this.Parse.Parse.User.current();
            let currentId = currentUser.id;
            let currentUserName = currentUser.get("username");

            //修改用户的房卡
            this.Parse.Parse.Cloud.run('updateUserCard', { objectId: id, card: card }).then(
                (result) => { resolve(result); }
            );

            //修改自己的房卡 admin 不用减少自己的房卡
            if (username == "admin") {
                resolve(true);
            } else {
                this.Parse.Parse.Cloud.run('updateUserCard', { objectId: currentId, card: currentUserCard })
                    .then((result) => { resolve(result); });
            }

            let carLog = new CardLog();
            carLog.card = card;
            carLog.userId = currentId;
            carLog.userName = currentUserName;
            carLog.targetId = id;
            carLog.targetName = username;
            carLog.type = card >= 0 ? "添房卡" : "减房卡";
            carLog.desc = currentUserName + "给" + username + carLog.type + card + "张";

            this.cardLogService.addInfo(carLog).then(isSuccess => resolve(true))
                .catch(error => reject(false));

            // admin 不用写减少房卡日志
            if (username == "admin") {
                reject(true);
            } else {
                let selfcarLog = new CardLog();
                selfcarLog.card = currentUserCard;
                selfcarLog.userId = currentId;
                selfcarLog.userName = currentUserName;
                selfcarLog.targetId = currentId;
                selfcarLog.targetName = currentUserName;
                selfcarLog.type = currentUserCard >= 0 ? "添房卡" : "减房卡";
                selfcarLog.desc = currentUserName + "给" + currentUserName + selfcarLog.type + card + "张";
                this.cardLogService.addInfo(selfcarLog).then(isSuccess => resolve(true))
                    .catch(error => reject(false));
            }

        });

        return promise;
    }

    getCurrentUser(): User {
        var currentUser = this.Parse.Parse.User.current();
        let userInfo = new User();
        Object.assign(userInfo, currentUser['attributes']);
        userInfo.id = currentUser.id;
        return userInfo;
    }

    upUserPwd(id: string, username: string,
        password: string, newPassword): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.User.logIn(username, password, {
                success: function (user) {
                    resolve(true);
                },
                error: function (user, error) {
                    console.log(error);
                    return reject(false);
                }
            });

        });

        promise.then(istrue => {
            if (istrue) { return this.upPwd(id, newPassword); }
        }).catch(error => { console.log(error); })

        return promise;
    }

    upUserInfo(id: string, email: string,
        phone: string, address: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateUserInfo',
                {
                    objectId: id,
                    email: email,
                    phone: phone,
                    address: address
                }).then(
                (result) => { resolve(true); }
                );
        });
        return promise;
    }

    /**
    * 查找返回原数据库对象
    */
    getRoleInfo(id: string): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            var query = new this.Parse.Parse.Query(this.Parse.Parse.Role);
            query.equalTo('objectId', id);
            query.get(id, {
                success: (roule: any) => {
                    resolve(roule);
                },
                error: (error) => {
                    reject(false);
                }
            })
        });
        return promise;
    }

    /**
     * 查找返回原数据库对象
     */
    getUserInfo2(id: string): Promise<User> {
        var query = new this.Parse.Parse.Query(this.Parse.Parse.User);
        let promise = new Promise<User>((resolve, reject) => {
            query.get(id, {
                success: (user: User) => {
                    resolve(user);
                },
                error: (error) => { reject(null) }
            })
        });
        return promise;
    }

    private upPwd(id: string, password: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateUserPwd', { objectId: id, password: password }).then(
                (result) => { resolve(true); }
            );
        });
        return promise;
    }

    private setUser(userInfo: User) {
        var user = new this.Parse.Parse.User();
        user.set("id", userInfo.id);
        user.set("username", userInfo.username);
        user.set("password", userInfo.passWord);
        user.set("roleId", userInfo.roleId);
        user.set("card", 0);
        user.set("email", userInfo.username + "@qq.com");
        user.set("phone", "");
        user.set("address", "");
        user.set("lastLoginIp", "127.0.0.1");
        user.set("lastLoginTime", Date.now());
        user.set("isDel", true);
        user.set("isValid", true);
        return user;
    }
}