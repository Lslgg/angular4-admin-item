import { Injectable, Inject } from '@angular/core';
import { User, CardLog } from '../../common/module/index';
import { CardLogService } from '../../cardLog/shared/cardLog.service';

@Injectable()
export class UserService {

    Parse: any;

    constructor(@Inject("parse") parse,
        private cardLogService: CardLogService) {
        this.Parse = parse.Parse;
    }

    addUser(user: User): Promise<boolean> {
        //修改用户信息
        if (user.id != undefined) {
            let promise = new Promise<boolean>((resolve, reject) => {
                this.Parse.Cloud.run('updateUser',
                    {
                        objectId: user.id,
                        username: user.username,
                        roleId: user.roleId,
                        isValid: user.isValid
                    }
                ).then((result) => resolve(true));
            });

            return promise;
        } else { //添加新用户
            let parseUser = this.setUser(user);
            let promise = new Promise<boolean>((resolve, reject) => {
                parseUser.signUp(null, {
                    success: (user) => { resolve(true) },
                    error: (user, error) => { reject(false); }
                });
            });
            return promise;
        }
    }

    getUserList(pageIndex: number, pageSize: number): Promise<Array<User>> {
        var query = new this.Parse.Query(this.Parse.User);
        query.descending('updatedAt');
        query.skip((pageIndex - 1) * pageSize);
        query.limit(pageSize);

        let promise = new Promise<Array<User>>((resolve, reject) => {
            query.find({
                success: (result: Array<User>) => {
                    let userList: Array<User> = new Array<User>();
                    for (let i = 0; i < result.length; i++) {
                        let user = new User();
                        Object.assign(user, result[i]["attributes"]);
                        user.id = result[i]['id'];
                        userList[i] = user;
                    }
                    resolve(userList);
                },
                error: (error) => { reject(error) }
            });
        });

        return promise;
    }

    getUserCount(): Promise<number> {
        var query = new this.Parse.Query(this.Parse.User);

        let promise = new Promise<number>((resolve, reject) => {

            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });

        return promise;
    }

    getUserInfo(id: string): Promise<User> {
        var query = new this.Parse.Query(this.Parse.User);
        query.equalTo('objectId', id);
        let promise = new Promise<User>((resolve, reject) => {
            query.find({
                success: (user: User) => {
                    let userInfo = new User();
                    Object.assign(userInfo, user[0]['attributes']);
                    userInfo.id = user[0]['id'];
                    resolve(userInfo);
                },
                error: (error) => { reject(null) }
            })
        });
        return promise;
    }

    delUser(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Cloud.run('deleteUser', { objectId: id }).then(
                (result) => { resolve(result); }
            );
        });
        return promise;
    }

    upUserCard(id: string, card: Number, username: string): Promise<boolean> {

        let promise = new Promise<boolean>((resolve, reject) => {
            let currentUserCard = (-(card));
            let currentUser = this.Parse.User.current();
            let currentId = currentUser.id;
            let currentUserName = currentUser.get("username");

            //修改用户的房卡
            this.Parse.Cloud.run('updateUserCard', { objectId: id, card: card }).then(
                (result) => { resolve(result); }
            );

            //修改自己的房卡 admin 不用减少自己的房卡
            if (username == "admin") {
                resolve(true);
            } else {
                this.Parse.Cloud.run('updateUserCard', { objectId: currentId, card: currentUserCard })
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
        var currentUser = this.Parse.User.current();
        let userInfo = new User();
        Object.assign(userInfo, currentUser['attributes']);
        userInfo.id = currentUser.id;
        return userInfo;
    }

    upUserPwd(id: string, username: string, password: string, newPassword): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.User.logIn(username, password, {
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

    upUserInfo(id: string, email: string, phone: string, address: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Cloud.run('updateUserInfo',
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

    private upPwd(id: string, password: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Cloud.run('updateUserPwd', { objectId: id, password: password }).then(
                (result) => { resolve(true); }
            );
        });
        return promise;
    }

    private setUser(userInfo: User) {
        var user = new this.Parse.User();
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