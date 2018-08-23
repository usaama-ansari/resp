import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  db_menu_disp_subscription: Subscription;
  showMenu: boolean = true;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService
  ) {

  }

  ngOnInit() {
    this.db_menu_disp_subscription = this._adminService.db_menu_disp_on_nav_subject.subscribe(() => {
      this.showMenu = true;
    })
    this.showMenu = this._router.url === "/admin/dashboard/new" || this._router.url === "/admin/dashboard/edit" ? false : true
  }

  ngOnDestroy() {
    this.db_menu_disp_subscription.unsubscribe()
  }

  onRouting(route: string) {
    this.showMenu = false;
    this._router.navigate([route], { relativeTo: this._activatedRoute });
  }



}
