import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataStoreService } from '../services/data-store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    public _dataStoreService: DataStoreService,
    private _router: Router
  ) {

  }

  ngOnInit() {
  }


  logOut() {
    //logOut is actualy doing its work in DataStore Service in logOutUser() method
    this._authService.logOut();
    this._router.navigate(['/']);
  }


}
