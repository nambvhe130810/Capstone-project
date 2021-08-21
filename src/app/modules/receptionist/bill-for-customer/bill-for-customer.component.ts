import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { TablesService } from 'src/app/services/tables.service';
import { OrderService } from 'src/app/services/order.service';
import { BuffetService } from 'src/app/services/buffet.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { FoodService } from 'src/app/services/food.service';
import * as moment from 'moment'

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
  map = new Map()
  date: any;
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
    this.date = Date.now()
    console.log("Date", this.date)
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
  parstring(dateString) {
    return moment(dateString, 'YYYYMMDD_HHmm').format('HH:mm');
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
      let obj = { name: this.buffet.name, price: this.buffet.price, quantity: this.order.numberOfPeople }
      this.foods.push(obj)
    });

    this.orderDetailService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log("data", data)
      this.orderDetails = data.filter(item => item.orderId == this.order.id && !item.isInBuffet)
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
        let isExist = false;
        let food = data.find(item => item.id == detail.foodId)
         this.foods.map(item => {
          if (item.name == food.name) {
            console.log("item",item)
            item.quantity += detail.quantity
            isExist = true
          }
          console.log("item",item)
          return item
        })
        if (!isExist) {
          let obj = { name: food.name, price: food.price, quantity: detail.quantity }
          this.foods.push(obj)
        }
      })
      console.log("foods", this.foods)
    });
  }

  save() {
    try {
      console.log("ProcessOrder", this.order)
      let table = this.tables.find(item => item.id == this.data.tableId);
      let obj = { floorId: table.floorId, id: table.id, isReadyToPay: false, name: table.name, status: table.status }
      this.tablesService.update(obj.id, obj)
      this.order.status = 'done'
      this.orderService.update(this.order.id, this.order)
      this.toastr.success("Thanh toán thành công")
      this.dialogRef.close()
    } catch {
      this.toastr.error("Có lỗi khi thanh toán vui lòng thử lại")
    }
  }

}
