import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BuffetService } from './services/buffet.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CapstoneProject';
  items: any;
  constructor(private buffetService: BuffetService) {
    
  }
  ngOnInit(): void {
    this.buffetService.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({ key: c.payload.key, ...c.payload.val() }) ))
    ).subscribe(data => {
      this.items = data;
    })
  }
}
