import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { RealtimeService } from './realtime.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-guage-banner',
  templateUrl: './guage-banner.component.html',
  styleUrls: ['./guage-banner.component.css'],

})
export class GuageBannerComponent implements OnInit, OnDestroy {
  @Input() homePage: boolean;
  @Input() clientConfigReceived: any // dynamic statistical data bound to external data source in client specific page
  nodes: string[] = []; // array of classrooms
  node_selected: { node_id: string };
  node_index: number;
  device_changed_subscription: Subscription;
  data_received_subscription: Subscription;
  showLoader: boolean = false;
  @Input() deviceId: number;
  constructor(
    public _http: HttpClient,
    private _realtimeService: RealtimeService
  ) {
  }

  ngOnInit() {
    this.nodes = this.clientConfigReceived['brand'].nodes;
    this.node_selected = { node_id: this.nodes[0] }
    //triggered in guages.component.ts
    // this.device_changed_subscription = this._realtimeService.device_changed_subject.subscribe(() => {
    //  // this.showLoader = true;
    // });
     //triggered in guages.component.ts
    // this.data_received_subscription = this._realtimeService.data_received_subject.subscribe((data) => {
    //  // this.showLoader = false;
    // })
    //to listen for DATA received Subject dispatched in guages.component.ts
    //to hide loader set in change_CR() method
  }

  ngOnDestroy() {
   // this.device_changed_subscription.unsubscribe();
  }

  // change_CR(plus_minus: number) {
  //   //change classroom
  //   if (this.node_selected.index === 0 && plus_minus === -1) {
  //     plus_minus = this.nodes.length - 1;
  //   } else if (this.node_selected.index === (this.nodes.length - 1) && plus_minus === 1) {
  //     plus_minus = -(this.nodes.length - 1);
  //   }
  //   //assign node_selected object as per the selection
  //   this.node_selected = {
  //     node_id: this.nodes[this.node_selected.index + plus_minus],
  //     index: this.node_selected.index + plus_minus
  //   }

  //   //### Assign node selected in the clientConfig 'node' property
  //   //use Subject to inform guagesComponent of the "node" change, to reinitiate http request to db
  //   this.clientConfigReceived.clientConfigGraph.node[0] = this.node_selected.node_id;
  //   this.clientConfigReceived.clientConfigGuages.node[0] = this.node_selected.node_id;
  //   //http request to the php page 
  //   this._realtimeService.device_changed_subject.next(true);
  // }

  change_CR(device: string) {
    //assign node_selected object as per the selection
    this.node_selected = {
      node_id: device
    }
    //### Assign node selected in the clientConfig 'node' property
    //use Subject to inform guagesComponent of the "node" change, to reinitiate http request to db
    this.clientConfigReceived.clientConfigGraph.node[0] = this.node_selected.node_id;
    this.clientConfigReceived.clientConfigGuages.node[0] = this.node_selected.node_id;
    //http request to the php page 
    this._realtimeService.device_changed_subject.next(true);
  }

  // will be send only once per page load
  send_http_AQI_data_request() {

  }

  // will be send only once per page load
  send_per_parameter_week_data_request() {

  }

  // will be send at regular intervals
  send_reqular_polling_request() {

  }

  // method call withh http to load all data as per the classromm selected
  send_http_cr_request(db_name: string, node_id: string) {
  }



}











