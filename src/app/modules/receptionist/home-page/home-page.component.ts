import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookForCustomerDialogComponent } from '../book-for-customer-dialog/book-for-customer-dialog.component';
import { BookingRequestDialogComponent } from '../booking-request-dialog/booking-request-dialog.component';
import { TablesService } from '../../../services/tables.service';
import { FloorService } from '../../../services/floor.service';
import { map } from 'rxjs/operators';
import { BillsService } from '../../../services/bills.service';
import { ToastrService } from 'ngx-toastr';
import { BillForCustomerComponent } from '../bill-for-customer/bill-for-customer.component';
import { AutofillMonitor } from '@angular/cdk/text-field';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  tables = [];
  bills = [];
  floors = [];
  tablesInFloors = []
  billSelected: any;
  tableFree: any;
  tableFreeByFloor: any;
  allTable: any;
  allTableByFloor: any;
  floor = "1";
  user: any;
  constructor(public dialog: MatDialog,
    private tablesService: TablesService,
    private billService: BillsService,
    private toastr: ToastrService,
    private floorService: FloorService
  ) { }

  ngOnInit(): void {
    this.getAllTablesByFloorId("c6e2aa41-ad46-45f5-889a-dc71ade4bd26");
    this.getAllBill();
    this.getAllFloor();
  }
  getAllTablesByFloorId(floorId) {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.allTable = data.length
      this.tableFree = data.filter(item => item.status).length
      this.tables = data.filter(item => item.floorId == floorId);
      this.allTableByFloor = this.tables.length
      this.tableFreeByFloor = this.tables.filter(item => item.status).length
      console.log("free table", this.tableFree, this.tableFreeByFloor)
      this.user = localStorage.getItem("userId")
      console.log("user",this.user)
    });
  }
  getAllFloor() {
    this.floorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.floors = data;
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
      this.bills = data;
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
      maxHeight: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
  openBill(id, tableName) {
    this.billSelected = this.bills.find(item => item.id == id)
    this.billSelected.tableName = tableName
    this.billSelected.floor = this.floor
    console.log("this bill", this.billSelected)
    const dialogRef = this.dialog.open(BillForCustomerComponent, {
      width: '750px',
      height: '700px',
      data: this.billSelected
    });

  }
  onSelectedFloor(floor) {
    this.floor = this.floors.find(item => item.id == floor).name
    this.getAllTablesByFloorId(floor);
  }
}
