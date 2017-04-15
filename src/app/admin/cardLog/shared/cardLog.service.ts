import { Injectable, Inject } from '@angular/core';
import { CardLog } from '../../common/module'

@Injectable()
export class CardLogService {

    Parse: any;

    constructor(@Inject("parse") parse) {
        this.Parse = parse.Parse;
    }

    addInfo(cardLogInfo: CardLog): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            var CardLog = this.Parse.Object.extend("CardLog");
            let cardLog = new CardLog();

            cardLog.set("userId", cardLogInfo.userId);
            cardLog.set("userName", cardLogInfo.userName);
            cardLog.set("targetId", cardLogInfo.targetId);
            cardLog.set("targetName", cardLogInfo.targetName);
            cardLog.set("card", cardLogInfo.card);
            cardLog.set("type", cardLogInfo.type);
            cardLog.set("desc", cardLogInfo.desc);

            cardLog.save(null, {
                success: function (cardLog) {
                    resolve(true);
                },
                error: function (cardLog, error) {
                    reject(false);
                }
            });
        })

        return promise;
    }

    getCount(): Promise<number> {
        var cardLog = this.Parse.Object.extend("CardLog");
        var query = new this.Parse.Query(cardLog);
        let promise = new Promise<number>((resolve, reject) => {
            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });

        return promise;
    }

    getList(pageIndex: number, pageSize: number): Promise<Array<CardLog>> {
        let cardLog = this.Parse.Object.extend("CardLog");
        let query = new this.Parse.Query(cardLog);
        query.skip((pageIndex - 1) * pageSize);
        query.limit(pageSize);

        let promise = new Promise<Array<CardLog>>((resolve, reject) => {
            query.find({
                success: (result: Array<CardLog>) => {
                    let cardLogList: Array<CardLog> = new Array<CardLog>();
                    for (let i = 0; i < result.length; i++) {
                        let cardLog = new CardLog();
                        let self = result[i];
                        Object.assign(cardLog, self["attributes"]);
                        cardLog.id = self['id'];
                        cardLog.createAtFormt=cardLog.createdAt.toLocaleString()
                        cardLogList[i] = cardLog;
                    }
                    resolve(cardLogList);
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });

        return promise;
    }

}