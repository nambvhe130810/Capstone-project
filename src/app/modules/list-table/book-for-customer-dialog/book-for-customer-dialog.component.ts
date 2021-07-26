import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ProcessOrderService } from 'src/app/services/process-order.service';
import { TablesService } from 'src/app/services/tables.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-book-for-customer-dialog',
  templateUrl: './book-for-customer-dialog.component.html',
  styleUrls: ['./book-for-customer-dialog.component.css']
})
export class BookForCustomerDialogComponent implements OnInit {
  tables = [];
  myId = '';
  selectedTable = '';
  formatdate ='yyyyMMdd_HHmm'
  pipe = new DatePipe('en-US');
  constructor(public dialogRef: MatDialogRef<BookForCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tablesService: TablesService,
    private processOrderService: ProcessOrderService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getAllTables();
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
      this.tables = data.map(item => { item.isChecked = false; return item; });
    });
  }
  toggle(table) {
    this.selectedTable = table.id;
  }
  Save() {
    try {
      let table = this.tables.find(item => item.id == this.selectedTable);
      table.status = false;
      this.dialogRef.close(this.data);
      this.myId = uuid.v4();
      this.data.tableId = this.selectedTable;
      this.data.id = this.myId;
      this.data.status = 'confirmed';
      this.data.note ='';
      this.data.userId ='';
      this.data.phone = "+84" + this.data.phone 
      const now = Date.now()
      this.data.date=this.pipe.transform(now, this.formatdate);
      this.processOrderService.set(this.myId,this.data).then(() => {
      this.tablesService.update(table.id, table);
      this.toastr.success("Đặt bàn thành công")
      })
    } catch {
      this.toastr.error("Đặt bàn thất bại")
    }
  }

}



