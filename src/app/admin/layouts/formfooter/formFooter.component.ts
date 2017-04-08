import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'common-formFooter',
    template: `
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10" style="text-align:right;">
                <span class="label label-warning">日期:{{currentDate}}</span>
                <span class="label label-info">用户:{{currentUserName}}</span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-10 col-md-offset-2">
                <button class="btn btn-sm btn-danger" type="button" (click)="back()"><i class="fa fa-ban"></i> 返回</button>
                <button class="btn btn-sm btn-primary" type="submit"><i class="fa fa-dot-circle-o"></i> {{ submitValue }}</button>
            </div>
        </div>
    `
})
export class FormFooterComponent {

    currentUserName: string = "--";

    currentDate: string = new Date().toLocaleDateString();

    @Input() submitValue: string;

    @Output() onBack = new EventEmitter<void>();

    constructor(@Inject("parse") parse, private router: Router) {
        let user = parse.Parse.User.current();
        if (user == null) {
            alert("请登录系统！！");
            this.router.navigate(['login']);
        }
        this.currentUserName = user.get("username");
    }

    back() {
        this.onBack.emit();
    }
}