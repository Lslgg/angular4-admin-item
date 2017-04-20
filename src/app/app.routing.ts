import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';

//import { AuthGuard } from './admin/common/server/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    //canActivate: [AuthGuard],
    data: {
      title: '首页'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
    ]
  },
   {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
