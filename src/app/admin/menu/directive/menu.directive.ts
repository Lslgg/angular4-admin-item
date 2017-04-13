import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[menuroot]' })
export class MenuDirective {
    constructor(private el: ElementRef) {

    }

    @HostListener('click') onclick() {
        let className=this.el.nativeElement.className;
        let id=this.el.nativeElement.id;
        let isopen="fa fa-folder-open"==className;
        this.toggle(isopen,id);
    }

    private toggle(isopen:boolean,id:string) {
        let nowEl=this.el.nativeElement.classList;
        if(isopen){
            nowEl.remove("fa-folder-open");
            nowEl.add("fa-folder"); 
        }else{
            nowEl.add("fa-folder-open");
            nowEl.remove("fa-folder"); 
        }

        let menuList = document.body.querySelectorAll('.menu_'+id);
        
        let index = 0;
        for (index; index < menuList.length; index++) {
            menuList[index].classList.toggle("hiden");
        }
    }
}

@Directive({ selector: '[menuhover]' })
export class MenuTrhover{
    constructor(private el: ElementRef) {

    }

    @HostListener('mouseenter') onMouseEnter() {
        this.TrbgColor("#efeffe");        
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.TrbgColor("white");
    }

    private TrbgColor(color:string) {
       this.el.nativeElement.style.backgroundColor = color;
    }
}

