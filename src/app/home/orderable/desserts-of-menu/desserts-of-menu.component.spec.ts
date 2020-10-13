import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsOfMenuComponent } from './desserts-of-menu.component';

describe('DessertsOfMenuComponent', () => {
  let component: DessertsOfMenuComponent;
  let fixture: ComponentFixture<DessertsOfMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertsOfMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsOfMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
