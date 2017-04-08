import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Player, CardLog } from '../../common/module';
import { CommonHttp } from '../../../common/commonHttp';
import { CardLogService } from '../../cardLog/shared/cardLog.service';

@Injectable()
export class PlayerService {

	api: CommonHttp;

	Parse: any;

	constructor( @Inject("commonHttp") commonHttp: CommonHttp,
		@Inject("parse") parse, private http: Http, private cardLogService: CardLogService) {
		this.api = commonHttp;
		this.Parse = parse.Parse;
	}

	getList(pageIndex: number, pageSize: number): Promise<Array<Player>> {
		let promise = new Promise((resolve, reject) => {
			this.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_LIST, query: "page=" + pageIndex + "&pageSize=" + pageSize })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resolve(false);
					let playList: Array<Player> = new Array<Player>();
					for (var i = 0; i < info.result.data.length; i++) {
						let player = new Player();
						Object.assign(player, info.result.data[i]);
						playList[i] = player;
					}

					resolve(playList);
				})
		});

		return promise;
	}

	getCount(): Promise<number> {
		let promise = new Promise((resole, reject) => {
			this.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_TOTAL, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(info.result.num);

				})
		})
		return promise;
	}

	getInfo(id: string): Promise<Player> {
		let promise = new Promise((resole, reject) => {
			this.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_INFO, query: "userId=" + id })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(info.result);
				})
		});
		return promise;
	}

	upInfo(id: string, card: number, username: string): Promise<Player> {
		let promise = new Promise((resolve, reject) => {
			let currentUserCard = (-(card));
			let currentUser = this.Parse.User.current();
			let currentId = currentUser.id;
			let currentUserName = currentUser.get("username");

			this.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.CARD_CHANGE, query: "userId=" + id + "&change=" + card })
				.then(result => {
					let info = JSON.parse(result);
					resolve(info.error_code == 0);
				});

			//减少自己的房卡
			this.Parse.Cloud.run('updateUserCard', { objectId: currentId, card: currentUserCard })
				.then((result) => { resolve(true); });

			let carLog = new CardLog();
			carLog.card = card;
			carLog.userId = currentId;
			carLog.userName = currentUserName;
			carLog.targetId = id.toString();
			carLog.targetName = username;
			carLog.type = card >= 0 ? "添房卡" : "减房卡";
			carLog.desc = currentUserName + "给" + username + carLog.type + card + "张";

			this.cardLogService.addInfo(carLog).then(isSuccess => resolve(true))
				.catch(error => reject(false));


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
		});

		return promise;
	}
}