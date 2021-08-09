import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';

import { PopupReplyComponent } from './popup-reply/popup-reply.component';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit {

  roleList = [
    { code: 'Chef', name: 'Đầu bếp' },
    { code: 'Customer', name: 'Khách hàng' },
    { code: 'manager', name: 'Quản lý' },
    { code: 'Receptionist', name: 'Thu ngân' },
    { code: 'Waiter', name: 'Bồi bàn' },
  ]
  listQuestionWaiter = []
  listQuestionKitchen = []
  listQuestionCustomer = []
  listQuestionReceptionist = []
  constructor(
    private dialog: MatDialog,
    private communicationService: CommunicationsService
  ) { }

  ngOnInit(): void {
    this. getListQuestion('Chef');
    this. getListQuestion('Customer');
    this. getListQuestion('Receptionist');
    this. getListQuestion('Waiter');
  }

  getListQuestion(type) {
    let isHaveData = false;
    this.communicationService.getListQuestion(type).subscribe(res => {
        isHaveData = true;
        this.handleData(res, type);
    });
    if (!isHaveData) {
      this.handleData(null, type)
    }
  }

  handleData(data, type) {
    if (data) {
      if (type == 'Chef') {
        this.listQuestionKitchen = data;
      }
      if (type == 'Customer') {
        this.listQuestionCustomer = data;
      }
      if (type == 'Waiter') {
        this.listQuestionWaiter = data;
      }
      if (type == 'Receptionist') {
        this.listQuestionReceptionist = data;
      }
    }
  }

  openModalReply(item,type) {
    item.type = type;
    let dialogRef = this.dialog.open(PopupReplyComponent, {
      width: '1000px',
      height: '350px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this. getListQuestion('Chef');
      this. getListQuestion('Customer');
      this. getListQuestion('Receptionist');
      this. getListQuestion('Waiter');
    });
  }
}
