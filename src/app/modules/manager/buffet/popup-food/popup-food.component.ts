import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-popup-food',
  templateUrl: './popup-food.component.html',
  styleUrls: ['./popup-food.component.css']
})
export class PopupFoodComponent implements OnInit {

  searchValue;
  listFood = [];
  listBuffet = [];
  existFood = this.data
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupFoodComponent>,
    private foodService: FoodService,
    private buffetService: BuffetService,
    public af: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.getListFood();
    this.getListBuffet();
  }

  getListFood() {
    this.foodService.getAll().valueChanges().subscribe(res => {
      this.listFood = res.filter(e => e.status && !this.checkExist(this.data.data, e));
      if (this.listFood.length > 0 && this.searchValue) {
        this.listFood = this.listFood.filter(item => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      }

      // this.updateStatusFood(this.listFood);
    })
  }

  checkExist(list, item) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == item.id) {
        return true;
      }
    }
    return false;
  }

  getListBuffet() {
    this.buffetService.getAll().valueChanges().subscribe(res => {
      this.listBuffet = res;
    })
  }

  updateStatusFood(list) {
    list.forEach(element => {
      let isHad = false;
      this.data.data.forEach(e => {
        if (e.id === element.id && e.status == true) {
          isHad = true;
        }
      });
      if (isHad) {
        element.exist = true;
      } else {
        element.exist = false;
      }
    });
  }

  update(item, isAdd) {
    if (isAdd) {
      this.listBuffet.forEach(e => {
        if (e.id == this.data.id && e.status == true) {
          // e.foods.push(item);
          e.foods[item.id] = item;
          this.data.data.push(item);
          this.buffetService.update(this.data.id, e)
        }
      });
    }

    this.getListFood();
  }

  save() {
    this.dialogRef.close();
  }

}
