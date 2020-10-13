import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMenusComponent } from './weekly-menus.component';

describe('WeeklyMenusComponent', () => {
  let component: WeeklyMenusComponent;
  let fixture: ComponentFixture<WeeklyMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
