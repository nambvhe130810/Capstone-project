import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { TablesService } from 'src/app/services/tables.service';
import * as uuid from 'uuid';
import { UserService } from 'src/app/services/user.service';
import { FloorService } from 'src/app/services/floor.service';


@Component({
  selector: 'app-book-for-customer-dialog',
  templateUrl: './book-for-customer-dialog.component.html',
  styleUrls: ['./book-for-customer-dialog.component.css']
})
export class BookForCustomerDialogComponent implements OnInit {
  tables = [];
  users = []
  floors = []
  myId = '';
  tableSelected = '';
  floor = "Tầng 1"
  formatdate = 'yyyyMMdd_HHmm'
  pipe = new DatePipe('en-US');
  waiterId: any;
  constructor(public dialogRef: MatDialogRef<BookForCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tablesService: TablesService,
    private orderService: OrderService,
    private userService: UserService,
    private floorService: FloorService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getAllTablesByFloorId("c6e2aa41-ad46-45f5-889a-dc71ade4bd26");
    this.getAllWaiters()
    this.getAllFloor();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllTablesByFloorId(floorId) {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tables = data.filter(item => item.floorId == floorId);
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
  onSelectedFloor(floor) {
    this.floor = this.floors.find(item => item.id == floor).name
    this.getAllTablesByFloorId(floor);
  }
  toggle(table) {
    table.isChecked = !table.isChecked;
    this.tables = this.tables.map(item => {
      if (item.id != table.id) {
        item.isChecked = false;
      }
      return item;
    })
    this.tableSelected = table.id;
  }
  getAllWaiters() {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data.map(item => { item.isChecked = false; return item; });
    });
    console.log("this user", this.users)
  }
  toggleWaiter(waiter) {
    waiter.isChecked = !waiter.isChecked;
    this.users = this.users.map(item => {
      if (item.id != waiter.id) {
        item.isChecked = false;
      }
      return item;
    })
    this.waiterId = waiter.id;
  }
  Save() {
    try {
      let table = this.tables.find(item => item.isChecked);
      if (this.data?.numberOfPeople > 8 || this.data?.numberOfPeople < 0) {
        this.toastr.error('Số người không hợp lệ', 'Lỗi');
      } else if (table == null) {
        this.toastr.error('Vui lòng chọn bàn', 'Lỗi');

      } else {
        let waiter = this.users.find(item => item.isChecked == true);
        if (waiter == null) {
          this.toastr.error('Vui lòng chọn phục vụ bàn', 'Lỗi')
        }
        else {
          let obj = { floorId: table.floorId, id: table.id, isReadyToPay: table.isReadyToPay, name: table.name, status: false }
          this.myId = uuid.v4();
          this.data.tableId = this.tableSelected;
          this.data.id = this.myId;
          this.data.status = 'accepted';
          this.data.note = '';
          this.data.userId = '';
          this.data.phone = "+84" + this.data.phone
          this.data.waiterId = this.waiterId
          const now = Date.now()
          this.data.date = this.pipe.transform(now, this.formatdate);
          this.orderService.set(this.myId, this.data).then(() => {
            this.tablesService.update(obj.id, obj);
            this.dialogRef.close(this.data);
            this.toastr.success("Đặt bàn thành công")
          })
        }
      }
    } catch {
      this.toastr.error("Đặt bàn thất bại")
    }
  }

}



