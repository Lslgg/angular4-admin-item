export class Parse{
    public Parse:any;
    constructor(){
        let parse=require("parse");
        parse.initialize("myAppId"); 
        parse.serverURL = 'http://211.149.219.127:1337/parse';
        this.Parse=parse;
    }
}