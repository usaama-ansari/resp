import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GuagesComponent } from '../app/components/guage-banner/guages/guages.component'
import { GraphComponent } from '../app/components/guage-banner/graph/graph.component'
import { GuageBannerComponent } from './components/guage-banner/guage-banner.component';
import { NaukriDotComComponent } from './pages/naukri-dot-com/naukri-dot-com.component';
import { LoginComponent } from './pages/login/login.component';
import { IncreamentPipe } from './pipes/increament.pipe';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { DataStoreService } from './services/data-store.service';
import { AdminRoleGuardService } from './auth-guard/admin-role-guard.service';
import { ClientRoleGuardService } from './auth-guard/client-role-guard.service';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RealtimeService } from './components/guage-banner/realtime.service';
import { TimePipe } from './pipes/time.pipe';
import { HomeLoaderComponent } from './components/home-loader/home-loader.component';
import { NewCustomerComponent } from './pages/admin/dashboard/new-customer/new-customer.component';
import { EditExistingComponent } from './pages/admin/dashboard/edit-existing/edit-existing.component';

var routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent },
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [AdminRoleGuardService],
        data: {
          role: 'admin'
        },
        children: [
          { path: 'new', component: NewCustomerComponent },
          { path: 'edit', component: EditExistingComponent },
        ]
      }
    ]
  },
  {
    path: 'real-time-data', component: NaukriDotComComponent, canActivate: [ClientRoleGuardService],
    data: {
      role: 'client'
    }
  },
  { path: 'client-login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuagesComponent,
    GraphComponent,
    GuageBannerComponent,
    NaukriDotComComponent,
    LoginComponent,
    IncreamentPipe,
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    HeaderComponent,
    LoadingComponent,
    TimePipe,
    HomeLoaderComponent,
    NewCustomerComponent,
    EditExistingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    AdminRoleGuardService,
    ClientRoleGuardService,
    DataStoreService,
    RealtimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
