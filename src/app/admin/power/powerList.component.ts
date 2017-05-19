import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../common';
import { RoleService } from '../role/shared/role.service';
import { PowerService } from './shared/power.service';
import { NavMenu, Power, PowerFun } from './shared/power';

@Component({
    selector: 'admin-powerlist',
    styleUrls: ['power.css'],
    templateUrl: 'powerList.html',
    providers: [PowerService, RoleService],
})

export class PowerListComponent implements OnInit {

    NaveMenulist: Array<NavMenu>;

    PowerList: Array<Power>;

    power: Power = new Power();

    nowPower: Power = new Power();

    operation: Array<string> = new Array<string>();

    powerFun: PowerFun = new PowerFun();

    constructor(
        private powerService: PowerService) {
        this.powerService.getMenuList().then(list => {
            this.NaveMenulist = list;
        });

        this.getPowerList();
    }

    ngOnInit() { }

    allchecked(checked: boolean, type: number) {
        if (type == 1) {
            this.NaveMenulist.forEach(val => val.isChecked = checked);
        } else {
            this.PowerList.forEach(val => val.isChecked = checked);
        }
    }

    oncheckedMenu(menu: NavMenu, checked: boolean) {
        menu.isChecked = checked;
    }

    oncheckedPower(power: Power, checked: boolean) {
        power.isChecked = checked;
    }

    onSave() {
        var list = new Array<Power>();
        this.NaveMenulist.forEach(val => {
            if (val.isChecked) {
                var power = new Power();
                power.id = "";
                power.code = "00001";
                power.explain = "来自系统的菜单";
                power.title = val.title;
                power.type = "系统菜单";
                power.url = val.url;
                power.isValid = true;
                power.menuId = val.id;
                power.operation = ["SHOW", "ADD", "UPDATE", "DELETE"];
                list.push(power);
            }
        });
        this.powerService.saveInfo(list).then(success => {
            alert(success ? "添加成功！" : "添加失败！");
            this.getPowerList();
        })
    }

    onSubmit() {
        this.power.explain = "自定义权限菜单";
        this.power.type = "自定义";
        this.power.operation = ["SHOW", "ADD", "UPDATE", "DELETE"];
        this.powerService.saveInfo([this.power]).then(success => alert(success ? "成功！" : "失败！"));
    }

    onDelInfo(id: string) {
        if (confirm("确认要删除！")) {
            this.powerService.delete(id).then(success => {
                alert(success ? "成功！" : "失败！");
                this.getPowerList();

            }).catch(error => alert("出现系统问题！"))
        }

    }

    onSaveFunPower() {
        this.powerService.saveInfo([this.nowPower]).then(success => alert(success ? "成功！" : "失败！"));
    }

    onGetPowerFun(power: Power) {
        this.nowPower = power;
        this.operation = this.nowPower.operation || [];
    }

    onFunCheck(obj: any) {
        let checked = obj.target.checked;
        let value = obj.target.value;
        var index = this.operation.indexOf(value);

        if (index > -1) this.operation.splice(index, 1);
        if (checked) this.operation.push(value);

        this.nowPower.operation = this.operation;
    }

    onCheckboDelete() {
        if (confirm("确认要删除！")) {
            var isTip=true;
            this.PowerList.forEach(val => {
                if (val.isChecked) {
                    this.powerService.delete(val.id).then(succes => {
                        if(isTip) alert("删除成功！");
                        isTip=false;
                        this.getPowerList();
                    })
                }
            });
        }
    }

    private getPowerList() {
        this.powerService.getPowerList().then(list => {
            this.PowerList = list;
        });
    }
}