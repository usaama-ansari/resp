import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataStoreService } from '../../services/data-store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RealtimeService } from '../../components/guage-banner/realtime.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-naukri-dot-com',
  templateUrl: './naukri-dot-com.component.html',
  styleUrls: ['./naukri-dot-com.component.css']
})


export class NaukriDotComComponent implements OnInit {
  FETCH_DATA_URL = this._authService.BASE_URL + 'fetch-device-data.php';
  isHomePage: boolean = false;
  deviceId: number;
  showLoader: boolean = false;
  nodes_from_backend: string[] = [];
  client_name: string = '';

  // ACCORDIAN CONFIG
  accordian_real_time_data = [];

  clientConfig = {
    clientConfigGraph: {
      url: [this.FETCH_DATA_URL],
      node: []
    },
    clientConfigGuages: {
      url: [this.FETCH_DATA_URL],
      node: []
    },
    brand: {
      backgroundImage: 'assets/naukri-bg.jpg',
      client_name: '',
      nodes: []
    }
  }

  constructor(
    private _dataStoreService: DataStoreService,
    private _httpClient: HttpClient,
    private _authService: AuthService,
    private _realtimeService: RealtimeService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetch_on_init();
      var client_data = this._dataStoreService.client_data;
      this.nodes_from_backend = client_data['nodes'];
      // for (var i = 1; i <= client_data['nodes']; i++) {
      //   let node = 'node_' + i;
      //   this.nodes_from_backend.push(node);
      // }
      this.clientConfig.clientConfigGraph.node = [this.nodes_from_backend[0]]
      this.clientConfig.clientConfigGuages.node = [this.nodes_from_backend[0]]
      this.clientConfig.brand.client_name = client_data['client_name']
      this.clientConfig.brand.nodes = this.nodes_from_backend;
      this.fetch_accordian_data();
    }

  }


  showGuageModal(index: number) {
    this.deviceId = index;
    this.clientConfig.clientConfigGraph.node = [this.nodes_from_backend[index]]
    this.clientConfig.clientConfigGuages.node = [this.nodes_from_backend[index]]
    this._realtimeService.device_changed_subject.next(); //to trigger loader & to trigger fetch_data()
    //with updated node id in guages.component.ts  
    
  }

  fetch_accordian_data() {
    this.showLoader = true;
    var url_req_3 = this.FETCH_DATA_URL + '?req-type=3&client-id=' + this._dataStoreService.client_data['client_id'];
    Observable.interval(5000).flatMap(() =>
      this._httpClient.get(url_req_3)).subscribe((response) => {
        this.showLoader = false;
        if (response['success']) {
          this.accordian_real_time_data = response['msg'];
        }
        else {
          this.accordian_real_time_data = [];
        }
      })
  }

  fetch_on_init() {
    this.showLoader = true;
    var url_req_3 = this.FETCH_DATA_URL + '?req-type=3&client-id=' + this._dataStoreService.client_data['client_id'];
    this._httpClient.get(url_req_3).subscribe((response) => {
      this.showLoader = false;
      if (response['success']) {
        this.accordian_real_time_data = response['msg'];
      }
      else {
        this.accordian_real_time_data = [];
      }
    })
  }



}
