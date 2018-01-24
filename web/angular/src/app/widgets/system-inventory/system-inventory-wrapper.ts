import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs';

import { ActiveiqService } from '../../services/activeiq/activeiq.service'

@Injectable()
export class SystemInventoryWrapper {

    constructor(public activeiqservice:ActiveiqService) { }
}