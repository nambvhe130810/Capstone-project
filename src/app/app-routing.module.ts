import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ListTableComponent } from './modules/list-table/list-table.component';
import { SetTableComponent } from './modules/set-table/set-table.component';
import { UserManagementComponent } from './modules/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-table', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'list-table', component: ListTableComponent },
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
