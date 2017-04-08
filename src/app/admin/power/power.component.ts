import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../common';
import { RoleService } from '../role/shared/role.service';
import { PowerService } from './shared/power.service';

@Component({
	selector: 'admin-power',
	styleUrls:['power.css'],
	templateUrl: 'power.html',
	providers:[PowerService,RoleService],
})

export class PowerComponent implements OnInit {

	//菜单项
	menuList:Array<{id:number,title:string,isChecked:boolean}>;

	//角色项
	roleList:Array<{id:string,roleName:string}>;

	//当前角色
	currentRole:string="无";

	//当前角色id
	currentRoleId:string="";

	constructor(
		private powerService:PowerService,
		private roleService:RoleService){
		this.roleList=new Array();
		this.menuList=new Array();

		this.roleService.getList(1,100).then(vlist=>{
			vlist.map((role,number)=>{
				this.roleList.push({id:role.id,roleName:role.roleName});
			});
		});

		AdminMenu.forEach((value,index)=>{
			let info=value.data.menu;
			this.menuList.push({id:info.id,title:info.title,isChecked:false});
		});
	}

	ngOnInit() { }

	onRoleClick(id:string,roleName:string){
		this.menuList.forEach((value)=>{ value.isChecked=false; });
		this.currentRole=roleName;
		this.currentRoleId=id;
		this.powerService.getInfo(id).then((value)=>{
			let menuList=value.get("menuList").split(',') as Array<number>;
			this.menuList.forEach((value)=>{
				let isExit=menuList.find((subval)=>{
					return subval==value.id;
				});
				if(isExit!=undefined){
					value.isChecked=true;
				}
			});
		})
	}

	onAllcheck(checked:boolean){
		this.menuList.map((item,index)=>{
			item.isChecked=checked;
		});
	}

	oncheck(id:number,checked:boolean){
		let nowMenu=this.menuList.find((value,index)=>{
			return value.id===id;
		});
		nowMenu.isChecked=checked;
	}

	onSave(){
		let menuIdList=[];
		this.menuList.forEach((value,index)=>{
			if(value.isChecked){
				menuIdList.push(value.id);
			}
		});

		if(menuIdList.length==0){
			alert("请选择模块！");
			return;
		}
		
		if(this.currentRoleId==""){
			alert("请选择角色！");
			return;
		}

		let strMenu=menuIdList.join(',');
		this.powerService.saveInfo(this.currentRoleId,strMenu).then(success=>{
			alert(success?"权限修改成功！":"修改权限失败！");
		});
	}
}