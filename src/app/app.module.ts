import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DefaultModule } from './layouts/default/default.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './modules/manager/user-management/user-management.component';
import { PopupRegisterComponent } from './modules/manager/user-management/popup-register/popup-register.component';
import { QuestionManagementComponent } from './modules/manager/question-management/question-management.component';
import { PopupReplyComponent } from './modules/manager/question-management/popup-reply/popup-reply.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { RejectRequestComponent } from './modules/receptionist/reject-request/reject-request.component';
import { LoginComponent } from './modules/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    PopupRegisterComponent,
    QuestionManagementComponent,
    PopupReplyComponent,
    RejectRequestComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    DefaultModule,
    NgSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
