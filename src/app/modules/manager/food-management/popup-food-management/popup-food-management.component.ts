import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { FoodService } from 'src/app/services/food.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-popup-food-management',
  templateUrl: './popup-food-management.component.html',
  styleUrls: ['./popup-food-management.component.css']
})
export class PopupFoodManagementComponent implements OnInit {

  typeList = [
    {code: 'food', name: 'Đồ ăn'},
    {code: 'softdrink', name: 'Đồ uống'},
    {code: 'wine ', name: 'Rượu'}
  ]
  isEdit = false;
  form: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupFoodManagementComponent>,
    private foodService: FoodService,
    private buffetService: BuffetService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.form = new FormGroup({
        name: new FormControl(this.data?.name),
        type: new FormControl(this.data?.type),
        description: new FormControl(this.data?.description),
        image: new FormControl(this.data?.image),
        calories: new FormControl(this.data?.calories),
        price: new FormControl(this.data?.price),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(null),
        type: new FormControl(null),
        description: new FormControl(null),
        image: new FormControl(null),
        calories: new FormControl(null),
        price: new FormControl(null),
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.data.name = this.form.controls["name"].value;
      this.data.type = this.form.controls["type"].value;
      this.data.description = this.form.controls["description"].value;
      this.data.image = this.form.controls["image"].value;
      this.data.calories = this.form.controls["calories"].value;
      this.data.price = this.form.controls["price"].value;

      this.foodService.update(this.data.id, this.data).then(() => {
        this.dialogRef.close(true);
      })
    } else {
      this.data = {};
      this.data.id = uuid.v4();
      this.data.status = true;
      this.data.name = this.form.controls["name"].value;
      this.data.type = this.form.controls["type"].value;
      this.data.description = this.form.controls["description"].value;
      this.data.image = this.form.controls["image"].value;
      this.data.calories = this.form.controls["calories"].value;
      this.data.price = this.form.controls["price"].value;

      this.foodService.set(this.data.id, this.data).then(() => {
        this.dialogRef.close(true);
      })
    }

  }

}
