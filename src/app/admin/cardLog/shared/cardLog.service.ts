import { Injectable, Inject } from '@angular/core';
import { CardLog } from '../../common/module'

@Injectable()
export class CardLogService {

    parseParser: ParserServer;

    constructor(@Inject("parse") parse:ParserServer) {
        this.parseParser = parse;
    }

    addInfo(cardLogInfo: CardLog): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            var CardLog = this.parseParser.Parse.Object.extend("CardLog");
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
        let promise =this.parseParser.findCount("CardLog");
        return promise;
    }

    getList(pageIndex: number, pageSize: number): Promise<Array<CardLog>> {
        let promise = this.parseParser.findPage(pageIndex,pageSize,"CardLog");
        return promise;
    }

}