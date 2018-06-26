import { Component, OnInit } from '@angular/core';
import { JQuery } from 'jquery';

@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.css']
})
export class ChartMonthComponent implements OnInit {

  graph = 1;

  constructor() { }

  ngOnInit() {
    this.calculus()
  }

  // display graph or numbers  
  displayGraph(_graph:number){
    this.graph=_graph;
  }

  getMonth(event){
    console.log(event);
    var year = event.slice(0,4)
    Number(year)
    console.log(year)
    var month_number = event.slice(5,7)
    if(month_number.charAt(0) == 0){
      month_number = month_number.substr(1)
    }
    Number(month_number)
    console.log(month_number)

    var test = this.getWeeksInMonth(year,month_number)
    console.log(test)

    this.randomization()
  }

  calculus(){
    
      JQuery('.chart').segbar([
        {
            data: [
                {  value: 16744 },
                {  value: 6500 },
                {  value: 32750 },
                {  value: 3200 }
            ]
            },
            {
            data: [
                { title: 'Test 1', value: 6.87, color: '#8E44AD' },
                { title: 'Test 2', value: 14.56, color: '#81CFE0' },
                { title: 'Test 3', value: 7.82, color: '#EB974E' }
            ]
            },
            {
            data: [
                { title: 'Test 1', value: 10 },
                { title: 'Test 2', value: 10 },
                { title: 'Test 3', value: 20 },
                { title: 'Test 4', value: 5 },
                { title: 'Test 5', value: 30 },
                { title: 'Test 6', value: 5 },
                { title: 'Test 7', value: 20 }
            ]
        }
    ])    
  }

  randomization(){

  }

  getWeeksInMonth(month, year){
    var weeks=[],
        firstDate=new Date(year, month, 1),
        lastDate=new Date(year, month+1, 0), 
        numDays= lastDate.getDate();
    
    var start=1;
    var end=7-firstDate.getDay();
    while(start<=numDays){
        weeks.push({start:start,end:end});
        start = end + 1;
        end = end + 7;
        if(end>numDays)
            end=numDays;    
    }        
     return weeks;
 }   
 
  

}
