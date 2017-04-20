import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../common';
import { RoleService } from '../role/shared/role.service';
import { PowerService } from './shared/power.service';
import { NavMenu, Power} from './shared/power';

@Component({
	selector: 'admin-power',
	styleUrls: ['power.css'],
	templateUrl: 'power.html',
	providers: [PowerService, RoleService],
})

export class PowerComponent implements OnInit {

	NaveMenulist:Array<NavMenu>;

	PowerList:Array<Power>;

	power:Power=new Power();

	constructor(
		private powerService: PowerService) {
		this.powerService.getMenuList().then(list=>{
			this.NaveMenulist=list;
		});

		this.powerService.getPowerList().then(list=>{
			this.PowerList=list;
		});
	}

	ngOnInit() { }

	allchecked(checked:boolean,type:number){
		if(type==1){
			this.NaveMenulist.forEach(val=>val.isChecked=checked);
		}else{
			this.PowerList.forEach(val=>val.isChecked=checked);
		}
	}

	oncheckedMenu(menu:NavMenu,checked:boolean){
		menu.isChecked=checked;
	}

	oncheckedPower(power:Power,checked:boolean){
		power.isChecked=checked;
	}

	onSave(){
		var list=new Array<Power>();
		this.NaveMenulist.forEach(val=>{
			if(val.isChecked){
				var power=new Power();
				power.id="";
				power.code="00001";
				power.explain="来自己系统的菜单";
				power.title=val.title;
				power.type="系统菜单";
				power.url=val.url;
				power.isValid=true;
				power.menuId=val.id;
				list.push(power);
			}
		});
		this.powerService.saveInfo(list).then(success=>{ 
			alert(success?"添加成功！":"添加失败！");
		})
	}

	onSubmit(){
		this.power.explain="自己定义权限菜单";
		this.power.type="自己义";
		this.powerService.saveInfo([this.power]).then(success=> alert(success?"成功！":"失败！"));
	}

	onUpInfo(id:string){
		
	}

	onDelInfo(id:string){

	}
}