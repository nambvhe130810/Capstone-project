import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-popup-reply',
  templateUrl: './popup-reply.component.html',
  styleUrls: ['./popup-reply.component.css']
})
export class PopupReplyComponent implements OnInit {

  answer: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupReplyComponent>,
    private communicationService: CommunicationsService
  ) { }

  ngOnInit(): void {
  }

  reply() {
    let body = this.data;
    //  {
    //   "message": this.data?.message,
    //   "messageId": this.data?.id,
    //   "messageReply": this.answer,
    //   "type": this.data?.type,
    //   "userId": this.data?.userId
    // }


    body.isReply=true;
    body.messageReply = this.answer;

    this.communicationService.setBySource(this.data.id,body, '/' + this.data.type).then(() => {
        this.dialogRef.close();
      });
  }

}
