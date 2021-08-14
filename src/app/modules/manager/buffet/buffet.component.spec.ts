import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetComponent } from './buffet.component';

describe('BuffetComponent', () => {
  let component: BuffetComponent;
  let fixture: ComponentFixture<BuffetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
