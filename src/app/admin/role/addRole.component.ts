import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RoleService } from './shared/role.service';
import { Role } from '../common/module/index';


@Component({
    selector: 'admin-add-role',
    templateUrl: 'addRole.html',
    providers: [RoleService],
})

export class AddRoleComponent implements OnInit {

    submitValue: string;

    role:Role=new Role();
    
    name_valid:boolean=false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private roleService: RoleService) {
        let id = this.route.snapshot.params['id'];
        if (id == undefined) {
            this.submitValue = "添加";
            this.name_valid=false;
        } else {
            this.name_valid=true;
            this.submitValue = "修改";
            this.roleService.getInfo(id).then(role => {
                this.role=role;
            });
        }
    }

    ngOnInit() {

    }

    onSubmit() {
        this.roleService.addInfo(this.role).then(v => {
            let messageStr = v == true ? "操作成功" : "操作失败";
            alert(messageStr);
            this.router.navigate(['admin/role']);
        })
    }

    onBack() {
        this.router.navigate(['admin/role']);
    }
}