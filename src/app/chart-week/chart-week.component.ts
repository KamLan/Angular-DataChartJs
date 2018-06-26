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
  myChart4
  myChart6

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

  //var for date calc
  dayMonthYear;
  dayMonthYearPre;

  //var three tabs
  CAWeekTotalCur
  CAWeekTotalPre

  data = require('../../assets/data.json');


  // display graph or numbers  
  displayGraph(_graph:number){
    this.graph=_graph;
  }

  calculusWeek(dayMonthYear, dayMonthYearPre){

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


    //Données brutes
    this.arrayJourSemaines=["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    this.arrayDCAjours=[["557","10"],["569","-5"],["472","12"],["358","6"],["822","-2"],["603","15"],["215","-3"]];
    this.arrayDCCjours=[["323","24"],["399","-30"],["265","14"],["231","25"],["313","-6"],["207","-10"],["70","5"]];
    this.arrayDPjours=[["8.4","0.5"],["12.3","-2"],["6.9","12"],["14.4","6"],["7.5","-3"],["18.6","7"],["8","4"]];

    //var for date management
    //Current year
    var DayLundi = dayMonthYear.slice(0,2)
    var DateLundi=dayMonthYear;
    var DateMardi=(Number(DayLundi) + 1) + dayMonthYear.substr(2);
    var DateMercredi=(Number(DayLundi) + 2) + dayMonthYear.substr(2);
    var DateJeudi=(Number(DayLundi) + 3) + dayMonthYear.substr(2);
    var DateVendredi=(Number(DayLundi) + 4) + dayMonthYear.substr(2);
    var DateSamedi=(Number(DayLundi) + 5) + dayMonthYear.substr(2);
    var DateDimanche=(Number(DayLundi) + 6) + dayMonthYear.substr(2);
    //precedent year
    var DayLundiPre = dayMonthYear.slice(0,2)
    var DateLundiPre=dayMonthYear;
    var DateMardiPre=(Number(DayLundiPre) + 1) + dayMonthYearPre.substr(2);
    var DateMercrediPre=(Number(DayLundiPre) + 2) + dayMonthYearPre.substr(2);
    var DateJeudiPre=(Number(DayLundiPre) + 3) + dayMonthYearPre.substr(2);
    var DateVendrediPre=(Number(DayLundiPre) + 4) + dayMonthYearPre.substr(2);
    var DateSamediPre=(Number(DayLundiPre) + 5) + dayMonthYearPre.substr(2);
    var DateDimanchePre=(Number(DayLundiPre) + 6) + dayMonthYearPre.substr(2);

    //var for ca
    //current year
    var CANFcurLun =[]
    var CAfidcurLun =[]
    var CALundi = 0
    var CALundiFid = 0
    var CANFcurMar =[]
    var CAfidcurMar =[]
    var CAMardi = 0
    var CAMardiFid = 0
    var CANFcurMer =[]
    var CAfidcurMer =[]
    var CAMercredi = 0
    var CAMercrediFid = 0
    var CANFcurJeu =[]
    var CAfidcurJeu =[]
    var CAJeudi= 0
    var CAJeudiFid = 0
    var CANFcurVen =[]
    var CAfidcurVen =[]
    var CAVendredi= 0
    var CAVendrediFid = 0
    var CANFcurSam =[]
    var CAfidcurSam =[]
    var CASamedi = 0
    var CASamediFid = 0
    var CANFcurDim =[]
    var CAfidcurDim =[]
    var CADimanche = 0
    var CADimancheFid = 0
    //precedent year
    var CANFpreLun =[]
    var CAfidpreLun =[]
    var CALundiPre = 0
    var CALundiFidPre = 0
    var CANFpreMar =[]
    var CAfidpreMar =[]
    var CAMardiPre = 0
    var CAMardiFidPre = 0
    var CANFpreMer =[]
    var CAfidpreMer =[]
    var CAMercrediPre = 0
    var CAMercrediFidPre = 0
    var CANFpreJeu =[]
    var CAfidpreJeu =[]
    var CAJeudiPre= 0
    var CAJeudiFidPre = 0
    var CANFpreVen =[]
    var CAfidpreVen =[]
    var CAVendrediPre= 0
    var CAVendrediFidPre = 0
    var CANFpreSam =[]
    var CAfidpreSam =[]
    var CASamediPre = 0
    var CASamediFidPre = 0
    var CANFpreDim =[]
    var CAfidpreDim =[]
    var CADimanchePre = 0
    var CADimancheFidPre = 0

    for(var i=0; i<154; i++){
      //current year
      if(this.data[i].DTENCTCK==DateLundi){
        //get valeur CA caisses
        var newValueLun = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidLun = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurLun[0]=null;
        CANFcurLun.push(newValueLun);
        CAfidcurLun[0] = null
        CAfidcurLun.push(newValueFidLun);
        CALundi = CALundi + Number(newValueLun)
        CALundiFid = CALundiFid + Number(newValueFidLun)
      }
      if(this.data[i].DTENCTCK==DateMardi){
        //get valeur CA caisses
        var newValueMar = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidMar = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurMar[0]=null;
        CANFcurMar.push(newValueMar);
        CAfidcurMar[0] = null
        CAfidcurMar.push(newValueFidMar);
        CAMardi = CAMardi + Number(newValueMar);
        CAMardiFid = CAMardiFid + Number(newValueFidMar)
      }
      if(this.data[i].DTENCTCK==DateMercredi){
        //get valeur CA caisses
        var newValueMer = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidMer = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurMer[0]=null;
        CANFcurMer.push(newValueMer);
        CAfidcurMer[0] = null
        CAfidcurMer.push(newValueFidMer);
        CAMercredi = CAMercredi + Number(newValueMer)
        CAMercrediFid = CAMercrediFid + Number(newValueFidMer)
      }
      if(this.data[i].DTENCTCK==DateJeudi){
        //get valeur CA caisses
        var newValueJeu = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidJeu = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurJeu[0]=null;
        CANFcurJeu.push(newValueJeu);
        CAfidcurJeu[0] = null
        CAfidcurJeu.push(newValueFidJeu);
        CAJeudi = CAJeudi + Number(newValueJeu)
        CAJeudiFid = CAJeudiFid + Number(newValueFidJeu)
      }
      if(this.data[i].DTENCTCK==DateVendredi){
        //get valeur CA caisses
        var newValueVen = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidVen = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurVen[0]=null;
        CANFcurVen.push(newValueVen);
        CAfidcurVen[0] = null
        CAfidcurVen.push(newValueFidVen);
        CAVendredi = CAVendredi + Number(newValueVen)
        CAVendrediFid = CAVendrediFid + Number(newValueFidVen)
      }
      if(this.data[i].DTENCTCK==DateSamedi){
        //get valeur CA caisses
        var newValueSam = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidSam = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurSam[0]=null;
        CANFcurSam.push(newValueSam);
        CAfidcurSam[0] = null
        CAfidcurSam.push(newValueFidSam);
        CASamedi = CASamedi + Number(newValueSam)
        CASamediFid = CASamediFid + Number(newValueFidSam)
      }
      if(this.data[i].DTENCTCK==DateDimanche){
        //get valeur CA caisses
        var newValueDim = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidDim = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFcurDim[0]=null;
        CANFcurDim.push(newValueDim);
        CAfidcurDim[0] = null
        CAfidcurDim.push(newValueFidDim);
        CADimanche = CADimanche + Number(newValueDim)
        CADimancheFid = CADimancheFid + Number(newValueFidDim)
      }
      //precedent year
      if(this.data[i].DTENCTCK==DateLundiPre){
        //get valeur CA caisses
        var newValueLunPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidLunPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreLun[0]=null;
        CANFpreLun.push(newValueLunPre);
        CAfidpreLun[0] = null
        CAfidpreLun.push(newValueFidLunPre);
        CALundiPre = CALundiPre + Number(newValueLunPre)
        CALundiFidPre = CALundiFidPre + Number(newValueFidLunPre)
      }
      if(this.data[i].DTENCTCK==DateMardiPre){
        //get valeur CA caisses
        var newValueMarPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidMarPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreMar[0]=null;
        CANFpreMar.push(newValueMarPre);
        CAfidpreMar[0] = null
        CAfidpreMar.push(newValueFidMarPre);
        CAMardiPre = CAMardiPre + Number(newValueMarPre);
        CAMardiFidPre = CAMardiFidPre + Number(newValueFidMarPre)
      }
      if(this.data[i].DTENCTCK==DateMercrediPre){
        //get valeur CA caisses
        var newValueMerPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidMerPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreMer[0]=null;
        CANFpreMer.push(newValueMerPre);
        CAfidpreMer[0] = null
        CAfidpreMer.push(newValueFidMerPre);
        CAMercrediPre = CAMercrediPre + Number(newValueMerPre)
        CAMercrediFidPre = CAMercrediFidPre + Number(newValueFidMerPre)
      }
      if(this.data[i].DTENCTCK==DateJeudiPre){
        //get valeur CA caisses
        var newValueJeuPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidJeuPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreJeu[0]=null;
        CANFpreJeu.push(newValueJeuPre);
        CAfidpreJeu[0] = null
        CAfidpreJeu.push(newValueFidJeuPre);
        CAJeudiPre = CAJeudiPre + Number(newValueJeuPre)
        CAJeudiFidPre = CAJeudiFidPre + Number(newValueFidJeuPre)
      }
      if(this.data[i].DTENCTCK==DateVendrediPre){
        //get valeur CA caisses
        var newValueVenPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidVenPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreVen[0]=null;
        CANFpreVen.push(newValueVenPre);
        CAfidpreVen[0] = null
        CAfidpreVen.push(newValueFidVenPre);
        CAVendrediPre = CAVendrediPre + Number(newValueVenPre)
        CAVendrediFidPre = CAVendrediFidPre + Number(newValueFidVenPre)
      }
      if(this.data[i].DTENCTCK==DateSamediPre){
        //get valeur CA caisses
        var newValueSamPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidSamPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreSam[0]=null;
        CANFpreSam.push(newValueSamPre);
        CAfidpreSam[0] = null
        CAfidpreSam.push(newValueFidSamPre);
        CASamediPre = CASamediPre + Number(newValueSamPre)
        CASamediFidPre = CASamediFidPre + Number(newValueFidSamPre)
      }
      if(this.data[i].DTENCTCK==DateDimanchePre){
        //get valeur CA caisses
        var newValueDimPre = this.data[i].CACaisse.toString().replace(",",".")
        var newValueFidDimPre = this.data[i].CACaisseCarteFid.toString().replace(",",".")
        CANFpreDim[0]=null;
        CANFpreDim.push(newValueDimPre);
        CAfidpreDim[0] = null
        CAfidpreDim.push(newValueFidDimPre);
        CADimanchePre = CADimanchePre + Number(newValueDimPre)
        CADimancheFidPre = CADimancheFidPre + Number(newValueFidDimPre)
      }
    }
    
    // CA total current year
    var CAWeekTotalNF = (CALundi + CAMardi + CAMercredi  + CAJeudi + CAVendredi + CASamedi + CADimanche)
    var CAWeekTotalFid = (CALundiFid + CAMardiFid + CAMercrediFid + CAJeudiFid + CAVendrediFid + CASamediFid + CADimancheFid)
    this.CAWeekTotalCur = (CAWeekTotalNF + CAWeekTotalFid).toFixed(2)
    console.log("CA cur: ", CAWeekTotalNF, CAWeekTotalFid, this.CAWeekTotalCur)
    
    // CA total precedent year
    var CAWeekTotalNFPre = (CALundiPre + CAMardiPre + CAMercrediPre  + CAJeudiPre + CAVendrediPre + CASamediPre + CADimanchePre)
    var CAWeekTotalFidPre = (CALundiFidPre + CAMardiFidPre + CAMercrediFidPre + CAJeudiFidPre + CAVendrediFidPre + CASamediFidPre + CADimancheFidPre)
    this.CAWeekTotalPre = (CAWeekTotalNFPre + CAWeekTotalFidPre).toFixed(2)
    console.log("CA pre: ", CAWeekTotalNFPre, CAWeekTotalFidPre, this.CAWeekTotalPre)

    //Display charts
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
    this.canvas = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');
    this.myChart2 = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
          {
            label: 'Clients NF cur year',
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
          labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
            backgroundColor: ["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"],
            borderColor: ["black"],
            borderWidth: 1,
            fill: false
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
    this.myChart4 = new Chart(this.ctx, {
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
    this.myChart6 = new Chart(this.ctx, {
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

  getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 5)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        var day = ISOweekStart.toString().slice(8, 10);
        var month = ISOweekStart.toString().slice(4, 7);
        var year = ISOweekStart.toString().slice(13,15);
        var yearPre = Number(year) - 1;
        switch(month) {
          case "Jan":
              month="/01"
              break;
          case "Feb":
              month="/02"
              break;
          case "Mar":
              month="/03"
          break;
          case "Apr":
              month="/04"
          break;
          case "May":
              month="/05"
          break;
          case "Jun":
              month="/06"
          break;
          case "Jul":
              month="/07"
          break;
          case "Aug":
              month="/08"
          break;
          case "Sep":
              month="/09"
          break;
          case "Oct":
              month="/10"
          break;
          case "Nov":
              month="/11"
          break;
          case "Dec":
              month="/12"
          break;
          default:
              
      }
        this.dayMonthYear = day + month + "/" + year; 
        this.dayMonthYearPre = day + month + "/" + yearPre;
  }

  getWeek(event){
    var weekNumber = event.slice(-2)
    var yearNumber = event.slice(0, 4)
    var dayOfTheWeek = this.getDateOfISOWeek(weekNumber,yearNumber)

    //Randomization
    this.randomization()

    return dayOfTheWeek;
  }

  randomization(){

    this.CAtotal = Math.floor((Math.random() * 35000) + 20000);
    this.ClientTotal = Math.floor((Math.random() * 1500) + 800);
    this.PanierTotal = Math.floor((Math.random() * 15) + 5);
    this.CAtotalVar = Math.floor((Math.random() * 40) + -30);
    this.ClientTotalVar = Math.floor((Math.random() * 50) + -40);
    this.PanierTotalVar = Math.floor((Math.random() * 50) + -40);


    //Données brutes
    this.arrayJourSemaines=["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    this.arrayDCAjours=[[Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 1000) + 100), Math.floor((Math.random() * 50) + -30)]];
    this.arrayDCCjours=[[Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 150) + 30), Math.floor((Math.random() * 50) + -30)]];
    this.arrayDPjours=[[Math.floor((Math.random() * 15) + 5), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 15) + 5), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 15) + 4), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 15) + 5), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 25) + 10), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 20) + 15), Math.floor((Math.random() * 50) + -30)],
    [Math.floor((Math.random() * 15) + 5), Math.floor((Math.random() * 50) + -30)]];


    var CANFpre = [null, Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100)]
    var CAfidpre = [null, Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100)]
    var CAfidcur = [null, Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100), 
      Math.floor((Math.random() * 600)+ 100)]
    var CANFcur = [null, Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100), 
      Math.floor((Math.random() * 1000)+ 100)]
    var ClientPreNF = [null, Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70)]
    var ClientPreFid = [null, Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5)]
    var ClientCurNF = [null, Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70), 
      Math.floor((Math.random() * 400)+ 70))]
    var ClientCurFid = [null, Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5), 
      Math.floor((Math.random() * 50)+ 5)]
    var PanierPre = [null, Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5)]
    var PanierCur = [null, Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5), 
      Math.floor((Math.random() * 15)+ 5)]
    var tabCANFtotalcur = [Math.floor((Math.random() * 30000)+ 20000)]
    var tabCAFidtotalcur = [Math.floor((Math.random() * 3000)+ 2000)]
    var tabClientTotalPreNF = [Math.floor((Math.random() * 2000)+ 800)]
    var tabClientTotalPreFid = [Math.floor((Math.random() * 200)+ 80)]
    this.myChart.destroy();
    this.myChart2.destroy();
    this.myChart3.destroy();
    this.myChart4.destroy();
    this.myChart6.destroy();

    //Update charts
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
              labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
        this.canvas = document.getElementById('myChart2');
        this.ctx = this.canvas.getContext('2d');
        this.myChart2 = new Chart(this.ctx, {
          type: 'line',
          data: {
              labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
              {
                label: 'Clients NF cur year',
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
              labels: ["0", "Lundi", "Mardi", "Mercredi", "Jeudi", "VEndredi", "Samedi", "Dimanche"],
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
                backgroundColor: ["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"],
                borderColor: ["black"],
                borderWidth: 1,
                fill: false
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
        this.myChart4 = new Chart(this.ctx, {
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
        this.myChart6 = new Chart(this.ctx, {
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

  ngOnInit() {
    this.calculusWeek("25/05/18", "25/05/17");
  }

}
