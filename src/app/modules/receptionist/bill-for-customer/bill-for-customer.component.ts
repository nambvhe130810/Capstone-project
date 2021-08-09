import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { TablesService } from 'src/app/services/tables.service';
import { OrderService } from 'src/app/services/order.service';
import { BillsService } from 'src/app/services/bills.service';
import * as uuid from 'uuid';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bill-for-customer',
  templateUrl: './bill-for-customer.component.html',
  styleUrls: ['./bill-for-customer.component.css']
})
export class BillForCustomerComponent implements OnInit {
  tables = [];
  processOrderDetail: any;
  formatdate ='yyyyMMdd_HHmm';
  pipe = new DatePipe('en-US');
  constructor(public dialogRef: MatDialogRef<BillForCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tablesService: TablesService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private billsService:BillsService,
  ) { }

  ngOnInit(): void {
    this.getAllTables();
    this.getProcessOrderDetail();
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
  getProcessOrderDetail() {
    this.orderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => { 
      console.log("processOrderId = ", this.data.processOrderId)
      console.log("listProcess = ", data)
      this.processOrderDetail = data.find(item => item.id == this.data.processOrderId)
    });
  }
  accept(id) {
    try {
      console.log("ProcessOrder", this.processOrderDetail)
      let table = this.tables.find(item => item.id == id);
      console.log("table", table)
      table.isReadyToPay = false;
      this.tablesService.update(id, table)
      const now = Date.now()
      let time=this.pipe.transform(now, this.formatdate);
      let obj ={id:uuid.v4(),name:this.processOrderDetail.name,totalMoney:this.data.totalMoney,time:time}
      this.billsService.set(obj.id,obj)
      this.toastr.success("Thanh toán thành công")
      this.dialogRef.close()
    } catch {
      this.toastr.error("Có lỗi khi thanh toán vui lòng thử lại")
    }
  }

}
