import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'layouts-header',
    templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    Parse:any;

    constructor(@Inject("parse") parse,private router:Router) { 
        this.Parse=parse.Parse;
    }


    LogOut(){
        this.Parse.User.logOut().then(() => {
            alert("已成功退出！");
            this.router.navigate(['login']);
        });
    }

    upUserPwd(){
        this.router.navigate(['/admin/upUserPwd']);
    }

    upUserInfo(){
         this.router.navigate(['/admin/upUserInfo']);
    }

    ngOnInit() { }
}