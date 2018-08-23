import { Component, OnInit, Inject ,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { DataStoreService } from '../../services/data-store.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //URL = 'http://localhost/respire_puro/fetch-device-data.php';
  FETCH_DATA_URL = this._authService.BASE_URL+'fetch-device-data.php';
  client_name: string='';
  nodes_from_backend: string[] = [];
  isHomePage: boolean = true;
  clientConfig = {
    clientConfigGraph: {
      url: [this.FETCH_DATA_URL],
      node: ['node_1']
    },
    clientConfigGuages: {
      url: [this.FETCH_DATA_URL],
      node: ['node_1']
    },
    brand: {
      backgroundImage: 'assets/blur_bg.jpg',
      client_name: 'respire puro',
      nodes: ['node_1','node_2']
    }
  }
  respiroConfig: any;
  currentDate: string = '';
  lastUpdated: string = '';
  constructor(
    public _http: HttpClient,
    private _authService: AuthService,
    private _dataStoreService: DataStoreService,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
     // var client_data = this._dataStoreService.client_data;

      // for (var i = 1; i <= client_data['nodes']; i++) {
      //   let node = 'node_' + i;
      //   this.nodes_from_backend.push(node);
      // }
   
    //  this.clientConfig.brand.client_name = client_data['client_name']

    }
  }


}




