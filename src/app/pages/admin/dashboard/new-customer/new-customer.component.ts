import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit, OnDestroy {

  BASE_URL: string;
  idPattern: string = '';
  node_id_array = [];
  node_id: string = '';

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
    private _adminService: AdminService
  ) { }

  ngOnInit() {
    this.BASE_URL = this._authService.BASE_URL;
  }

  ngOnDestroy() {
    this._adminService.db_menu_disp_on_nav_subject.next();
  }

  onSubmit(formData: NgForm) {
    if (this.node_id_array.length === 0) {
      alert('No device id added.Please insert atleast one.');
    } else {
      var submittableForm = {
        client_id: formData.value.client_id,
        password: formData.value.password,
        client_name: formData.value.client_name,
        nodes: this.node_id_array
      }
      this._httpClient.post(this.BASE_URL + 'create-client.php', submittableForm).subscribe((response) => {
        alert(response['msg']);
      })
    }

  }

  add_device(node_id: HTMLInputElement) {
    if (node_id.value === '') {

    } else {
      this.node_id_array.push(node_id.value);
      this.node_id = ''
    }
  }

  remove_device(id: any) {
    this.node_id_array.splice(id, 1);
  }
}
