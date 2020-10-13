import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsOfMenuComponent } from './meals-of-menu.component';

describe('MealsOfMenuComponent', () => {
  let component: MealsOfMenuComponent;
  let fixture: ComponentFixture<MealsOfMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsOfMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsOfMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
