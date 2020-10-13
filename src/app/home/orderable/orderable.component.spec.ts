import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderableComponent } from './orderable.component';

describe('OrderableComponent', () => {
  let component: OrderableComponent;
  let fixture: ComponentFixture<OrderableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
