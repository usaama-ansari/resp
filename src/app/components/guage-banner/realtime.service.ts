import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RealtimeService {
  //used in naukri-dot-com
  device_changed_subject = new Subject<any>();
  // used in AQI graph component
  data_received_subject = new Subject<any>();
  constructor() { }

}
