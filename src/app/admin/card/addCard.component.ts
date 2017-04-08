import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../common/module/index';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user/shared/user.service';
import { RoleService } from '../role/shared/role.service';

@Component({
    selector: 'admin-add-Card',
    templateUrl: 'addCard.html',
    providers: [UserService, RoleService],
})

export class AddCardComponent implements OnInit {

    submitValue: string;

    user: User;

    roleList: Array<{ name: string, roleName: string }>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private roleService: RoleService) {
        this.user = new User();
        let userid = this.route.snapshot.params['id'];
        this.submitValue = "修改";
        this.userService.getUserInfo(userid).then(user => this.user = user);
    }

    ngOnInit() {

    }

    onSubmit() {

        let currentUser = this.userService.getCurrentUser();
        if (currentUser.id == this.user.id && currentUser.username != "admin") {
            alert("不能给自己修改房卡！");
            return;
        }

        if (currentUser.card < this.user.addCard) {
            alert("您的房卡不够不能修改用户房卡！");
        } else {
            this.userService.upUserCard(this.user.id, this.user.addCard, this.user.username)
                .then((value) => {
                    this.router.navigate(['admin/card']);
                }).then(current => {
                    alert("添加房卡成功！");
                    this.router.navigate(['admin/card']);
                }).catch((error) => {
                    alert("操作失败！");
                });
        }
    }

    onBack() {
        this.router.navigate(['admin/card']);
    }
}