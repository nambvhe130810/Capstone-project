import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { OrderService } from '../../../services/order.service';
import { RejectRequestComponent } from '../reject-request/reject-request.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'

@Component({
  selector: 'app-booking-request-dialog',
  templateUrl: './booking-request-dialog.component.html',
  styleUrls: ['./booking-request-dialog.component.css']
})
export class BookingRequestDialogComponent implements OnInit {
  processOrders = [];
  processOrderDetail: any;

  constructor(public dialogRef: MatDialogRef<BookingRequestDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllProcessOrder();
  }
  getAllProcessOrder() {
    this.orderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.processOrders = data;     
    });
  }
  parstring(dateString){
    var momentVariable = moment(dateString, 'yyyyMMdd_HHmm');
    console.log("moment", momentVariable)
    console.log("time" ,momentVariable.format('dd/MM/yyyy HH:mm'))
    return momentVariable.format('dd/MM/yyyy HH:mm');
  }
  chooseTable(id) {
    this.router.navigate(['/set-table'], { relativeTo: this.route, queryParams: { id: id }, replaceUrl: true }).then(val => {
      this.dialogRef.close();
    });

  }
  rejectTable(id) {
    try {
      this.processOrderDetail = this.processOrders.find(item => item.id == id);
      const dialogRef = this.dialog.open(RejectRequestComponent, {
        width: '750px',
        data: this.processOrderDetail
      });

    } catch (err) {
    }
  }
}
