import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../common';
import { RoleService } from '../role/shared/role.service';
import { PowerService } from './shared/power.service';
import { NavMenu, Power, RoleInfo ,RolePower} from './shared/power';

@Component({
	selector: 'admin-power',
	styleUrls: ['power.css'],
	templateUrl: 'power.html',
	providers: [PowerService, RoleService],
})

export class PowerComponent implements OnInit {

	powerList: Array<Power>;

	roleList: Array<RoleInfo>;

	rolePowerList:Array<RolePower>;

	roleId:string="00000000";

	constructor(
		private powerService: PowerService) {
		this.powerService.getPowerList().then(list => {
			this.powerList = list;
		});

		this.powerService.getRoleList().then(list=>{
			this.roleList=list;
		})
	}

	ngOnInit() { }

	allchecked(checked: boolean, type: number) {
		this.powerList.forEach(val => val.isChecked = checked);
	}

	oncheckedMenu(menu: NavMenu, checked: boolean) {
		menu.isChecked = checked;
	}

	oncheckedRolePower(rolePower: Power, checked: boolean) {
		rolePower.isChecked = checked;
	}

	onSave() {
		var list = new Array<RolePower>();
		this.powerList.forEach(val => {
			if (val.isChecked) {
				var power = new RolePower();
				power.id = "";
				power.roleId=this.roleId;
				power.code = "00001";
				power.explain = power.explain;
				power.title = val.title;
				power.type = val.type;
				power.url = val.url;
				power.isValid = true;
				power.menuId = val.id;
				power.operation=val.operation;
				list.push(power);
			}
		});
		this.powerService.saveRolePower(list).then(
			success => alert(success ? "添加成功！" : "添加失败！"))
	}

	onDelInfo(id: string) {

	}

	onRoleClick(roleId:string){
		this.roleId=roleId;
		this.powerService.getRolePowerList(roleId).then(list=>{
			this.rolePowerList=list
		});
	}
}