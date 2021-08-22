import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuffetService } from 'src/app/services/buffet.service';
import { FoodService } from 'src/app/services/food.service';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';

@Component({
  selector: 'app-popup-buffet',
  templateUrl: './popup-buffet.component.html',
  styleUrls: ['./popup-buffet.component.css']
})
export class PopupBuffetComponent implements OnInit {

  title;
  image;
  description;
  price: number = 0;
  listFood = [];
  listBuffet = [];
  listChooseFood = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupBuffetComponent>,
    private foodService: FoodService,
    private buffetService: BuffetService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getListFood();
    this.getListBuffet();
  }

  getListFood() {
    this.foodService.getAll().valueChanges().subscribe(res => {
      this.listFood = res.filter(e => e.status);
    })
  }


  getListBuffet() {
    this.buffetService.getAll().valueChanges().subscribe(res => {
      this.listBuffet = res;
    })
  }

  checkExist(item) {
    if (this.listChooseFood.length <= 0) return false;
    else {
      for (var i = 0; i < this.listChooseFood.length; i++) {
        if (this.listChooseFood[i].id == item.id) {
          return true;
        }
      }
      return false;
    }
  }

  update(e, f) {
    if (f) {
      this.listChooseFood.push(e);
    } else {
      this.listChooseFood = this.listChooseFood.filter(i => i.id != e.id)
    }
  }

  save() {
    // this.myId = uuid.v4();
    if (this.title ==null||this.title?.trim() == '') {
      this.toastr.error('Vui lòng nhâp tên buffet');
      return
    }
    if (this.price == null) {
      this.toastr.error('Vui lòng nhâp giá');
      return
    }
    if (this.image ==null||this.image?.trim() == '') {
      this.toastr.error('Vui lòng thêm đường link ảnh');
      return
    }
    if (this.price <= 0) {
      this.toastr.error('Vui lòng nhâp giá hợp lệ');
      return
    }
    let idv4 = uuid.v4
    let newBuffet = {
      id: idv4,
      description: this.description ?? '',
      price: this.price ?? 0,
      image: this.image,
      status: true,
      name: this.title ?? '',
      foods: {}
    }

    this.listChooseFood.forEach(e => {
      newBuffet.foods[e.id] = e;
    })

    this.buffetService.set(idv4, newBuffet).then(() => {
      this.dialogRef.close(true);
    })
  }
}
