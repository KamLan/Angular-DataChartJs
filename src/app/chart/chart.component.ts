import { Component, OnInit, AfterViewInit, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Chart } from 'chart.js';
import { labels } from 'chartjs-plugin-datalabels';
import { zoom } from 'chartjs-plugin-zoom';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


var chartjsPluginDatalabels = require("chartjs-plugin-datalabels")
//var chartjsPluginZoom = require("chartjs-plugin-zoom")

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
 
  canvas: any;
  graph:number = 1;
  ctx: any;

  //date
  DateInputcur = "25/05/18";
  DateInputpre = "25/05/17";

  //chart refresh
  myChart;
  myChart2;
  myChart3;
  myChartbar;

  //charts
  CANFtotalpre = 0;
  CAFidtotalpre = 0;
  CAFidtotalcur = 0;
  CANFtotalcur = 0;
  CATotalcur =0;
  CATotalpre =0;
  CAtotalVar;
  ClientTotalPreNF = 0;
  ClientTotalPreFid = 0;
  ClientTotalCurNF = 0;
  ClientTotalCurFid = 0;
  ClientTotalpre = 0;
  ClientTotalcur = 0;
  ClientTotalVar;
  PanierMoyPre;
  PanierMoyCur;
  PanierTotalVar;
  //donnees
  //CA
  DCANFpre = []; 
  DCAFidpre = [];
  DCANFcur = [];
  DCAFidcur = [];
  DCApre;
  DCAcur;
  DCAVar;
  tabDCApre = [];
  tabDCAcur = [];
  tabDCAVar = [];
  arrayDCAhoraires = [];
  //Client
  DClientpre;
  DClientcur;
  arrayDClienthoraires = [];
  //Panniers
  Dpanpre;
  Dpancur;
  arrayDpanhoraires = [];
  dataImport: String [];

  data = require('../../assets/data.json');
  
  constructor(private httpService: HttpClient) {
  }

  ngOnInit() {

    this.graph = 1;
    
    this.calculus("25/05/18", "25/05/17")
  }
  
  // display graph or numbers  
  displayGraph(_graph:number){
    this.graph=_graph;
  }

  // get day from input 
  getDay(event) { 
    var dateInputInter = event.slice(-8);
    var year = dateInputInter.slice(0, 2);
    var month = dateInputInter.slice(3, 5);
    var day = dateInputInter.slice(6, 8);
    var DateInputCurEL = day + "/" + month + "/" + year;
    var str = parseInt(DateInputCurEL.slice(-2));
    var str1 = str - 1;
    var DateInputPreEL = DateInputCurEL.slice(0, -2) + str1;
    this.DateInputpre=DateInputPreEL;
    this.DateInputcur=DateInputCurEL;
    this.myChart.destroy();
    this.myChart2.destroy();
    this.myChart3.destroy();
    this.calculus(DateInputPreEL, DateInputCurEL);
  }

  calculus(datepre:string,datecur:string){
    var CANFpre = [];
    var CANFcur = [];
    var PanierPre = [];
    var PanierCur = [];
    var CAfidpre = [];
    var CAfidcur = [];
    var CAfidnonfidPre = [];
    var CAfidnonfiCur = [];
    var ClientPreNF = [];
    var ClientPreFid = [];
    var ClientCurNF = [];
    var ClientCurFid = [];

     //TRI DATA UNE JOURNEE
     for(var i=0; i<154; i++){
      if(this.data[i].DTENCTCK==datepre){
        //get CA par caisse année précedente 
          var newValue = this.data[i].CACaisse.toString().replace(",",".")
          var newValueFid = this.data[i].CACaisseCarteFid.toString().replace(",",".")
          CANFpre[0]=null;
          CANFpre.push(newValue);
          CAfidpre[0] = null
          CAfidpre.push(newValueFid);

        //calcul total CA NF
          var CANFinter:any = parseFloat(this.data[i].CACaisse);
          this.CANFtotalpre = this.CANFtotalpre + CANFinter;
          var tabCANFtotalpre = this.CANFtotalpre;

        //calcul total CA Fid
          var FidToString = this.data[i].CACaisseCarteFid.toString();
          var CAFIDinter:any = parseFloat(FidToString);
          this.CAFidtotalpre = this.CAFidtotalpre + CAFIDinter;
          var tabCAFidtotalpre = this.CAFidtotalpre;

        //get nombre clients
          var newValueC = this.data[i].NbTicket.toString();
          var newValueCFid = this.data[i].NbTicketCarteFid.toString();
          ClientPreFid[0]=null;
          ClientPreNF[0]=null
          ClientPreNF.push(newValueC);
          ClientPreFid.push(newValueCFid);

        //calcul total clients NF
          var ClientInterNF:number = this.data[i].NbTicket;
          this.ClientTotalPreNF = this.ClientTotalPreNF + ClientInterNF;
          var tabClientTotalPreNF = this.ClientTotalPreNF;

        //calcul total clients Fid  
          var CLientInterFidPre:number = this.data[i].NbTicketCarteFid;
          this.ClientTotalPreFid = this.ClientTotalPreFid + CLientInterFidPre;
          var tabClientTotalPreFid = this.ClientTotalPreFid;

        //get paniers
          var panierCA = parseInt(newValue) + parseInt(newValueFid);
          var panierClient = this.data[i].NbTicket + this.data[i].NbTicketCarteFid;
          var panierValue =  panierCA / panierClient;
          PanierPre[0]=null
          PanierPre.push(panierValue.toFixed(2));
      }
      if(this.data[i].DTENCTCK==datecur){
        //get CA par caisse année courante
          var newValue = this.data[i].CACaisse.toString().replace(",",".");
          var newValueFid = this.data[i].CACaisseCarteFid.toString().replace(",",".")
          CANFcur[0]= null;
          CANFcur.push(newValue);
          CAfidcur[0]=null;
          CAfidcur.push(newValueFid);

        //calcul total CA Classique
          var CANFinter:any = parseFloat(this.data[i].CACaisse)
          this.CANFtotalcur = this.CANFtotalcur + CANFinter;
          var tabCANFtotalcur = this.CANFtotalcur;

        //calcul total CA Fid
          var FidToString = this.data[i].CACaisseCarteFid.toString();
          var CAFIDinter:any = parseFloat(FidToString);
          this.CAFidtotalcur = this.CAFidtotalcur + CAFIDinter;
          var tabCAFidtotalcur = this.CAFidtotalcur;

        //get nombre clients
          var newValueC = this.data[i].NbTicket.toString();
          var newValueCFid = this.data[i].NbTicketCarteFid.toString();
          ClientCurNF[0]=null
          ClientCurFid[0]=null
          ClientCurNF.push(newValueC);
          ClientCurFid.push(newValueCFid);

        //calcul total clients NF
          var ClientInterCur:any = this.data[i].NbTicket;
          this.ClientTotalCurNF = this.ClientTotalCurNF + ClientInterCur;
          var tabClientTotalCurNF = this.ClientTotalCurNF;

        //calcul total clients Fid 
          var ClientInterFidCur:any = this.data[i].NbTicketCarteFid;
          this.ClientTotalCurFid = this.ClientTotalCurFid + ClientInterFidCur;
          var tabClientTotalCurFid = this.ClientTotalCurFid;

        //get paniers
          var panierCA = parseInt(newValue) + parseInt(newValueFid);
          var panierClient = this.data[i].NbTicket + this.data[i].NbTicketCarteFid;
          var panierValue =  panierCA / panierClient;
          PanierCur[0]=null
          PanierCur.push(panierValue.toFixed(2));
      }
  }

  //calcul total CA
    this.CATotalpre = this.CANFtotalpre + this.CAFidtotalpre;
    this.CATotalcur = this.CANFtotalcur + this.CAFidtotalcur;
    

  //calcul total clients
    this.ClientTotalpre = this.ClientTotalPreFid + this.ClientTotalPreNF;
    this.ClientTotalcur = this.ClientTotalCurFid + this.ClientTotalCurNF;
    
  //calcul variation CA     
    var variation= (this.CATotalcur - this.CATotalpre) / this.CATotalpre * 100; 
    this.CAtotalVar = variation.toFixed(2);

  //calcul variation client
    var variationClient = (this.ClientTotalcur - this.ClientTotalpre) / this.ClientTotalpre * 100;
    this.ClientTotalVar = variationClient.toFixed(2);

  //calcul panier moyen pre
    function getSum(total, num) {
      return total + Math.round(num);
    }
    var panierMoyInterPre = PanierPre.reduce(getSum, 0) / 12;
    this.PanierMoyPre = panierMoyInterPre.toFixed(2);

  //calcul panier moyen cur
    var panierMoyInterCur = PanierCur.reduce(getSum, 0) / 12;
    this.PanierMoyCur = panierMoyInterCur.toFixed(2);

  //calcul variation pannier
    var variationPanier = (this.PanierMoyCur - this.PanierMoyPre) / this.PanierMoyPre * 100;
    this.PanierTotalVar = variationPanier.toFixed(2);

  //Annulation variables
    this.CANFtotalpre = 0
    this.CAFidtotalpre = 0
    this.CANFtotalcur = 0
    this.CAFidtotalcur = 0
    this.ClientTotalPreFid = 0 
    this.ClientTotalPreNF = 0
    this.ClientTotalCurFid = 0 
    this.ClientTotalCurNF = 0

    //DONNEES BRUTES
    this.arrayDCAhoraires = [];
    this.arrayDClienthoraires = [];
    this.arrayDpanhoraires = [];
    this.DCANFpre = CANFpre; 
    this.DCAFidpre = CAfidpre;
    this.DCANFcur = CANFcur;
    this.DCAFidcur = CAfidcur;

  //calcul CA par heure
    for(var i=0; i<12; i++){
      var heure = i + 8;
      this.DCApre = parseInt(this.DCANFcur[i]) + parseInt(this.DCAFidcur[i]);
      this.tabDCApre.push(this.DCApre);
      this.DCAcur = parseInt(this.DCANFpre[i]) + parseInt(this.DCAFidpre[i]); 
      this.tabDCAcur.push(this.DCAcur);
      var calcul = (this.DCAcur - this.DCApre) / this.DCApre * 100
      this.DCAVar = calcul.toFixed(2);
      this.tabDCAVar.push(this.DCAVar);
      var tabCompactCA = [];
      tabCompactCA.push(heure, this.DCApre, this.DCAcur, this.DCAVar);
      this.arrayDCAhoraires.push(tabCompactCA);
    }

  //calcul client par heure
    for(var i=0; i<12; i++){
      var heure = i + 8;
      this.DClientcur = parseInt(ClientCurNF[i]) + parseInt(ClientCurFid[i])
      this.DClientpre = parseInt(ClientPreNF[i]) + parseInt(ClientPreFid[i])
      var calculClient = ((this.DClientcur - this.DClientpre) / this.DClientpre * 100).toFixed(2);  
      var tabCompactClient = [];
      tabCompactClient.push(heure, this.DClientpre, this.DClientcur, calculClient);
      this.arrayDClienthoraires.push(tabCompactClient);
    }
    
  //calcul panier par heure
    for(var i=0; i<12; i++){
      var heure = i + 8;
      this.Dpancur= parseInt(PanierCur[i]);
      this.Dpanpre= parseInt(PanierPre[i]);
      var calculPanier = ((PanierCur[i] - PanierPre[i]) / PanierPre[i] *100).toFixed(2);
      var tabCompactPanier = [];
      tabCompactPanier.push(heure, this.Dpanpre, this.Dpancur, calculPanier);
      this.arrayDpanhoraires.push(tabCompactPanier);
    }

    //Delete first null entry
     this.arrayDCAhoraires.shift();
     this.arrayDClienthoraires.shift();
     this.arrayDpanhoraires.shift();

    //CHARTS DEFINITION
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
          datasets: [{
            label: 'CA NF prec year',
            data: CANFpre,
            backgroundColor: ["navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy"],
            borderColor: ["navy"],
            borderWidth: 1,
            fill: false
          },
          {
            label: 'CA Fid prec year',
            data: CAfidpre,
            fill: false, 
            backgroundColor: ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            borderColor: ["red"],
            borderWidth: 1
        },
          {
            label: "CA Fid cur year",
            data: CAfidcur,
            fill: false, 
            backgroundColor: ["orange", "orange", "orange", "orange", "orange", "orange","orange", "orange", "orange", "orange", "orange", "orange", "orange"],
            borderColor: ["orange"],
            borderWidth: 1
          },
          {
            label: "CA NF cur year ",
            data: CANFcur,
            fill: false, 
            backgroundColor: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green','green', "green"],
            borderColor: ['green'],
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

    this.canvas = document.getElementById('myChartbar');
    this.ctx = this.canvas.getContext('2d');
    this.myChartbar = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
          datasets: [{
              label: 'CA NF prec year',
              data: CANFpre,
              backgroundColor: ["navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy"],
              borderColor: ["navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy"],
              borderWidth: 1
          },
          {
            label: 'CA Fid prec year',
            data: CAfidpre,
            backgroundColor: ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            borderColor: ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            borderWidth: 1
        },
          {
              label: "CA Fid cur year",
              data: CAfidcur,
              backgroundColor: ["orange", "orange", "orange", "orange", "orange", "orange","orange", "orange", "orange", "orange", "orange", "orange", "orange"],
              borderColor: ["orange", "orange", "orange", "orange", "orange", "orange","orange", "orange", "orange", "orange", "orange", "orange", "orange"],
              borderWidth: 1
          },
          {
            label: "CA NF cur year ",
            data: CANFcur,
            backgroundColor: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green','green', "green"],
            borderColor: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green','green', "green"],
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
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",],
          datasets: [{
            label: 'Clients NF prec year',
            data: ClientPreNF,
            backgroundColor: ["navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy", "navy"],
            borderColor: ["navy"],
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Clients Fid prec year',
            data: ClientPreFid,
            fill: false, 
            backgroundColor: ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
            borderColor: ["red"],
            borderWidth: 1
        },
          {label: 'Clients NF cur year',
              data: ClientCurNF,
              fill: false, 
              backgroundColor: ["orange", "orange", "orange", "orange", "orange", "orange","orange", "orange", "orange", "orange", "orange", "orange", "orange"],
              borderColor: ["orange"],
              borderWidth: 1
          },
          {
            label: 'Clients Fid cur year',
            data: ClientCurFid,
            fill: false, 
            backgroundColor: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green','green', "green"],
            borderColor: ['green'],
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
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",],
          datasets: [{
            label: 'Panniers année précédente',
            data: PanierPre,
            backgroundColor: ["purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"],
            borderColor: ["purple"],
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Panniers année courante',
            data: PanierCur,
            fill: false, 
            backgroundColor: ["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"],
            borderColor: ["black"],
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

  // this.canvas = document.getElementById('myChart5');
  //   this.ctx = this.canvas.getContext('2d');
  //   let myChart5 = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: ["CANF", "CAFid"],
  //       datasets: [
  //         {
  //           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //           data: [tabCANFtotalpre, tabCAFidtotalpre]
  //         }
  //       ]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Difference CA Fid/NF precedent year'
  //       },
  //       maintainAspectRatio: false,
  //     }
  // });

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

  // this.canvas = document.getElementById('myChart7');
  //   this.ctx = this.canvas.getContext('2d');
  //   let myChart7 = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: ["Clients NF", "Clients Fid"],
  //       datasets: [
  //         {
  //           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //           data: [tabClientTotalCurNF, tabClientTotalCurFid]
  //         }
  //       ]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Difference Clients Fid/NF precedent year'
  //       },
  //       maintainAspectRatio: false,
  //     }
  // });

  }             

}
