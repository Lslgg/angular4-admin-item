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

	constructor(
		private powerService: PowerService) {
		this.powerService.getMenuList().then(list=>{
			this.NaveMenulist=list;
			console.table(this.NaveMenulist);
		})
	}

	ngOnInit() { }

	allchecked(checked:boolean){
		this.NaveMenulist.forEach(val=>val.isChecked=checked);
	}

	onSave(){
		var list=new Array<Power>();
		this.NaveMenulist.forEach(val=>{
			if(val.isChecked){
				var power=new Power();
				power.id="";
				power.code="00001";
				power.explain="系统菜单";
				power.title=val.title;
				power.type="系统菜单";
				power.url=val.url;
				power.isValid=true;
				list.push(power);
			}
		});
		console.log(this.NaveMenulist);
		this.powerService.saveInfo(list).then(success=>{
			console.log(success);
		})
	}
}