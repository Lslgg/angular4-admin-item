import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { routeAnimation, routerHost } from '../common/animation';
import { User } from '../common/module/index';
import { UserService } from './shared/user.service';

@Component({
    selector: 'app-upUserInfo',
    templateUrl: 'upUserInfo.html',
    providers: [UserService],
})
export class UpUserInfoComponent implements OnInit {


    submitValue: string;

    user: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) {
        this.user = new User();
        this.submitValue = "修改";
        let currentUser= this.userService.getCurrentUser();
        this.userService.getUserInfo(currentUser.id).then(user=>this.user=user);
    }

    ngOnInit() { }

    onSubmit() {
        this.userService.upUserInfo(this.user.id, this.user.email,this.user.phone,this.user.address)
            .then(value => {
                if (value) {
                    alert(value ? "修改成功！" : "修改失败！");
                    this.router.navigate(['admin/index']);
                }
            }).catch((error) => {
                alert("操作失败！");
            });
    }

    onBack() {
        this.router.navigate(['admin/index']);
    }
}