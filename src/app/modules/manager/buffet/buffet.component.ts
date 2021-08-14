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

  deleteFood(item) {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      height: '200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.status = false;
        this.buffetService.setBySource(item.id, item,'/foods').then(() => {
          this.getListBuffet();
        })
      }
    });
  }

  showDetail(e) {
    for (var key in e?.foods) {
      this.listBuffetDetail.push(e.foods[key]);
    }
    // this.listBuffetDetail = e?.foods;
    this.isShowDetail = true;
  }

  openPopupBuffet(status = false,item) {
    if (status) {
      let dialogRef = this.dialog.open(PopupBuffetComponent, {
        width: '500px',
        height: '600px',
        data: item
      });
    } else {}
  }

  openPopupFood(status = false) {
      let dialogRef = this.dialog.open(PopupFoodComponent, {
        width: '1000px',
        height: '600px',
        data: this.listBuffetDetail
      });
  }

  back() {
    this.isShowDetail = false;
  }

}
