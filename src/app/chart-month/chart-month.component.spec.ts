import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMonthComponent } from './chart-month.component';

describe('ChartMonthComponent', () => {
  let component: ChartMonthComponent;
  let fixture: ComponentFixture<ChartMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
