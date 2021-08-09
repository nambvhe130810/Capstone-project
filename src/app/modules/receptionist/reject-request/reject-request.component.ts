import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
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
  ) { }
  toggle(resason){
    resason.isChecked = !resason.isChecked;
    this.dataFake = this.dataFake.map(item => {
      if(item.content != resason.content) {
        item.isChecked = false;
      }
      return item;
    })
    this.answer = resason.content
  }
  ngOnInit(): void {
  }

  reply() {

   try {
     this.data.reason =  this.answer
     this.data.status = "rejected"
     this.orderService.update(this.data.id,this.data)
     this.dialogRef.close()
   } catch (error) {
     
   }

    
  }

}