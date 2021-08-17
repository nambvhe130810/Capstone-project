import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';

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
  isShowDetail = false;
  chooseId;
  constructor(
    private buffetService: BuffetService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getListBuffet()
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

  deleteFood(isAdd,item) {
    // let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
    //   width: '500px',
    //   height: '200px',
    //   data: {data: item, type: isAdd}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
          this.listBuffet.forEach(e => {
            if (e.id == this.chooseId && e.status == true) {
              if (isAdd) {
                e.foods[item.id].status = true;
              } else {
                e.foods[item.id].status = false;
              }
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
    this.isShowDetail = true;
  }

  openPopupBuffet(status = false,item?) {
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
        data: {data: this.listBuffetDetail, id: this.chooseId}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getListBuffet();
      });
  }

  back() {
    this.isShowDetail = false;
  }

}
