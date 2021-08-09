import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    let body = {
      "message": this.data?.message,
      "messageId": this.data?.id,
      "messageReply": this.answer,
      "type": this.data?.type,
      "userId": this.data?.userId
    }

    this.communicationService.reply(body).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
