import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';

@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrls: ['./comunication.component.css']
})
export class ComunicationComponent implements OnInit {

  answer: string;
  dataFake = [
    {
      "content": "Khách hàng không đồng ý với hoá đơn",
      "isChecked": false,
    },
    {
      "content": "Em có việc gấp cần xin nghỉ anh cử người lên thay giúp em",
      "isChecked": false,
    },
    {
      "content": "Khách hàng gây loạn tại quầy",
      "isChecked": false,
    }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ComunicationComponent>,
    private communicationService: CommunicationsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
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
  reply() {
    if (this.answer == null || this.answer.trim() == '') {
      this.toastr.error("Vui lòng nhập hoặc chọn tin nhắn");
      return
    }
    let body =
    {
      "message": this.answer,
      "id": uuid.v4(),
      "isSeen": false,
      "isReply": false,
      "isNotify": false,
      "userId": this.data?.id,
      "type": "receptionist"
    }
    console.log(body)
    try {
      this.communicationService.setBySource(body.id, body, '/' + body.type).then(() => {
        this.dialogRef.close();
      });
    } catch (e) {
      this.toastr.error("Lỗi ko gửi được");
    }
  }

}
