import { Component, OnInit, AfterViewInit, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Chart } from 'chart.js';
import { labels } from 'chartjs-plugin-datalabels';
import { zoom } from 'chartjs-plugin-zoom';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

var chartjsPluginDatalabels = require("chartjs-plugin-datalabels")

@Component({
  selector: 'app-chart-week',
  templateUrl: './chart-week.component.html',
  styleUrls: ['./chart-week.component.css']
})
export class ChartWeekComponent implements OnInit {

  constructor() { }

  canvas: any;
  ctx: any;
  graph:number = 1;
  myChart;
  myChart2;
  myChart3;

  arrayJourSemaines;
  arrayDCAjours;
  arrayDCCjours;
  arrayDPjours;

  CAtotal;
  ClientTotal;
  PanierTotal;
  CAtotalVar;
  ClientTotalVar;
  PanierTotalVar;

  tabCANFtotalcur
  tabCAFidtotalcur 
  tabClientTotalPreNF 
  tabClientTotalPreFid 

  data = require('../../assets/data.json');


  // display graph or numbers  
  displayGraph(_graph:number){
    this.graph=_graph;
  }

  // getDateRangeOfWeek(weekNo){
  //   var d1 = new Date();
  //   var numOfdaysPastSinceLastMonday = eval(d1.getDay()- 1);
  //   d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
  //   var weekNoToday = d1.getWeek();
  //   var weeksInTheFuture = eval( weekNo - weekNoToday );
  //   d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
  //   var rangeIsFrom = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear();
  //   d1.setDate(d1.getDate() + 6);
  //   var rangeIsTo = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear() ;
  //   return rangeIsFrom + " to "+rangeIsTo;
  // };

  // getWeek = function() {
  //   var onejan = new Date(this.getFullYear(),0,1);
  //   return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  // }

