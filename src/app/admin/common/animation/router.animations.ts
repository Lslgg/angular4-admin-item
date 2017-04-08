import { trigger, state, animate, style, transition } from '@angular/core';

export const routeAnimation = trigger('routeAnimation', [

  /***
  state('*', style({ transform: 'translateX(0)', opacity: 1 })),
  transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(300)
  ]),
  transition('* => void',  [
      style({transform: 'translateX(-100%)'}),
      animate(300)
    ])
  */
]);

export const routerHost = {
  
  '[@routeAnimation]': 'true',
  '[style.display]': "'block'",
  '[style.position]': "'absolute'",
  '[style.width]': "'100%'", 
  
}
