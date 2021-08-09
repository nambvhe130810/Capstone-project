import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { TablesService } from 'src/app/services/tables.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


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
  waiterId: any;
  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private tablesService: TablesService,
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getProcessOrderDetail();
    this.getAllTables();
    this.getAllWaiters();
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

    getAllTables() {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tables = data.map(item => {item.isChecked = false ; return item;});
    });
  }
  toggle(table) {
    table.isChecked = !table.isChecked;
    this.tables = this.tables.map(item => {
      if(item.id != table.id) {
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
      this.users = data.map(item => {item.isChecked = false ; return item;});
    });
    console.log("this user", this.users)
  }
  toggleWaiter(waiter) {
    console.log("waiter",waiter)
    waiter.isChecked = !waiter.isChecked;
    this.users = this.users.map(item => {
      if(item.id != waiter.id) {
        item.isChecked = false;
      }
      return item;
    })
    this.waiterId = waiter.id;
  }
  bookOrder() {
    try {
      let table = this.tables.find(item => item.id == this.tableSelected);
      table.status = false;
      this.processOrderDetail.tableId = this.tableSelected;
      this.processOrderDetail.status = 'accepted';
      console.log("waiterId", this.waiterId)
      this.processOrderDetail.waiterId = this.waiterId;
      this.tablesService.update(table.id, table);
      this.orderService.update(this.processOrderDetail.id, this.processOrderDetail);
      this.toastr.success('Đặt bàn cho khách thành công', 'Thông báo');
      this.router.navigate(['list-table']);

    } catch (err) {
      this.toastr.error('Đặt bàn cho khách không thành công', 'Lỗi');
    }
  }
}
