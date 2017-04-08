import { Injectable, Inject } from '@angular/core';
import { User } from '../../common/module/index';

@Injectable()
export class CardService {

    Parse: any;

    constructor(@Inject("parse") parse) {
        this.Parse = parse.Parse;
    }
}