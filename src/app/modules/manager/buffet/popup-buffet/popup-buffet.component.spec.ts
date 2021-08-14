import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBuffetComponent } from './popup-buffet.component';

describe('PopupBuffetComponent', () => {
  let component: PopupBuffetComponent;
  let fixture: ComponentFixture<PopupBuffetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupBuffetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupBuffetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
