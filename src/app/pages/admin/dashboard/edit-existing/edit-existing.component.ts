import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../admin.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-existing',
  templateUrl: './edit-existing.component.html',
  styleUrls: ['./edit-existing.component.css']
})
export class EditExistingComponent implements OnInit {
  showLoader: boolean = true;
  clientData: object[] = null;
  present_edit: object = null;
  deletedNodes: string[] = [];
  addDevice: boolean = false
  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit() {
    this.fetch_cust_data();
  }

  ngOnDestroy() {
    this._adminService.db_menu_disp_on_nav_subject.next();
  }

  fetch_cust_data() {
    this._adminService.fetch_customer_data().subscribe((response) => {
      this.showLoader = false;
      if (response["success"] == true) {
        this.clientData = response["msg"];
        //CONVERTING string format json to js object
        this.clientData.forEach((clientObj) => {
          clientObj['nodes'] = JSON.parse(clientObj['nodes'])
        })
      }
    })
  }

  onSelect(index: number) {
    this.deletedNodes = [];
    this.present_edit = null;
    this.present_edit = this.clientData[index];
  }

  onNodeCheck(event) {
    if (event.target.checked) {
      this.deletedNodes.push(event.target.value);
    }
    else {
      this.deletedNodes.splice(this.deletedNodes.indexOf(event.target.value),1)
    }
  }

  onNodeRemove() {
    var diff = _.difference(this.present_edit['nodes'], this.deletedNodes);
    var data = {
      client_id: this.present_edit['client_id'],
      trimmedNodes: diff
    }

    this._adminService.removeSelectedNodes(data).subscribe((response) => {
      if (response['success']) {
        this.fetch_cust_data();
        var JSONnodes = JSON.parse(response['msg']['nodes']);
        response['msg']['nodes'] = JSONnodes;
        this.present_edit = response['msg'];
        this.deletedNodes = [];
      }
    })
  }



  onAddDevice() {
    this.addDevice = true;
  }

  onFinalizeAdd(value: string) {

    if (this.present_edit['nodes'].indexOf(value) > -1) {
      alert('Duplicate device id');
    }
    else {
      this.present_edit['nodes'].push(value);
      var data = {
        client_id: this.present_edit['client_id'],
        updatedNodes: this.present_edit['nodes']
      };
      this._adminService.addNewNode(data).subscribe((response) => {
        if (response['success']) {
          this.fetch_cust_data();
          var JSONnodes = JSON.parse(response['msg']['nodes']);
          response['msg']['nodes'] = JSONnodes;
          this.present_edit = response['msg'];
        };
      });
    }
    this.addDevice = false;
  }


  onCancelAdd() {
    this.addDevice = false;
  }

}
