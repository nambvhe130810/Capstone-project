import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReplyComponent } from './popup-reply.component';

describe('PopupReplyComponent', () => {
  let component: PopupReplyComponent;
  let fixture: ComponentFixture<PopupReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
