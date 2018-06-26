import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPeriodComponent } from './chart-period.component';

describe('ChartPeriodComponent', () => {
  let component: ChartPeriodComponent;
  let fixture: ComponentFixture<ChartPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
