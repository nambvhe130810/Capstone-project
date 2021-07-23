import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { ProcessOrderService } from 'src/app/services/process-order.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-set-table',
  templateUrl: './set-table.component.html',
  styleUrls: ['./set-table.component.css']
})
export class SetTableComponent implements OnInit {
  processOrders = [];
  processOrderDetail: any;
  tables = [];
  tableSelected : string;
  constructor(private activatedRoute: ActivatedRoute,
    private processOrderService: ProcessOrderService,
    private tablesService: TablesService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getProcessOrderDetail();
    this.getAllTables();
  }
  getProcessOrderDetail() {
    this.processOrderService.getAll().snapshotChanges().pipe(
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
    this.tables = this.tables.map(item => {
      if(item.id != table.id) {
        item.isChecked = false;
      }
      return item;
    })
    this.tableSelected = table.id;
  }
  bookOrder() {
    try {
      let table = this.tables.find(item => item.id == this.tableSelected);
      table.status = 'busy';
      this.processOrderDetail.tableId = this.tableSelected;
      this.processOrderDetail.status = 'confirmted';
        this.tablesService.update(table.id, table);
        this.processOrderService.update(this.processOrderDetail.id, this.processOrderDetail);
        this.toastr.success('Đặt bàn cho khách thành công', 'Thông báo');
    } catch(err) {
      this.toastr.error('Đặt bàn cho khách không thành công', 'Lỗi');
    }
  }
}
