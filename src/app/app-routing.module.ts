import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { BuffetComponent } from './modules/manager/buffet/buffet.component';
import { FoodManagementComponent } from './modules/manager/food-management/food-management.component';
import { QuestionManagementComponent } from './modules/manager/question-management/question-management.component';
import { UserManagementComponent } from './modules/manager/user-management/user-management.component';
import { HomePageComponent } from './modules/receptionist/home-page/home-page.component';
import { SetTableComponent } from './modules/receptionist/set-table/set-table.component';
import { DeniedComponent } from './modules/denied/denied.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'list-table', component: HomePageComponent },
      { path: 'set-table', component: SetTableComponent },
      { path: 'set-table/:id', component: SetTableComponent },
      { path: 'user', component: UserManagementComponent },
      { path: 'question', component: QuestionManagementComponent },
      { path: 'buffet', component: BuffetComponent },
      { path: 'food', component: FoodManagementComponent },
      { path: 'login', component: LoginComponent },
      { path: 'denied', component: DeniedComponent },


    ]
  },

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
