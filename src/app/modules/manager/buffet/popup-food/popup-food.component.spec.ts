import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFoodComponent } from './popup-food.component';

describe('PopupFoodComponent', () => {
  let component: PopupFoodComponent;
  let fixture: ComponentFixture<PopupFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
