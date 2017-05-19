import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LoginService {
    Parse: any;
    constructor(@Inject("parse") parse) {
        this.Parse = parse.Parse;
    }

    login(account: string, pwd: string): Promise<boolean> {
        var promise = new Promise((resolve, reject) => {
            this.Parse.User.logIn(account, pwd, {
                success: function (user) {
                    return resolve(true);
                },
                error: function (user, error) {
                    return reject(false);
                }
            });
        });

        return promise;
    }
}