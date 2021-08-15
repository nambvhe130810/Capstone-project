import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { TablesService } from 'src/app/services/tables.service';
import { OrderService } from 'src/app/services/order.service';
import { BuffetService } from 'src/app/services/buffet.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { FoodService } from 'src/app/services/food.service';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bill-for-customer',
  templateUrl: './bill-for-customer.component.html',
  styleUrls: ['./bill-for-customer.component.css']
})
export class BillForCustomerComponent implements OnInit {
  tables = [];
  order: any;
  formatdate = 'yyyyMMdd_HHmm';
  pipe = new DatePipe('en-US');
  buffet: any;
  orderDetails = []
  foods = []
  constructor(public dialogRef: MatDialogRef<BillForCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tablesService: TablesService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private buffetService: BuffetService,
    private foodService: FoodService,

  ) { }

  ngOnInit(): void {
    this.getAllTables();
    this.getOrder();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllTables() {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tables = data;
    });
  }
  getOrder() {
    this.orderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log("orderId = ", this.data.orderId)
      console.log("listProcess = ", data)
      this.order = data.find(item => item.id == this.data.orderId)
      console.log("Order", this.order)

    });
    this.buffetService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.buffet = data.find(item => item.id == this.order.buffetId)
      console.log("buffer", this.buffet)
    });

    this.orderDetailService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log("data", data)
      this.orderDetails = data.filter(item => item.orderId == this.order.id)
      console.log("buffer", this.orderDetails)
    });
    this.foodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.orderDetails.forEach(detail => {
      let food =data.find(item => item.id == detail.foodId)
      let obj = {name:food.name,price:food.price,quantity:detail.quantity}
      this.foods.push(obj)


      })
      console.log("foods", this.foods)
    });
  }

  accept(id) {
    try {
      console.log("ProcessOrder", this.order)
      let table = this.tables.find(item => item.id == id);
      console.log("table", table)
      table.isReadyToPay = false;
      this.tablesService.update(id, table)
      this.toastr.success("Thanh toán thành công")
      this.dialogRef.close()
    } catch {
      this.toastr.error("Có lỗi khi thanh toán vui lòng thử lại")
    }
  }

}
