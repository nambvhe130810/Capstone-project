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
   
  }

  logout() {
    localStorage.setItem('common-info', '');
  }
}
