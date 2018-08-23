import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { DataStoreService } from './data-store.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  URL = 'https://respirepuro.enggenv.com/client-login.php';
  //URL = 'http://localhost/respire_puro/client-login.php';
  BASE_URL="https://respirepuro.enggenv.com/";
  //BASE_URL="http://localhost/respire_puro/";
  constructor(
    private _httpClient: HttpClient,
    private _dataStoreService: DataStoreService,
    @Inject(PLATFORM_ID) public platformId: object
  ) {
    if (this.isAuthenticated()) {
      this._dataStoreService.restore_access_token_in_state();
    }
  }


  logIn(credentials: object) {
    return this._httpClient.post(this.URL, credentials);
  }

  logOut() {
     this._dataStoreService.logOutUser();
  }

  isAuthenticated() {
    var jwtHelper = new JwtHelper();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token_id');
      if (token === null) {
        return false;
      } else {
        return !jwtHelper.isTokenExpired(token);
      }
    }
  }


}
