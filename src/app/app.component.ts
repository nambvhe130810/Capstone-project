import { Component } from '@angular/core';
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
  constructor() {
    
  }
  ngOnInit(): void {
  }
}
