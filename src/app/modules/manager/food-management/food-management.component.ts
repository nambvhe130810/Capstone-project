import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { FoodService } from 'src/app/services/food.service';
import { Router } from '@angular/router';

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
  public userLocal: any;
  jsonUser: any;
  constructor(
    private foodService: FoodService,
    private buffetService: BuffetService,
    private dialog: MatDialog,
    private router: Router
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
        this.getListFood();
      }
    }
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
      this.foodService.update(e?.id, e).then(() => {
        this.getListFood();
      })
    }
  }
  update(item, status) {
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
          this.buffetService.update(e.id, e).then(() => { });
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
