import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { FoodService } from 'src/app/services/food.service';

import { PopupFoodManagementComponent } from './popup-food-management/popup-food-management.component';

@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.css']
})
export class FoodManagementComponent implements OnInit {

  searchValue;
  listFood = [];
  listFoodDisable = []
  constructor(
    private foodService: FoodService,
    private buffetService: BuffetService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getListFood();
  }

  getListFood() {
    this.foodService.getAll().valueChanges().subscribe(res => {
      this.listFood = res.filter(e => e.status);
      this.listFoodDisable = res.filter(e => !e.status);
      console.log(this.listFoodDisable);
      if (this.listFood.length > 0 && this.searchValue) {
        this.listFoodDisable = this.listFoodDisable.filter(item => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);   
        this.listFood = this.listFood.filter(item => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      }
    })
  }

  active(e) {
    if (e) {
      e.status = true;
      this.foodService.update(e?.id, e).then(()=> {
        this.getListFood();
      })
    }
  }
  update(item,status) {
    if (status) {
      let dialogRef = this.dialog.open(PopupFoodManagementComponent, {
        width: '600px',
        height: '600px',
        data: item
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getListFood();
        }
      });
    } else {
      item.status = false;
      this.foodService.update(item.id, item).then(() => {
        this.updateBuffet(item, false);
        this.getListFood();
      })
    }
  }

  updateBuffet(item, sta) {
    this.buffetService.getAll().valueChanges().subscribe(res => {
      res.forEach(e => {
        if (e.foods[item.id] && e.status) {
          e.foods[item.id].status = sta;
          this.buffetService.update(e.id, e).then(() => {});
        }

      })
    })
  }

  openPopupFood() {
    let dialogRef = this.dialog.open(PopupFoodManagementComponent, {
      width: '600px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListFood();
      }
    });
  }

}
