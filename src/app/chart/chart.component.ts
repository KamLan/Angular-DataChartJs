import { Component, OnInit, AfterViewInit, Input, SimpleChange } from '@angular/core';
import { NgModule } from '@angular/core';
import { Chart } from 'chart.js';
import { labels } from 'chartjs-plugin-datalabels';
import { zoom } from 'chartjs-plugin-zoom';

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

  data = [
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "323,57",
      "CACaisseCarteFid": "80,98",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 177,
      "UVCCaisseCarteFid": 42,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 42,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "384,47",
      "CACaisseCarteFid": "132,19",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 199,
      "UVCCaisseCarteFid": 69,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 43,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "582,27",
      "CACaisseCarteFid": "198,21",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 272,
      "UVCCaisseCarteFid": 88,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "798,51",
      "CACaisseCarteFid": "332,12",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 335,
      "UVCCaisseCarteFid": 140,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 70,
      "NbTicketCarteFid": 13,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "721,06",
      "CACaisseCarteFid": "42,81",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 284,
      "UVCCaisseCarteFid": 20,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "261,27",
      "CACaisseCarteFid": "6,25",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 130,
      "UVCCaisseCarteFid": 1,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 35,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "178,26",
      "CACaisseCarteFid": "1,15",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 85,
      "UVCCaisseCarteFid": 1,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 27,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "352,45",
      "CACaisseCarteFid": "14,35",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 148,
      "UVCCaisseCarteFid": 5,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 37,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "443,71",
      "CACaisseCarteFid": "18,24",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 214,
      "UVCCaisseCarteFid": 10,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 62,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "516,06",
      "CACaisseCarteFid": "8,71",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 242,
      "UVCCaisseCarteFid": 3,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 64,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "314,34",
      "CACaisseCarteFid": "15,35",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 147,
      "UVCCaisseCarteFid": 9,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "176,18",
      "CACaisseCarteFid": "12,65",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 82,
      "UVCCaisseCarteFid": 8,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 24,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "346,14",
      "CACaisseCarteFid": "41,26",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 181,
      "UVCCaisseCarteFid": 28,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 47,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "226,47",
      "CACaisseCarteFid": "56,23",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 127,
      "UVCCaisseCarteFid": 34,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 26,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "386,99",
      "CACaisseCarteFid": "140,42",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 194,
      "UVCCaisseCarteFid": 68,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 55,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "800,69",
      "CACaisseCarteFid": "170,4",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 386,
      "UVCCaisseCarteFid": 78,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 83,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "474,5",
      "CACaisseCarteFid": "21,11",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 233,
      "UVCCaisseCarteFid": 14,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 71,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "268,84",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 115,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 45,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "332,55",
      "CACaisseCarteFid": "120,44",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 162,
      "UVCCaisseCarteFid": 54,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 37,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "356,06",
      "CACaisseCarteFid": "140,61",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 157,
      "UVCCaisseCarteFid": 48,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 35,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "520,97",
      "CACaisseCarteFid": "126,4",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 244,
      "UVCCaisseCarteFid": 52,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 48,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "432,58",
      "CACaisseCarteFid": "58,01",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 193,
      "UVCCaisseCarteFid": 28,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 55,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "648,02",
      "CACaisseCarteFid": "96,89",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 256,
      "UVCCaisseCarteFid": 31,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 61,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "415,46",
      "CACaisseCarteFid": "45,64",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 177,
      "UVCCaisseCarteFid": 16,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 45,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "229,45",
      "CACaisseCarteFid": "56,95",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 144,
      "UVCCaisseCarteFid": 26,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 49,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "459,65",
      "CACaisseCarteFid": "39,92",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 205,
      "UVCCaisseCarteFid": 29,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "361,24",
      "CACaisseCarteFid": "46,8",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 199,
      "UVCCaisseCarteFid": 37,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 56,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "810,57",
      "CACaisseCarteFid": "214,57",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 337,
      "UVCCaisseCarteFid": 84,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 69,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "734,22",
      "CACaisseCarteFid": "38,73",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 320,
      "UVCCaisseCarteFid": 11,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 71,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "197,22",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 101,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 36,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "311,32",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 127,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 42,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "191,27",
      "CACaisseCarteFid": "5,91",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 84,
      "UVCCaisseCarteFid": 3,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 34,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "428,92",
      "CACaisseCarteFid": "161,05",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 189,
      "UVCCaisseCarteFid": 71,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 50,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "571,29",
      "CACaisseCarteFid": "87,61",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 242,
      "UVCCaisseCarteFid": 23,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 62,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "433,69",
      "CACaisseCarteFid": "49,71",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 178,
      "UVCCaisseCarteFid": 12,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "323,76",
      "CACaisseCarteFid": "24,9",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 134,
      "UVCCaisseCarteFid": 8,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 35,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "375,19",
      "CACaisseCarteFid": "32,33",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 204,
      "UVCCaisseCarteFid": 17,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 50,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "501,68",
      "CACaisseCarteFid": "45,36",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 215,
      "UVCCaisseCarteFid": 26,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 53,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "706,71",
      "CACaisseCarteFid": "224,93",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 276,
      "UVCCaisseCarteFid": 83,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 65,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "706,61",
      "CACaisseCarteFid": "89,52",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 299,
      "UVCCaisseCarteFid": 43,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 75,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "376,84",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 142,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "344,63",
      "CACaisseCarteFid": "136,45",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 167,
      "UVCCaisseCarteFid": 60,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 50,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "354,4",
      "CACaisseCarteFid": "91,02",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 185,
      "UVCCaisseCarteFid": 46,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 46,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "522,01",
      "CACaisseCarteFid": "125,66",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 269,
      "UVCCaisseCarteFid": 55,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 54,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "400,85",
      "CACaisseCarteFid": "132,96",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 213,
      "UVCCaisseCarteFid": 66,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "486,43",
      "CACaisseCarteFid": "39,92",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 239,
      "UVCCaisseCarteFid": 22,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 76,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "290,95",
      "CACaisseCarteFid": "4,14",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 168,
      "UVCCaisseCarteFid": 2,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 51,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "173,78",
      "CACaisseCarteFid": "37,73",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 90,
      "UVCCaisseCarteFid": 13,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 32,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "302,74",
      "CACaisseCarteFid": "17,58",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 140,
      "UVCCaisseCarteFid": 7,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 38,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "510,07",
      "CACaisseCarteFid": "217,09",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 217,
      "UVCCaisseCarteFid": 100,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "523,61",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 260,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 49,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "458,41",
      "CACaisseCarteFid": "28,05",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 217,
      "UVCCaisseCarteFid": 12,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "294,22",
      "CACaisseCarteFid": "23,08",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 123,
      "UVCCaisseCarteFid": 4,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 30,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "259,75",
      "CACaisseCarteFid": "12,98",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 142,
      "UVCCaisseCarteFid": 13,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "234,16",
      "CACaisseCarteFid": "32,41",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 107,
      "UVCCaisseCarteFid": 16,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 32,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "630,73",
      "CACaisseCarteFid": "127,6",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 288,
      "UVCCaisseCarteFid": 69,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 50,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "638,33",
      "CACaisseCarteFid": "186,19",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 337,
      "UVCCaisseCarteFid": 94,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 68,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "569,72",
      "CACaisseCarteFid": "100,75",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 307,
      "UVCCaisseCarteFid": 48,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 81,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "236,83",
      "CACaisseCarteFid": "29,84",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 117,
      "UVCCaisseCarteFid": 11,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 35,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "200,94",
      "CACaisseCarteFid": "3,3",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 115,
      "UVCCaisseCarteFid": 4,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 34,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "355,1",
      "CACaisseCarteFid": "27,04",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 177,
      "UVCCaisseCarteFid": 14,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 51,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "306,01",
      "CACaisseCarteFid": "21,08",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 158,
      "UVCCaisseCarteFid": 11,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 51,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "565,08",
      "CACaisseCarteFid": "216,43",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 228,
      "UVCCaisseCarteFid": 81,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "428,77",
      "CACaisseCarteFid": "32,41",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 200,
      "UVCCaisseCarteFid": 15,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 47,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "313,3",
      "CACaisseCarteFid": "9,16",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 129,
      "UVCCaisseCarteFid": 3,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 37,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "08:00:00",
      "CACaisse": "252,72",
      "CACaisseCarteFid": "14,46",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 158,
      "UVCCaisseCarteFid": 9,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 47,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "09:00:00",
      "CACaisse": "354,89",
      "CACaisseCarteFid": "92,91",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 175,
      "UVCCaisseCarteFid": 48,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 41,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "10:00:00",
      "CACaisse": "390,52",
      "CACaisseCarteFid": "129,25",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 212,
      "UVCCaisseCarteFid": 67,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 51,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "11:00:00",
      "CACaisse": "508,29",
      "CACaisseCarteFid": "108,82",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 252,
      "UVCCaisseCarteFid": 44,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 62,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "12:00:00",
      "CACaisse": "532,18",
      "CACaisseCarteFid": "121,83",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 265,
      "UVCCaisseCarteFid": 39,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 57,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "13:00:00",
      "CACaisse": "188,74",
      "CACaisseCarteFid": "12,99",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 85,
      "UVCCaisseCarteFid": 9,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 20,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "14:00:00",
      "CACaisse": "111,03",
      "CACaisseCarteFid": "4,7",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 49,
      "UVCCaisseCarteFid": 2,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 23,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "15:00:00",
      "CACaisse": "175,2",
      "CACaisseCarteFid": "37,94",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 77,
      "UVCCaisseCarteFid": 12,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 24,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "16:00:00",
      "CACaisse": "568,96",
      "CACaisseCarteFid": "199,43",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 241,
      "UVCCaisseCarteFid": 93,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 53,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "17:00:00",
      "CACaisse": "628,4",
      "CACaisseCarteFid": "186,41",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 262,
      "UVCCaisseCarteFid": 60,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 67,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "18:00:00",
      "CACaisse": "507,81",
      "CACaisseCarteFid": "73,97",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 266,
      "UVCCaisseCarteFid": 42,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 63,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "31/05/17",
      "HEENCTCK": "19:00:00",
      "CACaisse": "383,9",
      "CACaisseCarteFid": "76,87",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 158,
      "UVCCaisseCarteFid": 30,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 46,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "386,56",
      "CACaisseCarteFid": "151,39",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 205,
      "UVCCaisseCarteFid": 60,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 54,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "239,08",
      "CACaisseCarteFid": "83,78",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 97,
      "UVCCaisseCarteFid": 40,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 27,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "661,66",
      "CACaisseCarteFid": "249,33",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 294,
      "UVCCaisseCarteFid": 122,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 45,
      "NbTicketCarteFid": 13,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "798,81",
      "CACaisseCarteFid": "187,44",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 345,
      "UVCCaisseCarteFid": 71,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 65,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "371,51",
      "CACaisseCarteFid": "60,25",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 186,
      "UVCCaisseCarteFid": 18,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 60,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "241,81",
      "CACaisseCarteFid": "19,24",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 124,
      "UVCCaisseCarteFid": 10,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 39,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "188,69",
      "CACaisseCarteFid": "5,99",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 94,
      "UVCCaisseCarteFid": 3,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 30,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "179,78",
      "CACaisseCarteFid": "50,58",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 89,
      "UVCCaisseCarteFid": 21,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 27,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "334,41",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 166,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "799,24",
      "CACaisseCarteFid": "354,5",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 341,
      "UVCCaisseCarteFid": 156,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 49,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "499,4",
      "CACaisseCarteFid": "54,72",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 188,
      "UVCCaisseCarteFid": 22,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 59,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "24/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "281,45",
      "CACaisseCarteFid": "32,06",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 129,
      "UVCCaisseCarteFid": 16,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 33,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "396,3",
      "CACaisseCarteFid": "175,05",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 188,
      "UVCCaisseCarteFid": 79,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 49,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "201,12",
      "CACaisseCarteFid": "37,07",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 102,
      "UVCCaisseCarteFid": 19,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 29,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "653,15",
      "CACaisseCarteFid": "326,23",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 282,
      "UVCCaisseCarteFid": 141,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 53,
      "NbTicketCarteFid": 13,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "367,24",
      "CACaisseCarteFid": "86,13",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 200,
      "UVCCaisseCarteFid": 43,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 57,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "508,36",
      "CACaisseCarteFid": "88,47",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 238,
      "UVCCaisseCarteFid": 42,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 63,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "284,14",
      "CACaisseCarteFid": "42,04",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 124,
      "UVCCaisseCarteFid": 12,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 29,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "95,43",
      "CACaisseCarteFid": "1,64",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 53,
      "UVCCaisseCarteFid": 1,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 23,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "356,34",
      "CACaisseCarteFid": "63,35",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 145,
      "UVCCaisseCarteFid": 35,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 33,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "378,75",
      "CACaisseCarteFid": "44,77",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 147,
      "UVCCaisseCarteFid": 15,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 34,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "376,52",
      "CACaisseCarteFid": "65,59",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 202,
      "UVCCaisseCarteFid": 32,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "780,68",
      "CACaisseCarteFid": "142,96",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 339,
      "UVCCaisseCarteFid": 39,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 57,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "25/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "266,61",
      "CACaisseCarteFid": "22,05",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 101,
      "UVCCaisseCarteFid": 8,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 20,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "400,13",
      "CACaisseCarteFid": "65,51",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 191,
      "UVCCaisseCarteFid": 36,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 43,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "374,36",
      "CACaisseCarteFid": "202,18",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 157,
      "UVCCaisseCarteFid": 84,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 34,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "684,42",
      "CACaisseCarteFid": "380,12",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 297,
      "UVCCaisseCarteFid": 158,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 54,
      "NbTicketCarteFid": 17,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "592,44",
      "CACaisseCarteFid": "184,85",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 275,
      "UVCCaisseCarteFid": 86,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 64,
      "NbTicketCarteFid": 16,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "408,95",
      "CACaisseCarteFid": "178,61",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 188,
      "UVCCaisseCarteFid": 73,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 45,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "232,82",
      "CACaisseCarteFid": "43,11",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 99,
      "UVCCaisseCarteFid": 9,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 25,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "231,44",
      "CACaisseCarteFid": "19,7",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 94,
      "UVCCaisseCarteFid": 7,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 35,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "257,14",
      "CACaisseCarteFid": "28,71",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 112,
      "UVCCaisseCarteFid": 6,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 30,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "215,08",
      "CACaisseCarteFid": "9,99",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 100,
      "UVCCaisseCarteFid": 2,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 32,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "345,38",
      "CACaisseCarteFid": "18,12",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 144,
      "UVCCaisseCarteFid": 8,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "438,84",
      "CACaisseCarteFid": "81,23",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 190,
      "UVCCaisseCarteFid": 34,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 55,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "26/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "287,45",
      "CACaisseCarteFid": "21,61",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 138,
      "UVCCaisseCarteFid": 8,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 28,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "219,18",
      "CACaisseCarteFid": "65,12",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 109,
      "UVCCaisseCarteFid": 24,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 28,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "323,14",
      "CACaisseCarteFid": "39,39",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 136,
      "UVCCaisseCarteFid": 23,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 37,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "505,19",
      "CACaisseCarteFid": "199,28",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 213,
      "UVCCaisseCarteFid": 73,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 55,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "895,85",
      "CACaisseCarteFid": "260,74",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 354,
      "UVCCaisseCarteFid": 81,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 86,
      "NbTicketCarteFid": 14,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "27/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "445,11",
      "CACaisseCarteFid": "67,46",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 184,
      "UVCCaisseCarteFid": 30,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 40,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "333,04",
      "CACaisseCarteFid": "130,74",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 180,
      "UVCCaisseCarteFid": 71,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "245,31",
      "CACaisseCarteFid": "73,29",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 132,
      "UVCCaisseCarteFid": 29,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 34,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "554,62",
      "CACaisseCarteFid": "240,94",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 266,
      "UVCCaisseCarteFid": 107,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 56,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "618,57",
      "CACaisseCarteFid": "177,3",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 268,
      "UVCCaisseCarteFid": 71,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 61,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "361,6",
      "CACaisseCarteFid": "20,45",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 187,
      "UVCCaisseCarteFid": 9,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 56,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "220,58",
      "CACaisseCarteFid": "20,22",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 86,
      "UVCCaisseCarteFid": 14,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 29,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "234,32",
      "CACaisseCarteFid": "101,96",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 122,
      "UVCCaisseCarteFid": 46,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 18,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "184,98",
      "CACaisseCarteFid": "61,8",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 90,
      "UVCCaisseCarteFid": 22,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 28,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "448,13",
      "CACaisseCarteFid": "2,9",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 205,
      "UVCCaisseCarteFid": 2,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 1,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "374,78",
      "CACaisseCarteFid": "35,44",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 196,
      "UVCCaisseCarteFid": 19,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "436,43",
      "CACaisseCarteFid": "132,19",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 192,
      "UVCCaisseCarteFid": 57,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 43,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "28/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "158,41",
      "CACaisseCarteFid": "34,69",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 72,
      "UVCCaisseCarteFid": 12,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 17,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "399,15",
      "CACaisseCarteFid": "135,92",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 192,
      "UVCCaisseCarteFid": 49,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 48,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "290,38",
      "CACaisseCarteFid": "139,14",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 148,
      "UVCCaisseCarteFid": 70,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 22,
      "NbTicketCarteFid": 7,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "368,95",
      "CACaisseCarteFid": "128,56",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 180,
      "UVCCaisseCarteFid": 64,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 44,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "601,61",
      "CACaisseCarteFid": "168,44",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 279,
      "UVCCaisseCarteFid": 82,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 67,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "375,32",
      "CACaisseCarteFid": "101,53",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 181,
      "UVCCaisseCarteFid": 47,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 61,
      "NbTicketCarteFid": 11,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "324,05",
      "CACaisseCarteFid": "6,47",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 128,
      "UVCCaisseCarteFid": 4,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 32,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "138,1",
      "CACaisseCarteFid": "16,64",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 76,
      "UVCCaisseCarteFid": 6,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 28,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "298,11",
      "CACaisseCarteFid": "50,56",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 142,
      "UVCCaisseCarteFid": 21,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 36,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "350,46",
      "CACaisseCarteFid": "51,68",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 172,
      "UVCCaisseCarteFid": 21,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 46,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "570,97",
      "CACaisseCarteFid": "96,93",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 220,
      "UVCCaisseCarteFid": 31,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 51,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "585,81",
      "CACaisseCarteFid": "94,26",
      "CACaisseCartePaiement": "8,02",
      "UVCCaisse": 278,
      "UVCCaisseCarteFid": 46,
      "UVCCaisseCartePaiement": 3,
      "NbTicket": 64,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 1
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "29/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "182,6",
      "CACaisseCarteFid": 0,
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 75,
      "UVCCaisseCarteFid": 0,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 22,
      "NbTicketCarteFid": 0,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "08:00:00",
      "CACaisse": "229,41",
      "CACaisseCarteFid": "45,51",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 154,
      "UVCCaisseCarteFid": 27,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 38,
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "09:00:00",
      "CACaisse": "264,22",
      "CACaisseCarteFid": "110,24",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 134,
      "UVCCaisseCarteFid": 48,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 32,
      "NbTicketCarteFid": 8,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "10:00:00",
      "CACaisse": "354,76",
      "CACaisseCarteFid": "84,03",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 164,
      "UVCCaisseCarteFid": 41,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 45,
      "NbTicketCarteFid": 9,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "11:00:00",
      "CACaisse": "481,21",
      "CACaisseCarteFid": "128,22",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 222,
      "UVCCaisseCarteFid": 60,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 68,
      "NbTicketCarteFid": 10,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "12:00:00",
      "CACaisse": "443,55",
      "CACaisseCarteFid": "77,61",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 200,
      "UVCCaisseCarteFid": 39,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "13:00:00",
      "CACaisse": "186,79",
      "CACaisseCarteFid": "34,76",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 89,
      "UVCCaisseCarteFid": 17,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 28,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "14:00:00",
      "CACaisse": "128,66",
      "CACaisseCarteFid": "44,25",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 67,
      "UVCCaisseCarteFid": 25,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 17,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "15:00:00",
      "CACaisse": "264,95",
      "CACaisseCarteFid": "122,49",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 114,
      "UVCCaisseCarteFid": 40,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 31,
      "NbTicketCarteFid": 2,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "16:00:00",
      "CACaisse": "509,03",
      "CACaisseCarteFid": "45,5",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 210,
      "UVCCaisseCarteFid": 17,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 46,
      "NbTicketCarteFid": 4,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "17:00:00",
      "CACaisse": "393,5",
      "CACaisseCarteFid": "72,87",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 188,
      "UVCCaisseCarteFid": 33,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 57,
      "NbTicketCarteFid": 6,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "18:00:00",
      "CACaisse": "582,11",
      "CACaisseCarteFid": "32,19",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 228,
      "UVCCaisseCarteFid": 13,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 52,
      "NbTicketCarteFid": 3,
      "NbTicketCartePaiement": 0
    },
    {
      "CDSRVMAG": 83851,
      "DTENCTCK": "30/05/18",
      "HEENCTCK": "19:00:00",
      "CACaisse": "529,36",
      "CACaisseCarteFid": "185,05",
      "CACaisseCartePaiement": 0,
      "UVCCaisse": 190, //articles
      "UVCCaisseCarteFid": 55,
      "UVCCaisseCartePaiement": 0,
      "NbTicket": 29, //clients
      "NbTicketCarteFid": 5,
      "NbTicketCartePaiement": 0
    }
  ];

  constructor() {

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

  ngOnChanges(){
    console.log("coucou");
  }

  ngOnDestroy() { 
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
          ClientCurNF.push(newValue);
          ClientCurFid.push(newValueFid);

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
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",],
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
          labels: ["0", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",],
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

  ngOnInit() {
    this.graph = 1;
    
    this.calculus("25/05/18", "25/05/17");

  }

  
                

}
