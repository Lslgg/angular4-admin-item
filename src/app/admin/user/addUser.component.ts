import { Component, OnInit,trigger, state, style, animate, transition } from '@angular/core';
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


    submitValue: string="添加";
    
    isShowPwd:boolean=false;
    user: User;

    roleList: Array<{ name: string, roleName: string }>;

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
            this.isShowPwd=false;
        } else {
            this.submitValue = "修改";
            this.isShowPwd=true;
            this.userService.getUserInfo(userid).then(user => {
                this.user = user;
                this.user.passWord="123456";
                this.user.confirmpassword="123456";
            });
        }

        this.roleService.getList(1, 100).then(roles => {
            this.roleList = new Array();
            roles.forEach((role, index) => {
                let name = role.name;
                let roleName = role.roleName;
                this.roleList[index] = { name: name, roleName: roleName };
            });
        });
    }

    ngOnInit() {

    }
    
    onSubmit() {
        let currentUser=this.userService.getCurrentUser();
        /***
        if(currentUser.username=="admin"){
            alert("不能修改admin用户信息");
            return;
        }
        */
        let user = this.userService.addUser(this.user);
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