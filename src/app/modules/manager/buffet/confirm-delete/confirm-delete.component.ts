import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BuffetService } from 'src/app/services/buffet.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private buffetService: BuffetService,
    private toarst: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
      this.dialogRef.close(true);
  }

}
