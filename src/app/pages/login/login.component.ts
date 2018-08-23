import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DataStoreService } from '../../services/data-store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
showLoader: boolean = false;
  constructor(
    private _authService: AuthService,
    private http:HttpClient,
    private _dataStoreService: DataStoreService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {

  }

  onFormSubmit(formData: NgForm) {
    this.showLoader = true;
    var credentials = formData.value;
    this._authService.logIn(credentials).subscribe((response) => {
    this.showLoader = false;
      if (response['success']) {
        var accessToken = response['msg'];
        //first log out previously logged in user if any, to prevent any errors
        this._authService.logOut()
        //store accessToken in data store and also the client data
        this._dataStoreService.storeAccessToken(accessToken);
        //decode access token to fetch client data
        this._dataStoreService.decodeAccessToken(accessToken).then(() => {
          this._router.navigate(['/real-time-data']);
        }).catch(() => {

        });
      }
      else{
        alert(response['msg']);
      }
    },
  (err)=>{
    this.showLoader=false;
    alert('some error occured')
  }
  )

  }


}
