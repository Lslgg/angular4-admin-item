import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../common';
import { RoleService } from '../role/shared/role.service';
import { PowerService } from './shared/power.service';
import { NavMenu, Power, RoleInfo, RolePower } from './shared/power';

@Component({
	selector: 'admin-power',
	styleUrls: ['power.css'],
	templateUrl: 'power.html',
	providers: [PowerService, RoleService],
})

export class PowerComponent implements OnInit {

	powerList: Array<Power>;

	roleList: Array<RoleInfo>;

	rolePowerList: Array<RolePower>;

	roleId: string = "00000000";

	noewRoleName:string;

	roleListCount:number=0;

	rolePowerCount:number=0;

	operationMap = this.powerService.operationMap();

	constructor(private powerService: PowerService) {

		this.powerService.getPowerList().then(list => {
			this.powerList = list;
			let operationMap = this.powerService.operationMap();
			this.powerList.forEach(val => {
				for (var item in val.operation) {
					val.operationChecked[item] = val.operation[item];
				}
			});
		});

		this.powerService.getRoleList().then(list => {
			this.roleList = list;
			this.roleListCount=list.length;
		})
	}

	ngOnInit() { }

	allchecked(checked: boolean, type: number) {
		if (type == 1) {
			this.powerList.forEach(val => val.isChecked = checked);
		} else {
			this.rolePowerList.forEach(val => val.isChecked = checked);
		}
	}

	oncheckedMenu(menu: NavMenu, checked: boolean) {
		menu.isChecked = checked;
	}

	oncheckedRolePower(rolePower: Power, checked: boolean) {
		rolePower.isChecked = checked;
	}

	//保存角色权限
	onSave() {
		var list = new Array<RolePower>();
		this.powerList.forEach(val => {
			if (val.isChecked) {
				var power = new RolePower();
				power.id = "";
				power.roleId = this.roleId;
				power.code = "00001";
				power.explain = power.explain;
				power.title = val.title;
				power.type = val.type;
				power.url = val.url;
				power.isValid = true;
				power.menuId = val.id;
				power.operation = val.operation;
				list.push(power);
			}
		});
		this.powerService.saveRolePower(list).then(
			success => {
				alert(success ? "添加成功！" : "添加失败！");
				this.getPowerService();
			})
	}

	onDelInfo(id: string) {
		if (confirm("确认要删除！")) {
			this.powerService.deleteRolePower(id).then(success => {
				alert(success ? "成功！" : "失败！");
				this.getPowerService();
			})
		}
	}

	onDeleteAll() {
		if (confirm("确认要删除！")) {
			var isTip = true;
			this.rolePowerList.forEach(val => {
				if (val.isChecked) {
					this.powerService.deleteRolePower(val.id).then(succes => {
						if (isTip) alert("删除成功！");
						isTip = false;
						this.getPowerService();
					})
				}
			});
		}
	}

	//选择角色查找权限
	onRoleClick(roleId: string,roleName:string) {
		this.roleId = roleId;
		this.noewRoleName=roleName;
		this.getPowerService();
	}

	//选择权限功能权限全选	
	onOperationCheckAll(power: Power, checked: boolean) {
		if (!checked) {
			power.operation = [];
		} else {
			power.operation = power.operationChecked;
		}
	}

	//选择权限功能权限单选
	onChekPower(power: Power, obj: any) {
		let checked = obj.target.checked;
		let value = obj.target.value;
		var index = power.operation.indexOf(value);
		if (index > -1) power.operation.splice(index, 1);
		if (checked) power.operation.push(value);
	}

	getPowerService() {
		this.powerService.getRolePowerList(this.roleId).then(list => {
			this.rolePowerList = list;
			this.rolePowerCount=list.length;
		});
	}
}