  calculusWeek(){

    var CANFpre = [null, "557", "569", "472", "358", "822", "603", "215" ]
    var CAfidpre = [null, "626", "578", "469", "605", "720", "735", "329" ]
    var CAfidcur = [null, "115", "70", "259", "162", "388", "247", "391" ]
    var CANFcur = [null, "66", "323", "151", "91", "130", "390", "162"]
    var ClientPreNF = [null, "323", "399", "265", "231", "313", "207", "70"]
    var ClientPreFid = [null, "77", "44", "54", "23", "44", "72", "11"]
    var ClientCurNF = [null, "314", "396", "351", "223", "250", "258", "52"]
    var ClientCurFid = [null, "71", "40", "80", "34", "18", "65", "16"]
    var PanierPre = [null, "8.4", "12.3", "6.9", "14.4", "7.5", "18.6", "8"]
    var PanierCur = [null, "5.6", "7.8", "14.5", "5.8", "12.3", "20.5", "6.7"]
    var tabCANFtotalcur = ["25678" ]
    var tabCAFidtotalcur = ["2407" ]
    var tabClientTotalPreNF = ["1178" ]
    var tabClientTotalPreFid = ["164" ]

    this.CAtotal = "28678";
    this.ClientTotal = "1325";
    this.PanierTotal = "10,4";
    this.CAtotalVar = "-15";
    this.ClientTotalVar = "2";
    this.PanierTotalVar = "-1,5";

    this.arrayJourSemaines=["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    this.arrayDCAjours=[["557","10"],["569","-5"],["472","12"],["358","6"],["822","-2"],["603","15"],["215","-3"]];
    this.arrayDCCjours=[["323","24"],["399","-30"],["265","14"],["231","25"],["313","-6"],["207","-10"],["70","5"]];
    this.arrayDPjours=[["8.4","0.5"],["12.3","-2"],["6.9","12"],["14.4","6"],["7.5","-3"],["18.6","7"],["8","4"]];

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
          datasets: [{
              label: 'CA NF prec year',
              data: CANFpre,
              backgroundColor: [
                'rgba(255, 99, 132, 0)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
            ],
              borderWidth: 1
          },
          {
            label: 'CA Fid prec year',
            data: CAfidpre,
            backgroundColor: [
              'rgba(255, 206, 86, 0)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
          ],
            borderWidth: 1
        },
          {
              label: "CA Fid cur year",
              data: CAfidcur,
              backgroundColor: [
                'rgba(54, 162, 235, 0)',

              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                
            ],
              borderWidth: 1
          },
          {
            label: "CA NF cur year ",
            data: CANFcur,
            backgroundColor: [
              'rgba(75, 192, 192, 0)',

            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              
          ],
            borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Comparaison des CA'
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        plugins: {
					datalabels: {
						backgroundColor: function(context) {
							return context.hovered ? context.dataset.backgroundColor : 'white';
						},
						borderColor: function(context) {
							return context.dataset.backgroundColor;
						},
						borderRadius: 16,
						borderWidth: 1,
						color: function(context) {
							return context.hovered ? 'white' : context.dataset.backgroundColor;
						},
						font: {
							weight: 'bold'
						},
						offset: 8,
						formatter: Math.round,
						listeners: {
							enter: function(context) {
								context.hovered = true;
								return true;
							},
							leave: function(context) {
								context.hovered = false;
								return true;
							}
						}
					}
				},
      } 
  }); 
    this.canvas = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');
    this.myChart2 = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
          datasets: [{
              label: 'Clients NF prec year',
              data: ClientPreNF,
              backgroundColor: [
                'rgba(255, 206, 86, 0)',
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
              borderWidth: 1
          },
          {
            label: 'Clients Fid prec year',
            data: ClientPreFid,
            backgroundColor: [
              'rgba(255, 99, 132, 0)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
          ],
            borderWidth: 1
        },
          {label: 'Clients NF cur year',
              data: ClientCurNF,
              backgroundColor: [
                'rgba(75, 192, 192, 0)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
              borderWidth: 1
          },
          {
            label: 'Clients Fid cur year',
            data: ClientCurFid,
            backgroundColor: [
              'rgba(54, 162, 235, 0)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
          ],
            borderWidth: 1
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Comparaison des clients'
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        plugins: {
					datalabels: {
						backgroundColor: function(context) {
							return context.hovered ? context.dataset.backgroundColor : 'white';
						},
						borderColor: function(context) {
							return context.dataset.backgroundColor;
						},
						borderRadius: 16,
						borderWidth: 1,
						color: function(context) {
							return context.hovered ? 'white' : context.dataset.backgroundColor;
						},
						font: {
							weight: 'bold'
						},
						offset: 8,
						formatter: Math.round,
						listeners: {
							enter: function(context) {
								context.hovered = true;
								return true;
							},
							leave: function(context) {
								context.hovered = false;
								return true;
							}
						}
					}
				},
        // pan: {
        //   enabled: true,
        //   mode: 'xy'
        // },
        // zoom: {
        //     enabled: true,
        //     mode: 'xy',
        // }
    }
  });
  
  this.canvas = document.getElementById('myChart3');
    this.ctx = this.canvas.getContext('2d');
    this.myChart3 = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
          datasets: [{
              label: 'Panniers année précédente',
              data: PanierPre,
              backgroundColor: [
                'rgba(255, 206, 86, 0)',
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
              borderWidth: 1
          },
          {label: 'Panniers année courante',
              data: PanierCur,
              backgroundColor: [
                'rgba(75, 192, 192, 0)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
              borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Comparaison des paniers'
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        plugins: {
					datalabels: {
						backgroundColor: function(context) {
							return context.hovered ? context.dataset.backgroundColor : 'white';
						},
						borderColor: function(context) {
							return context.dataset.backgroundColor;
						},
						borderRadius: 16,
						borderWidth: 1,
						color: function(context) {
							return context.hovered ? 'white' : context.dataset.backgroundColor;
						},
						font: {
							weight: 'bold'
						},
						offset: 8,
						formatter: Math.round,
						listeners: {
							enter: function(context) {
								context.hovered = true;
								return true;
							},
							leave: function(context) {
								context.hovered = false;
								return true;
							}
						}
					}
				},
        // pan: {
        //   enabled: true,
        //   mode: 'xy'
        // },
        // zoom: {
        //     enabled: true,
        //     mode: 'xy',
        // }
    }
  }); 

  this.canvas = document.getElementById('myChart4');
    this.ctx = this.canvas.getContext('2d');
    let myChart4 = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["CANF", "CAFid"],
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [tabCANFtotalcur, tabCAFidtotalcur]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Difference CA Fid/NF current year'
        },
        plugins: {
					datalabels: {
						backgroundColor: function(context) {
							return context.dataset.backgroundColor;
						},
						borderColor: 'white',
						borderRadius: 25,
						borderWidth: 2,
						color: 'white',
						display: function(context) {
							var dataset = context.dataset;
							var count = dataset.data.length;
							var value = dataset.data[context.dataIndex];
							return value > count * 1.5;
						},
						font: {
							weight: 'bold'
						},
						formatter: Math.round
					}
				},
        maintainAspectRatio: false,
      }
  });

  this.canvas = document.getElementById('myChart6');
    this.ctx = this.canvas.getContext('2d');
    let myChart6 = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["clients NF", "Clients Fid"],
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [tabClientTotalPreNF, tabClientTotalPreFid]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Difference Clients Fid/NF current year'
        },
        plugins: {
					datalabels: {
						backgroundColor: function(context) {
							return context.dataset.backgroundColor;
						},
						borderColor: 'white',
						borderRadius: 25,
						borderWidth: 2,
						color: 'white',
						display: function(context) {
							var dataset = context.dataset;
							var count = dataset.data.length;
							var value = dataset.data[context.dataIndex];
							return value > count * 1.5;
						},
						font: {
							weight: 'bold'
						},
						formatter: Math.round
					}
				},
        maintainAspectRatio: false,
      }
  });

  }

  getWeek(event){
    console.log(event);
    if(event=="2018-W23"){
      
       
    }
    if(event=="2018-W24"){
      
       
    }
    if(event=="2018-W25"){
      
       
    }
    if(event=="2018-W26"){
      
       
    }
  }

  ngOnInit() {
    this.calculusWeek();
  }

}
