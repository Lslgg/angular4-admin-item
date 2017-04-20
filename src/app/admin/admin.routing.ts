import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './common/server/auth-guard.service';

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



const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AuthGuard], data: { title: '首页' } },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard], data: { title: '首页' } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { title: '用户管理' } },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard], data: { title: '添加用户' } },
  { path: 'addUser/:id', component: AddUserComponent, canActivate: [AuthGuard], data: { title: '修改用户' } },
  { path: 'upUserPwd', component: UpUserPwdComponent, canActivate: [AuthGuard], data: { title: '修改密码' } },
  { path: 'upUserInfo', component: UpUserInfoComponent, canActivate: [AuthGuard], data: { title: '用户信息' } },
  { path: 'role', component: RoleComponent, canActivate: [AuthGuard], data: { title: '角色管理' } },
  { path: 'addRole', component: AddRoleComponent, canActivate: [AuthGuard], data: { title: '添加角色' } },
  { path: 'addRole/:id', component: AddRoleComponent, canActivate: [AuthGuard], data: { title: '修改角色' } },
  { path: 'power', component: PowerComponent, canActivate: [AuthGuard], data: { title: '设置权限' } },
  { path: 'powerList', component: PowerListComponent, canActivate: [AuthGuard], data: { title: '权限列表' } },
  { path: 'card', component: CardComponent, canActivate: [AuthGuard], data: { title: '房卡管理' } },
  { path: 'addCard', component: AddCardComponent, canActivate: [AuthGuard], data: { title: '添加房卡' } },
  { path: 'addCard/:id', component: AddCardComponent, canActivate: [AuthGuard], data: { title: '修改房卡' } },
  { path: 'cardLog', component: CardLogComponent, canActivate: [AuthGuard], data: { title: '房卡日志' } },
  { path: 'player', component: PlayerComponent, canActivate: [AuthGuard], data: { title: '玩家管理' } },
  { path: 'addPlayer', component: AddPlayerComponent, canActivate: [AuthGuard], data: { title: '添加房卡' } },
  { path: 'addPlayer/:id', component: AddPlayerComponent, canActivate: [AuthGuard], data: { title: '候改房卡' } },
  { path: 'system', component: SystemComponent, canActivate: [AuthGuard], data: { title: '游戏设置' } },
  { path: 'systemLog', component: SystemLogComponent, canActivate: [AuthGuard], data: { title: '系统日志' } },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], data: { title: '菜单管理' } },
  { path: 'addMenu/:id/:type', component: AddMenuComponent, canActivate: [AuthGuard], data: { title: '修改菜单' } },
  { path: '**', component: IndexComponent, canActivate: [AuthGuard], data: { title: '404' } },
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
