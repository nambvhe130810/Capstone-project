import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

import { PopupRegisterComponent } from './popup-register/popup-register.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: any;
  listUser: Array<any> = [];
  searchForm: any;
  isHost = false;
  public userLocal: any;
  jsonUser: any;
  constructor(
    public router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.jsonUser = localStorage.getItem("common-info");
    console.log(this.jsonUser)
    if (this.jsonUser == '') {
      this.router.navigate(['/login'])
      return
    } else {
      this.userLocal = JSON.parse(this.jsonUser);
      console.log(this.userLocal.role)
      if (this.userLocal.role != "manager") {
        this.router.navigate(['/denied'])
      } else {
        this.searchForm = new FormGroup({
          name: new FormControl("", null),
        });
        this.getUsers();
      }
    }
  }

  getUsers() {
    let param: any = {
      searchValue: this.searchForm.value.name,
    }

    this.userService.getAll().valueChanges().subscribe(res => {
      if (this.searchForm.value.name) {
        this.listUser = res.filter(item => item.name.toLowerCase().indexOf(this.searchForm.value.name.toLowerCase()) > -1 && item.role != 'customer');
      } else {
        this.listUser = res.filter(item => item.role != 'customer');
      }
    });
    // this.userService.getAllUser(param).subscribe(res => {
    //   if (res) {
    //     this.listUser = res;
    //   }
    // })
  }

  active(e) {
    if (e) {
      e.status = true;
      this.userService.update(e?.id, e).then(() => {
        this.getUsers();
        this.toastr.success("Kích hoạt người dùng thành công");
      })
    }
  }

  delete(e) {
    if (e) {
      e.status = false;
      this.userService.update(e?.id, e).then(() => {
        this.getUsers();
        this.toastr.success("Xóa người dùng thành công");
      })
    }
  }

  openModalRegister(isEdit = false, item?) {
    let dialogRef;
    if (isEdit) {
      dialogRef = this.dialog.open(PopupRegisterComponent, {
        width: '500px',
        height: '600px',
        data: item
      });
    } else {
      dialogRef = this.dialog.open(PopupRegisterComponent, {
        width: '500px',
        height: '600px',
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

}
