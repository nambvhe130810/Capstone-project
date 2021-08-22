import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.css']
})
export class RejectRequestComponent implements OnInit {

  dataFake = [
    {
      "content": "Xin lỗi quý khách,nhà hàng đã đến giờ đóng của",
      "isChecked": false,
    },
    {
      "content": "Xin lỗi quý khách,nhà hàng chúng tôi không đủ bàn",
      "isChecked": false,
    },
    {
      "content": "Xin lỗi quý khách,hôm nay là ngày nghỉ lễ",
      "isChecked": false,
    }
  ];
  answer: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RejectRequestComponent>,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }
  toggle(resason) {
    resason.isChecked = !resason.isChecked;
    this.dataFake = this.dataFake.map(item => {
      if (item.content != resason.content) {
        item.isChecked = false;
      }
      return item;
    })
    this.answer = resason.content
  }
  ngOnInit(): void {
  }

  reply() {
    if (this.answer == null || this.answer.trim() == '') {
      this.toastr.error("Vui lòng nhập câu trả lời hoặc chọn một trong các câu trả lời");
      return
    }
    try {
      this.data.reason = this.answer
      this.data.status = "rejected"
      this.orderService.update(this.data.id, this.data)
      this.dialogRef.close()
    } catch (error) {

    }


  }

}