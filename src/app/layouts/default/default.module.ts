import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { ListTableComponent } from 'src/app/modules/list-table/list-table.component';
import { FormsModule } from '@angular/forms';

//import angular material
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSliderModule } from '@angular/material/slider'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTreeModule } from '@angular/material/tree'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BookForCustomerDialogComponent } from 'src/app/modules/list-table/book-for-customer-dialog/book-for-customer-dialog.component';
import { BookingRequestDialogComponent } from 'src/app/modules/list-table/booking-request-dialog/booking-request-dialog.component';
import { SetTableComponent } from 'src/app/modules/set-table/set-table.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DefaultComponent,
    ListTableComponent,
    BookForCustomerDialogComponent,
    BookingRequestDialogComponent,
    SetTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
  ]
})
export class DefaultModule { }
