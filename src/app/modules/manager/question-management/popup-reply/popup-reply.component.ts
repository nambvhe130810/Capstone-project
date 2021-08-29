import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-popup-reply',
  templateUrl: './popup-reply.component.html',
  styleUrls: ['./popup-reply.component.css']
})
export class PopupReplyComponent implements OnInit {
  userName:String;
  answer: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupReplyComponent>,
    private communicationService: CommunicationsService,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUserName()
  }
  getUserName(){
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(this.data.userId)
      this.userName = data.find(item=>item.id==this.data.userId).name
      console.log(this.userName)
    });
  }

  reply() {
    if (this.answer == null || this.answer.trim() == '') {
      this.toastr.error("Vui lòng nhập câu trả lời");
      return
    }
    let body = this.data;
    //  {
    //   "message": this.data?.message,
    //   "messageId": this.data?.id,
    //   "messageReply": this.answer,
    //   "type": this.data?.type,
    //   "userId": this.data?.userId
    // }


    body.isReply = true;
    body.messageReply = this.answer;
    console.log(body)
    console.log(this.data)
    this.communicationService.setBySource(this.data.id, body, '/' + this.data.type).then(() => {
      this.dialogRef.close();
    });
  }

}
