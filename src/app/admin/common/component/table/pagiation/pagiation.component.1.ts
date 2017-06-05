import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'common-pagiation',
    templateUrl: 'pagiation.html'
})

export class PagiationComponent2 implements OnInit {

    @Input() pageCount: Promise<number>;
    
    @Input() pageSize: number; 

    @Output() ongetPage = new EventEmitter<number>();

    PagiationStrList: number[] = Array();

    LastNumber: number = 10; //最后页码

    LastPage: number = 0; //最后一页

    constructor() { }

    ngOnInit() {
        this.getPageCount().then((last) => {
            this.LastPage = last;
            this.setPageInfo(1);
        });
    }

    //下一页
    getPage(index) {
        this.ongetPage.emit(index);
        this.setPageInfo(index);
    }

    //设置页码
    private setPageInfo(pageIndex: number) {
        this.PagiationStrList = [];

        this.getPageCount().then((last) => {
            let pageCount = last;
            let index = pageIndex;
            let i = 1;
            let lastIndex = 10;

            //如果页码不够10页不用隐藏页面直接显示页码
            if (pageCount <= 10) {
                i = 1;
                lastIndex = pageCount;
                this.LastNumber = lastIndex;
            } else {
                //隐藏大于第五页时前面的页码
                if (index > 5) {
                    i = index - 1;
                    lastIndex += index - 2;
                    //如果是最后10页，只显示最后10页不隐藏
                    if (pageCount - index <= 10 && index > pageCount - 9) {
                        i = pageCount - 9;
                        lastIndex = pageCount;
                    }
                }
            }

            while (i <= lastIndex) {
                this.PagiationStrList.push(i);
                i += 1;
            }
        })
    }

    //获取总页数
    private getPageCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            if (this.pageCount != undefined) {
                this.pageCount.then((psize) => {
                    let sum = psize;
                    let size = this.pageSize;
                    let pageCount = parseInt((sum / size).toString());
                    pageCount += sum % size == 0 ? 0 : 1;
                    return resolve(pageCount);
                });
            }else{
                return resolve(0);
            }
        });

    }
}