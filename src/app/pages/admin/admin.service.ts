import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from '../../services/data-store.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AdminService {
  db_menu_disp_on_nav_subject: Subject<any> = new Subject();// subscribed in dashboard.component.ts

  constructor(
    private _httpClient: HttpClient,
    private _dataStoreService: DataStoreService,
    private _authService: AuthService,
  ) { }


  //fetch customer data for edit component
  fetch_customer_data() {
    return this._httpClient.get(this._authService.BASE_URL + 'client-data.php');
  }

  removeSelectedNodes(data: any) {
    return this._httpClient.post(this._authService.BASE_URL+'edit-client.php',data);
  }

  addNewNode(data: any){

    return this._httpClient.post(this._authService.BASE_URL+'add-device.php',data);
  }
}
