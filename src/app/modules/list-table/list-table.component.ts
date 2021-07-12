import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookForCustomerDialogComponent } from './book-for-customer-dialog/book-for-customer-dialog.component';
import { BookingRequestDialogComponent } from './booking-request-dialog/booking-request-dialog.component';
import { TablesService } from '../../services/tables.service';
import { map } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  tables = [];
  constructor(public dialog: MatDialog, 
      private tablesService: TablesService,
      private orderService: OrderService,
      private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAllTables();
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
  bookTableForCustomer() {
    let item = {} as any;
    item.id = new Date().getTime().toString();
    item.status = false;
    this.openBookingForm(item);
  }
  openBookingForm(item) {
    let obj = { id: item.id, phone: item.phone, name: item.name, numberOfPeople: item.numberOfPeople, tableId: item.tableId, time: item.time, status: item.status };
    const dialogRef = this.dialog.open(BookForCustomerDialogComponent, {
      width: '750px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        try {
          let table = this.tables.find(item => item.id == result.tableId);
          table.status = false;
          this.orderService.create(result).then(() => {
            this.tablesService.update(table.id, table);
            this.toastr.success('Đặt bàn cho khách thành công', 'Thông báo');
          })
        }catch(err) {
          this.toastr.error('Đặt bàn cho khách không thành công', 'Lỗi');
        }
        
      }
    }, (err)=> {
      this.toastr.error('Đặt bàn cho khách không thành công', 'Lỗi');
    });
  }
  openBookingRequestList() {
    const dialogRef = this.dialog.open(BookingRequestDialogComponent, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
      }
    });
  }
}
