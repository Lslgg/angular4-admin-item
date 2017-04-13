import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { IndexComponent } from './index/index';
import { UserComponent, AddUserComponent, UpUserPwdComponent, UpUserInfoComponent } from './user';
import { RoleComponent, AddRoleComponent } from './role';
import { CardComponent, AddCardComponent } from './card';
import { PowerComponent } from './power';
import { CardLogComponent } from './cardLog';
import { PlayerComponent, AddPlayerComponent } from './player';
import { SystemComponent } from './system';
import { SystemLogComponent } from './systemLog';
import { MenuComponent, AddMenuComponent } from './menu';



const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: '首页' } },
  { path: 'index', component: IndexComponent , data: { title: '首页' }},
  { path: 'user', component: UserComponent , data: { title: '用户管理' }},
  { path: 'addUser', component: AddUserComponent,data: { title: '添加用户' } },
  { path: 'addUser/:id', component: AddUserComponent,data: { title: '修改用户' }  },
  { path: 'upUserPwd', component: UpUserPwdComponent,data: { title: '修改密码' }  },
  { path: 'upUserInfo', component: UpUserInfoComponent,data: { title: '用户信息' }  },
  { path: 'role', component: RoleComponent,data: { title: '角色管理' }  },
  { path: 'addRole', component: AddRoleComponent,data: { title: '添加角色' }  },
  { path: 'addRole/:id', component: AddRoleComponent,data: { title: '修改角色' }  },
  { path: 'power', component: PowerComponent,data: { title: '权限管理' }  },
  { path: 'card', component: CardComponent ,data: { title: '房卡管理' } },
  { path: 'addCard', component: AddCardComponent,data: { title: '添加房卡' }  },
  { path: 'addCard/:id', component: AddCardComponent,data: { title: '修改房卡' }  },
  { path: 'cardLog', component: CardLogComponent,data: { title: '房卡日志' }  },
  { path: 'player', component: PlayerComponent,data: { title: '玩家管理' }  },
  { path: 'addPlayer', component: AddPlayerComponent,data: { title: '添加房卡' }  },
  { path: 'addPlayer/:id', component: AddPlayerComponent,data: { title: '候改房卡' }  },
  { path: 'system', component: SystemComponent,data: { title: '游戏设置' }  },
  { path: 'systemLog', component: SystemLogComponent,data: { title: '系统日志' }  },
  { path: 'menu', component: MenuComponent,data: { title: '菜单管理' }  },
  { path: 'addMenu', component: AddMenuComponent,data: { title: '添加菜单' }  },
  { path: 'addMenu/:id', component: AddMenuComponent,data: { title: '修改菜单' }  },  
  { path: '**', component: IndexComponent,data: { title: '404' }  },
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
