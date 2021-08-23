import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';
import { Router } from '@angular/router';
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

  dataFakeWaiter = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Em xin mẫu đơn nghỉ việc.",
      "userId": "1"
    },
    {
      "id": "4",
      "isSeen": false,
      "message": "Khách quá đông, không phục vụ kịp",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Bàn số 30 đã ngồi quá hơn 3 tiếng",
      "userId": "1"
    },
    {
      "id": "3",
      "isSeen": false,
      "message": "Có chuột ở trong kho",
      "userId": "1"
    },
  ];
  dataFakeKitchen = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Chảo không còn chống dính.",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Toàn bộ muối đã hết hạn",
      "userId": "1"
    },
    {
      "id": "3",
      "isSeen": false,
      "message": "Cần thêm nhân viên nấu món Pháp",
      "userId": "1"
    },
  ];
  dataFakeCustomer = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Nhân viên Nguyễn A phục vụ kém",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Món Pháp quá mặn",
      "userId": "1"
    },
  ];
  dataFakeReceptionist = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Máy in hóa đơn hỏng",
      "userId": "1"
    },
    {
      "id": "1",
      "isSeen": false,
      "message": "Khách yêu cầu thanh toán bằng tài khoản nước ngoài",
      "userId": "1"
    },
  ];
  public userLocal: any;
  jsonUser: any;
  constructor(
    private dialog: MatDialog,
    private communicationService: CommunicationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jsonUser = localStorage.getItem("common-info");
    console.log(this.jsonUser)
    if (this.jsonUser == '') {
      this.router.navigate(['/denied'])
      return
    } else {
      this.userLocal = JSON.parse(this.jsonUser);
      console.log(this.userLocal.role)
      if (this.userLocal.role != "manager") {
        this.router.navigate(['/denied'])
      } else {
        this.getListQuestion('chef');
        this.getListQuestion('customer');
        this.getListQuestion('receptionist');
        this.getListQuestion('waiter');
      }
    }
  }

  getListQuestion(type) {
    let isHaveData = false;
    this.communicationService.getBySource('/' + type).subscribe(res => {
      isHaveData = true;
      this.handleData(res, type);
    });
    // this.communicationService.getListQuestion(type).subscribe(res => {
    //     isHaveData = true;
    //     this.handleData(res, type);
    // });
    if (!isHaveData) {
      this.handleData(null, type)
    }
  }

  handleData(data, type) {
    if (data) {
      if (type == 'chef') {
        this.listQuestionKitchen = data.filter(e => !e.isReply);
      }
      if (type == 'customer') {
        this.listQuestionCustomer = data.filter(e => !e.isReply);
      }
      if (type == 'waiter') {
        this.listQuestionWaiter = data.filter(e => !e.isReply);
      }
      if (type == 'receptionist') {
        this.listQuestionReceptionist = data.filter(e => !e.isReply);
      }
    }
  }

  openModalReply(item, type) {
    item.type = type;
    let dialogRef = this.dialog.open(PopupReplyComponent, {
      width: '1000px',
      height: '350px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListQuestion('chef');
      this.getListQuestion('customer');
      this.getListQuestion('receptionist');
      this.getListQuestion('waiter');
    });
  }
}
