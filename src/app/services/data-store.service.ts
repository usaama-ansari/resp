import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class DataStoreService {

  accessToken: string;
  isLoggedIn: boolean = false;
  client_data: object = {};
  role: string = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router
  ) {

  }


  storeAccessToken(accessToken) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token_id', accessToken);
      this.accessToken = accessToken;
      this.isLoggedIn = true;
      this.decodeAccessToken(accessToken).then(() => {

      }).catch(() => { })
    }
  }

  logOutUser() {
    this.isLoggedIn = false;
    this.role = null;
    this.client_data = {};
    this.accessToken = '';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token_id');
    }
   
  }


  restore_access_token_in_state() {
    if (isPlatformBrowser(this.platformId)) {
      var accessToken = localStorage.getItem('token_id');
      this.accessToken = accessToken;
      this.isLoggedIn = true;
      this.decodeAccessToken(accessToken).then(() => {

      }).catch(() => {
      })

    }
  }

  decodeAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        var jwtHelper = new JwtHelper();
        var decodedToken = jwtHelper.decodeToken(accessToken);
        //check for admin or client data
        if (decodedToken['client_data']) {
          this.client_data = decodedToken['client_data'];
        }
        this.role = decodedToken['role'];
        resolve();
      }
      catch (err) {
        reject()
      }
    });
  }




}
