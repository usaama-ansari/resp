import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataStoreService } from '../services/data-store.service';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AdminRoleGuardService implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _dataStoreService: DataStoreService,
    @Inject(PLATFORM_ID) private platformId: object,
    private _router: Router
  ) {

  }


  canActivate(_actRouteSn: ActivatedRouteSnapshot): boolean {
    var tokenPayload;
    const role = _actRouteSn.data.role;

    if (isPlatformBrowser(this.platformId)) {
      const token = this._dataStoreService.accessToken;
      if (token != null && token != undefined) {
        // decode the token to get its payload
        var jwtHelper = new JwtHelper();
        tokenPayload = jwtHelper.decodeToken(token);
        if (this._authService.isAuthenticated() && tokenPayload.role === role) {
          return true;
        }
        else {
          //redirect to home page
          this.redirect_to_home_page();
          return false;
        }
      }
      else {
        this.redirect_to_home_page();
        return false;
      }

    }
    else {
      this.redirect_to_home_page();
      return false;
    }
  }

  redirect_to_home_page() {
    this._router.navigate(['/']);
  }

}
