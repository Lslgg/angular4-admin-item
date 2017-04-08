import { Component, OnInit } from '@angular/core';
import { SystemLog } from '../common/module';
import { SystemLogService } from './shared/systemLog.service';

@Component({
	selector: 'systemLog',
	templateUrl: 'systemLog.html',
	providers: [SystemLogService],
})

export class SystemLogComponent implements OnInit {
	
	
	constructor() { }

	ngOnInit() {
		
	}
}