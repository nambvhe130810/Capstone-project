import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { TablesService } from 'src/app/services/tables.service';
import { UserService } from 'src/app/services/user.service';
import { FloorService } from 'src/app/services/floor.service';
import { Router } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-set-table',
  templateUrl: './set-table.component.html',
  styleUrls: ['./set-table.component.css']
})
export class SetTableComponent implements OnInit {
  processOrders = [];
  processOrderDetail: any;
  tables = [];
  tableSelected: string;
  users = [];
  floors = []
  waiterId: any;
  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private tablesService: TablesService,
    private userService: UserService,
    private floorService: FloorService,
    private toastr: ToastrService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getProcessOrderDetail();
    this.getAllTablesByFloorId("c6e2aa41-ad46-45f5-889a-dc71ade4bd26");
    this.getAllWaiters()
    this.getAllFloor();
  }
  getProcessOrderDetail() {
    this.orderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.processOrders = data;
      this.activatedRoute.queryParams.subscribe(params => {
        this.processOrderDetail = this.processOrders.find(item => item.id == params.id);
        this.processOrderDetail.tableId = '';
      });
    });
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

  parstring(dateString) {
    return moment(dateString, 'YYYYMMDD_HHmm').format('HH:mm DD/MM/YYYY');
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
    console.log("waiter", waiter)
    waiter.isChecked = !waiter.isChecked;
    this.users = this.users.map(item => {
      if (item.id != waiter.id) {
        item.isChecked = false;
      }
      return item;
    })
    this.waiterId = waiter.id;
  }
  bookOrder() {
    try {
      let table = this.tables.find(item => item.isChecked == true);
      console.log("number", this.processOrderDetail.numberOfPeople)
      if(this.processOrderDetail.numberOfPeople > 8 || this.processOrderDetail.numberOfPeople<0){
        this.toastr.error('Số người không hợp lệ', 'Lỗi');
        return 
      }
      if(table==null){
        this.toastr.error('Vui lòng chọn bàn', 'Lỗi');
        return
      }
      let waiter = this.users.find(item => item.isChecked == true);
      if(waiter == null){
        this.toastr.error('Vui lòng bồi bàn', 'Lỗi');
        return 
      }
       
      let obj = { floorId: table.floorId, id: table.id, isReadyToPay: table.isReadyToPay, name: table.name, status: false }
      this.processOrderDetail.tableId = this.tableSelected;
      this.processOrderDetail.status = 'accepted';
      console.log("waiterId", this.waiterId)
      this.processOrderDetail.waiterId = this.waiterId;
      this.tablesService.update(obj.id, obj);
      this.orderService.update(this.processOrderDetail.id, this.processOrderDetail);
      this.toastr.success('Đặt bàn cho khách thành công', 'Thông báo');
      this.router.navigate(['list-table']);

    } catch (err) {
      this.toastr.error('Đặt bàn cho khách không thành công', 'Lỗi');
    }
  }
  back() {
    this.router.navigate(["/list-table"])
  }
}
