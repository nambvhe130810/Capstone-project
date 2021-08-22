import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css']
})
export class DeniedComponent implements OnInit {
  jsonUser: any;
  userLocal: any;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.jsonUser = localStorage.getItem("common-info");
    if (this.jsonUser == '') {
      this.router.navigate(['/login'])
    } else {
      this.userLocal = JSON.parse(this.jsonUser);
    }
  }

  back() {

    console.log(this.userLocal.role)
    if (this.userLocal.role == "manager") {
      this.router.navigate(['/food'])
    } else {
      this.router.navigate(['/list-table'])
    }
  }
}
