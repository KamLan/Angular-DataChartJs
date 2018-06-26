import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChartWeekComponent } from './chart-week/chart-week.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartMonthComponent } from './chart-month/chart-month.component';
import { ChartPeriodComponent } from './chart-period/chart-period.component';



@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartWeekComponent,
    ChartMonthComponent,
    ChartPeriodComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
