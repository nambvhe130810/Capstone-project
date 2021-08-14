import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-popup-food',
  templateUrl: './popup-food.component.html',
  styleUrls: ['./popup-food.component.css']
})
export class PopupFoodComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupFoodComponent>,
    private foodService: FoodService
    ) { }

  ngOnInit(): void {
  }

}
