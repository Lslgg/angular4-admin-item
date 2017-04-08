import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../common/module/index';
import { UserService } from './shared/user.service';

@Component({
    selector: 'admin-add-user',
    templateUrl: 'upUserPwd.html',
    providers: [UserService],
})

export class UpUserPwdComponent implements OnInit {

    submitValue: string;

    user: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) {
        this.user = new User();
        this.submitValue = "修改";
        this.user = this.userService.getCurrentUser();
    }

    ngOnInit() {

    }

    onSubmit() {
        this.userService.upUserPwd(this.user.id, this.user.username,
                     this.user.oldpassWord,this.user.passWord)
            .then(value => {
                if (value) {
                    alert(value ? "密码修改成功！" : "密码修改失败！");
                    this.router.navigate(['admin/upUserPwd']);
                }
            }).catch((error) => {

                alert("操作失败！");
            });
    }

    onBack() {
        this.router.navigate(['admin/user']);
    }
}