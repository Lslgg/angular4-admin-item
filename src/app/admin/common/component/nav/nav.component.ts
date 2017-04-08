import { Component, OnInit,Inject } from '@angular/core';
import { AdminMenu } from '../../module/index';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'common-nav',
    templateUrl: 'nav.html',
    styleUrls:['nav.css']
})
export class NavComponent implements OnInit {
    MenuList:Array<any>;

    Parse:any;

    constructor(@Inject("parse") parse,private router:Router) { 
        this.MenuList=AdminMenu;
        this.Parse=parse.Parse;
    }

    ngOnInit() { }

    LogOut(){
        this.Parse.User.logOut().then(() => {
            alert("成功退出！");
            this.router.navigate(['login']);
        });
    }

    upUserPwd(){
        this.router.navigate(['/admin/upUserPwd']);
    }

    upUserInfo(){
         this.router.navigate(['/admin/upUserInfo']);
    }
}