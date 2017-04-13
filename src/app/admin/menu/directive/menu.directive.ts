import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[menuroot]' })
export class MenuDirective {
    constructor(private el: ElementRef) {

    }

    @HostListener('click') onclick() {
        this.toggle();
    }

    private toggle() {
        this.el.nativeElement.classList.toggle("icon-doc");
        let x = document.body.querySelectorAll('.tr_0');
        let index = 0;
        for (index = 0; index < x.length; index++) {
            x[index].classList.toggle("hiden");
        }
    }
}

@Directive({ selector: '[menuTrhover]' })
export class MenuTrhover{
    constructor(private el: ElementRef) {

    }

    @HostListener('mouseenter') onMouseEnter() {
        this.TrbgColor("red");        
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.TrbgColor("white");
    }

    private TrbgColor(color:string) {
       this.el.nativeElement.style.backgroundColor = color;
    }
}

