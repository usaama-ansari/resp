import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataStoreService } from '../../../services/data-store.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  BASE_URL: string;
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _authService: AuthService,
    private _dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.BASE_URL = this._authService.BASE_URL;
  }


  onSubmit(formData: NgForm) {
    this._httpClient.post(this.BASE_URL + 'admin-login.php', formData.value).subscribe((response) => {
      if (response['success']) {
        var accessToken = response['msg'];
        //first log out previously logged in user to prevent any token errors
       // this._authService.logOut();
        //store accessToken in data store and also the client data
        this._dataStoreService.storeAccessToken(accessToken);
        //decode access token to fetch client data
        this._router.navigate(['/admin/dashboard']);
      }
      else{
        alert(response['msg'])
      }
    });
  }


}

