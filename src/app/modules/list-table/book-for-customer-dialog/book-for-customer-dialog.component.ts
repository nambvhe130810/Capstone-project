import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-book-for-customer-dialog',
  templateUrl: './book-for-customer-dialog.component.html',
  styleUrls: ['./book-for-customer-dialog.component.css']
})
export class BookForCustomerDialogComponent implements OnInit {
  tables = [];
  constructor( public dialogRef: MatDialogRef<BookForCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tablesService: TablesService,
    ) { }

  ngOnInit(): void {
    this.getAllTables();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllTables() {
    this.tablesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tables = data.map(item => {item.isChecked = false; return item;});
    });
  }
  toggle(table) {
    table.isChecked = !table.isChecked;
    this.tables = this.tables.map(item => {
      if(item.id != table.id) {
        item.isChecked = false;
      }
      return item;
    })
    console.log("event: ", table);
    this.data.tableId = table.id;
  }
  Save() {
    this.dialogRef.close(this.data);
  }
}
