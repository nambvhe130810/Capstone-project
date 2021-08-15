import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFoodManagementComponent } from './popup-food-management.component';

describe('PopupFoodManagementComponent', () => {
  let component: PopupFoodManagementComponent;
  let fixture: ComponentFixture<PopupFoodManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFoodManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFoodManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
