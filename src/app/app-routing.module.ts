import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomePageComponent } from './modules/receptionist/home-page/home-page.component';
import { SetTableComponent } from './modules/receptionist/set-table/set-table.component';
import { UserManagementComponent } from './modules/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-table', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'list-table', component: HomePageComponent },
      { path: 'set-table', component: SetTableComponent },
      { path: 'set-table/:id', component: SetTableComponent },
      { path: 'user', component: UserManagementComponent },
    ]
  },
  
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
