import { Component, OnInit, trigger } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../common/module/index';
import { FormGroup } from '@angular/forms';
import { UserService } from './shared/user.service';
import { RoleService } from '../role/shared/role.service';

@Component({
    selector: 'admin-add-user',
    templateUrl: 'adduser.html',
    providers: [UserService, RoleService],
})

export class AddUserComponent implements OnInit {


    submitValue: string = "添加";

    isShowPwd: boolean = false;

    user: User;

    roleList: Array<{ id: string, name: string, roleName: string }>;

    oldRoleId:string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private roleService: RoleService) {
        this.user = new User();
        this.user.roleId = "2";
        let userid = this.route.snapshot.params['id'];
        if (userid == undefined) {
            this.submitValue = "添加";
            this.isShowPwd = false;
        } else {
            this.submitValue = "修改";
            this.isShowPwd = true;
            this.userService.getUserInfo(userid).then(user => {
                this.user = user;
                this.user.passWord = "123456";
                this.user.confirmpassword = "123456";
                this.oldRoleId=this.user.roleId;
            });
        }

        this.roleService.getList(1, 100).then(roles => {
            this.roleList = new Array();
            roles.forEach((role, index) => {
                let name = role.name;
                let roleName = role.roleName;
                let id = role.id;
                this.roleList[index] = { id, name, roleName };
            });
        });
    }

    ngOnInit() {

    }

    onSubmit() {
        let user = this.user.id == undefined ? this.userService.addUser(this.user) :
            this.userService.updateUser(this.user,this.oldRoleId);

        user.then((value) => {
            alert(this.user.id != undefined ? "修改用户成功！" : "添加用户成功！");
            this.router.navigate(['admin/user']);
        }).catch((error) => {
            alert("操作失败！");
        });
    }

    onBack() {
        this.router.navigate(['admin/user']);
    }
}