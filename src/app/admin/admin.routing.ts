import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { IndexComponent } from './index/index';
import { UserComponent, AddUserComponent, UpUserPwdComponent, UpUserInfoComponent } from './user';
import { RoleComponent, AddRoleComponent } from './role';
import { CardComponent, AddCardComponent } from './card';
import { PowerComponent, PowerListComponent } from './power';
import { CardLogComponent } from './cardLog';
import { PlayerComponent, AddPlayerComponent } from './player';
import { SystemComponent } from './system';
import { SystemLogComponent } from './systemLog';
import { MenuComponent, AddMenuComponent } from './menu';
import { NotFindPageComponent,NotPowerComponent} from './common/component/404';

const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },
  { path: 'index', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },

  { path: 'user', component: UserComponent, data: { title: '用户管理', module: 'user', power: "SHOW" } },
  { path: 'addUser', component: AddUserComponent, data: { title: '添加用户', module: 'user', power: "ADD" } },
  { path: 'addUser/:id', component: AddUserComponent, data: { title: '修改用户', module: 'user', power: "UPDATE" } },
  { path: 'upUserPwd', component: UpUserPwdComponent, data: { title: '修改密码', module: 'user', power: "UPDATE" } },
  { path: 'upUserInfo', component: UpUserInfoComponent, data: { title: '用户信息', module: 'user', power: "UPDATE" } },

  { path: 'role', component: RoleComponent, data: { title: '角色管理', module: 'role', power: "SHOW" } },
  { path: 'addRole', component: AddRoleComponent, data: { title: '添加角色', module: 'role', power: "ADD" } },
  { path: 'addRole/:id', component: AddRoleComponent, data: { title: '修改角色', module: 'role', power: "UPDATE" } },

  { path: 'power', component: PowerComponent, data: { title: '设置权限', module: 'power', power: "SHOW" } },
  { path: 'powerList', component: PowerListComponent, data: { title: '权限列表', module: 'powerList', power: "SHOW" } },

  { path: 'card', component: CardComponent, data: { title: '房卡管理', module: 'card', power: "SHOW" } },
  { path: 'addCard', component: AddCardComponent, data: { title: '添加房卡', module: 'card', power: "ADD" } },
  { path: 'addCard/:id', component: AddCardComponent, data: { title: '修改房卡', module: 'card', power: "UPDATE" } },
  { path: 'cardLog', component: CardLogComponent, data: { title: '房卡日志', module: 'cardLog', power: "SHOW" } },

  { path: 'player', component: PlayerComponent, data: { title: '玩家管理', module: 'player', power: "SHOW" } },
  { path: 'addPlayer', component: AddPlayerComponent, data: { title: '添加房卡', module: 'player', power: "ADD" } },
  { path: 'addPlayer/:id', component: AddPlayerComponent, data: { title: '候改房卡', module: 'player', power: "UPDATE" } },

  { path: 'system', component: SystemComponent, data: { title: '游戏设置', module: 'system', power: "SHOW" } },
  { path: 'systemLog', component: SystemLogComponent, data: { title: '系统日志', module: 'systemLog', power: "SHOW" } },

  { path: 'menu', component: MenuComponent, data: { title: '菜单管理', module: 'menu', power: "SHOW" } },
  { path: 'addMenu/:id/:type', component: AddMenuComponent, data: { title: '修改菜单', module: 'menu', power: "UPDATE" } },

  { path: '**', component: NotFindPageComponent, data: { title: '404', data: { title: '404', module: 'notPower', power: "SHOW" } } },
  { path: 'notPower', component: NotPowerComponent, data: { title: '404', data: { title: '404', module: 'notPower', power: "SHOW" } } },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

//一定要将路由加载的模块导出到home.module模块
export const ComponentList = [
  UserComponent,
  IndexComponent,
  AddUserComponent,
  UpUserPwdComponent,
  UpUserInfoComponent,
  RoleComponent,
  AddRoleComponent,
  PowerComponent,
  PowerListComponent,
  CardComponent,
  AddCardComponent,
  CardLogComponent,
  PlayerComponent,
  AddPlayerComponent,
  SystemComponent,
  SystemLogComponent,
  MenuComponent,
  AddMenuComponent
]
