import { Injectable, Inject } from '@angular/core';
import { CardLog } from '../../common/module';
import { CardLogSearch } from './cardLogSearch'

@Injectable()
export class CardLogService {

    parseParser: ParserServer;

    constructor( @Inject("parse") parse) {
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
            cardLog.set("userType", cardLogInfo.userType);            
            

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

    getCount(cardLogSearch: CardLogSearch): Promise<number> {
        var query = this.parseParser.setQuery("CardLog");
        if (cardLogSearch.username != "") {
            query.equalTo("userName", cardLogSearch.username);
        }

        if (cardLogSearch.targetname != "") {
            query.equalTo("tragetName", cardLogSearch.targetname);
        }

        if (cardLogSearch.startDate != null) {
            query.greaterThanOrEqualTo('createdAt', new Date(cardLogSearch.startDate));
        }

        if (cardLogSearch.endDate != null) {
            query.lessThanOrEqualTo('createdAt', new Date(cardLogSearch.endDate));
        }

        if (cardLogSearch.cardType != "") {
            query.equalTo("type", cardLogSearch.cardType);
        }
        let promise = new Promise<number>((resolve, reject) => {
            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });
        return promise;
    }

    getList(pageIndex: number, pageSize: number, cardLogSearch: CardLogSearch): Promise<Array<CardLog>> {

        var query = this.parseParser.setQuery("CardLog");
        if (cardLogSearch.username != "") {
            query.equalTo("userName", cardLogSearch.username);
        }

        if (cardLogSearch.targetname != "") {
            query.equalTo("targetName", cardLogSearch.targetname);
        }

        if (cardLogSearch.startDate != null) {
            query.greaterThanOrEqualTo('createdAt', new Date(cardLogSearch.startDate));
        }

        if (cardLogSearch.endDate != null) {
            query.lessThanOrEqualTo('createdAt', new Date(cardLogSearch.endDate));
        }

        if (cardLogSearch.cardType != "") {
            query.equalTo("type", cardLogSearch.cardType);
        }

        query.descending('updatedAt');
        query.skip((pageIndex - 1) * pageSize);
        query.limit(pageSize);

        let promise = new Promise<any>((resolve, reject) => {
            query.find({
                success: (result: Array<any>) => {
                    let list: Array<CardLog> = new Array<CardLog>();
                    for (let i = 0; i < result.length; i++) {
                        let info = new CardLog();
                        Object.assign(info, result[i]["attributes"]);
                        info["id"] = result[i]['id'];
                        list[i] = info;
                    }

                    resolve(list);
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });

        return promise;
    }

}