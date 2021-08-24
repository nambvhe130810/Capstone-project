import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { Router } from '@angular/router';

import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { PopupBuffetComponent } from './popup-buffet/popup-buffet.component';
import { PopupFoodComponent } from './popup-food/popup-food.component';

@Component({
  selector: 'app-buffet',
  templateUrl: './buffet.component.html',
  styleUrls: ['./buffet.component.css']
})
export class BuffetComponent implements OnInit {

  listBuffet = [];
  listBuffetDetail = [];
  listFoodEnable = []
  listFoodDisable = []
  isShowDetail = false;
  chooseId;
  public userLocal: any;
  jsonUser: any;
  constructor(
    private buffetService: BuffetService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jsonUser = localStorage.getItem("common-info");
    console.log(this.jsonUser)
    if (this.jsonUser == '') {
      this.router.navigate(['/denied'])
      return
    } else {
      this.userLocal = JSON.parse(this.jsonUser);
      console.log(this.userLocal.role)
      if (this.userLocal.role != "manager") {
        this.router.navigate(['/denied'])
      } else {
        this.getListBuffet()
      }
    }
  }

  getListBuffet() {
    this.buffetService.getAll().valueChanges().subscribe(res => {
      this.listBuffet = res;
      this.listBuffet.forEach(e => {
        if (e.id == this.chooseId && e.status) {
          this.listBuffetDetail = [];
          for (var key in e?.foods) {
            this.listBuffetDetail.push(e.foods[key]);
          }
        }
      })
      console.log(res);
      this.listFoodEnable = this.listBuffetDetail.filter(e => e.status)
      this.listFoodDisable = this.listBuffetDetail.filter(e => !e.status)

    })
  }

  deleteRow(item) {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      height: '200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.status = false;
        this.buffetService.update(item.id, item).then(() => {
          this.getListBuffet();
        })
      }
    });
  }

  active(item) {
    item.status = true;
    this.buffetService.update(item.id, item).then(() => {
      this.getListBuffet();
    })
  }

  deleteFood(isAdd, item) {
    // let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
    //   width: '500px',
    //   height: '200px',
    //   data: {data: item, type: isAdd}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    this.listBuffet.forEach(e => {
      if (e.id == this.chooseId && e.status == true) {
          e.foods[item.id] = null;   
        this.buffetService.update(e.id, e).then(() => {
          this.getListBuffet();
        })
      }
    })
    // }
    // });
  }

  showDetail(e) {
    this.chooseId = e.id;
    this.listBuffetDetail = [];
    for (var key in e?.foods) {
      this.listBuffetDetail.push(e.foods[key]);
    }
    // this.listBuffetDetail = e?.foods;
    this.listFoodEnable = this.listBuffetDetail.filter(e => e.status)
    this.listFoodDisable = this.listBuffetDetail.filter(e => !e.status)

    this.isShowDetail = true;
  }

  openPopupBuffet(status = false, item?) {
    if (status) {
      let dialogRef = this.dialog.open(PopupBuffetComponent, {
        width: '500px',
        height: '600px',
        data: item
      });
    } else {
      let dialogRef = this.dialog.open(PopupBuffetComponent, {
        width: '1000px',
        height: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getListBuffet();
        }
      });
    }

  }

  openPopupFood(status = false) {
    let dialogRef = this.dialog.open(PopupFoodComponent, {
      width: '1000px',
      height: '600px',
      data: { data: this.listBuffetDetail, id: this.chooseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListBuffet();
    });
  }

  back() {
    this.isShowDetail = false;
  }

}
