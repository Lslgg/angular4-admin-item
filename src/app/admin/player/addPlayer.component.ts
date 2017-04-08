import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user/shared/user.service';
import { PlayerService } from './shared/player.service';
import { Player } from '../common/module/';

@Component({
    selector: 'admin-add-player',
    templateUrl: 'addPlayer.html',
    providers: [UserService, PlayerService],
})

export class AddPlayerComponent implements OnInit {

    submitValue: string;

    player: Player;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private playerService: PlayerService) {
        this.player = new Player();
        let playerid = this.route.snapshot.params['id'];
        this.submitValue = "修改";
        this.playerService.getInfo(playerid).then(player => this.player = player);
    }

    ngOnInit() {

    }

    onSubmit() {
        let currentUser = this.userService.getCurrentUser();
        if (currentUser.card < this.player.addCardNum) {
            alert("您的房卡不够不能修改用户房卡！");
        } else {
            this.playerService.upInfo(this.player.id, this.player.addCardNum,this.player.name).then(isSuccess => {
                alert(isSuccess ? "修改房卡成功！" : "修改房卡失败！");
                this.router.navigate(['../admin/player']);
            }).catch(error => {
                alert("修改房卡失败！");
                console.log(error);
            })
        }
    }

    onBack() {
        this.router.navigate(['admin/player']);
    }
}