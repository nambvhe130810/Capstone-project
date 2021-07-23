import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookForCustomerDialogComponent } from './book-for-customer-dialog/book-for-customer-dialog.component';
import { BookingRequestDialogComponent } from './booking-request-dialog/booking-request-dialog.component';
import { TablesService } from '../../services/tables.service';
import { map } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { BillService } from '../../services/bill.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  tables = [];
  bill = [];
  constructor(public dialog: MatDialog,
    private tablesService: TablesService,
    private orderService: OrderService,
    private billService: BillService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllTables(1);
    this.getAllBill()
  }
  getAllTables(floor) {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tables = data.filter(item => item.floor == floor);
    });
  }
  getAllBill() {
    this.billService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.bill = data;
    });
  }
  bookTableForCustomer() {
    let item = {} as any;
    item.id = new Date().getTime().toString();
    item.status = false;
    this.openBookingForm(item);
  }
  openBookingForm(item) {
    let obj = { id: item.id, phone: item.phone, name: item.name, numberOfPeople: item.numberOfPeople, tableId: item.tableId, status: item.status };
    const dialogRef = this.dialog.open(BookForCustomerDialogComponent, {
      width: '750px',
      data: obj
    });
  }
  openBookingRequestList() {
    const dialogRef = this.dialog.open(BookingRequestDialogComponent, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
  openBill(id) {
    console.log("this bill", this.bill)
    console.log("this bill", this.bill.find(item => item.id == id))
  }
}
