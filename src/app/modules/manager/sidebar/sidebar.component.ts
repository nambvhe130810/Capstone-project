import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/buffet',         title: 'Buffet',             icon:'fas fa-utensils',    class: '' },
  { path: '/food',          title: 'Thực đơn',              icon:'fas fa-hamburger',      class: '' },
  { path: '/question',     title: 'Hỏi đáp',         icon:'far fa-question-circle',       class: '' },
  { path: '/user',          title: 'Người dùng',      icon:'fas fa-users',  class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  isShowMenu = true;
  public companyName : string;
  company: any;

  constructor(public router: Router) {}
  ngOnInit() {
      console.log(this.router.url);
      // this.isLogin()
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.company = localStorage.getItem("common-info");
      this.companyName =  JSON.parse(this.company).name;
  }

  isLogin() {
    if (this.router.url === '/' || this.router.url === 'login') {
      return false;
    }
    return true
  }

  logout() {
    localStorage.setItem('common-info', '');
  }

}
