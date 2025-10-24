import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartType } from 'angular-google-charts';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { addIcons } from 'ionicons';
import {
  trendingUpOutline,
  trendingDownOutline,
  timeOutline,
  peopleOutline,
  documentTextOutline,
  cashOutline,
} from 'ionicons/icons';

interface KPICard {
  title: string;
  value: string;
  subtitle: string;
  trend?: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-google-charts',
  templateUrl: './dashboard-google-charts.page.html',
  styleUrls: ['./dashboard-google-charts.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    GoogleChartsModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class DashboardGoogleChartsPage implements OnInit {
  kpiCards: KPICard[] = [];


  spendChartType = ChartType.ColumnChart;
  spendChartColumns = ['Categoria', 'Valor', { role: 'style' }];
  spendChartData: any[] = [
    ['Materiais de Escritório', 15000, '#3880ff'],
    ['Equipamentos', 45000, '#2dd36f'],
    ['Serviços', 30000, '#ffc409'],
  ];

  spendChartOptions = {
    title: 'Spend por Categoria',
    titleTextStyle: { color: '#ffffff', fontSize: 18, bold: true },
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    hAxis: {
      textStyle: { color: '#ffffff' },
      gridlines: { color: 'transparent' },
    },
    vAxis: {
      title: 'Valor (R$)',
      titleTextStyle: { color: '#ffffff' },
      textStyle: { color: '#ffffff' },
      gridlines: { color: '#333333' },
      format: 'R$ #,###',
    },
    bar: { groupWidth: '70%' },
    tooltip: { isHtml: true },
  };

  // ColumnChart - Savings
  savingsChartType = ChartType.ColumnChart;
  savingsChartColumns = ['Comprador', 'Savings'];
  savingsChartData: any[][] = [
    ['João', 12000],
    ['Maria', 18000],
    ['Carlos', 9000],
    ['Ana', 15000],
    ['Lucas', 7000],
  ];

  savingsChartOptions = {
    title: 'Savings por Comprador',
    titleTextStyle: { color: '#ffffff', fontSize: 18, bold: true },
    colors: ['#2dd36f'],
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    hAxis: {
      textStyle: { color: '#ffffff' },
      gridlines: { color: 'transparent' },
    },
    vAxis: {
      title: 'Savings (R$)',
      titleTextStyle: { color: '#ffffff' },
      textStyle: { color: '#ffffff' },
      gridlines: { color: '#333333' },
      format: 'R$ #,###',
    },
    bar: { groupWidth: '60%' },
    tooltip: { isHtml: true },
  };

  // BarChart - Maverick Spend
  maverickChartType = ChartType.BarChart;
  maverickChartColumns = ['Centro de Custo', 'Valor'];
  maverickChartData: any[][] = [
    ['Marketing', 12000],
    ['TI', 9500],
    ['Manutenção', 8500],
    ['Compras Gerais', 7000],
    ['Logística', 6500],
  ];

  maverickChartOptions = {
    title: 'Gastos Dissidentes',
    titleTextStyle: { color: '#ffffff', fontSize: 18, bold: true },
    backgroundColor: 'transparent',
    colors: ['#eb445a'],
    legend: { position: 'none' },
    hAxis: {
      title: 'Valor (R$)',
      titleTextStyle: { color: '#ffffff' },
      textStyle: { color: '#ffffff' },
      gridlines: { color: '#333333' },
      format: 'R$ #,###',
    },
    vAxis: {
      textStyle: { color: '#ffffff' },
      gridlines: { color: 'transparent' },
    },
    bar: { groupWidth: '60%' },
  };

  // PieChart Aderência
  contractChartType = ChartType.PieChart;
  contractChartColumns = ['Tipo', 'Valor'];
  contractChartData: any[][] = [
    ['Compras em Contrato', 75000],
    ['Compras Avulsas (Spot)', 25000],
  ];

  contractChartOptions = {
    title: 'Aderência a Contratos',
    pieHole: 0.4,
    colors: ['#2dd36f', '#ffc409'],
    titleTextStyle: { color: '#ffffff', fontSize: 18, bold: true },
    legend: { position: 'bottom', textStyle: { color: '#ffffff' } },
    pieSliceText: 'percentage',
    pieSliceTextStyle: { color: '#ffffff', fontSize: 14 },
    tooltip: { isHtml: true, trigger: 'focus' },
    backgroundColor: 'transparent',
  };

  // PieChart Concentração
  concentrationChartType = ChartType.PieChart;
  concentrationChartColumns = ['Fornecedor', 'Spend'];
  concentrationChartData: any[][] = [
    ['Fornecedor A', 40000],
    ['Fornecedor B', 25000],
    ['Fornecedor C', 15000],
    ['Fornecedor D', 10000],
    ['Fornecedor E', 5000],
    ['Outros', 5000],
  ];

  concentrationChartOptions = {
    title: 'Risco de Concentração',
    pieHole: 0.4,
    colors: ['#3880ff', '#2dd36f', '#ffc409', '#eb445a', '#92949c', '#666666'],
    titleTextStyle: { color: '#ffffff', fontSize: 18, bold: true },
    legend: { position: 'bottom', textStyle: { color: '#ffffff' } },
    pieSliceText: 'percentage',
    pieSliceTextStyle: { color: '#ffffff', fontSize: 12 },
    tooltip: { isHtml: true, trigger: 'focus' },
    backgroundColor: 'transparent',
  };

  // Tabela de dados
  displayedColumns: string[] = [
    'produto',
    'custoAnterior',
    'custoAtual',
    'variacao',
  ];
  dataSource = [
    { produto: 'Produto A', custoAnterior: 50, custoAtual: 55, variacao: 5 },
    { produto: 'Produto B', custoAnterior: 120, custoAtual: 115, variacao: -5 },
    { produto: 'Produto C', custoAnterior: 200, custoAtual: 210, variacao: 10 },
    { produto: 'Produto D', custoAnterior: 75, custoAtual: 70, variacao: -5 },
    { produto: 'Produto E', custoAnterior: 95, custoAtual: 100, variacao: 5 },
  ];

  constructor() {
    addIcons({
      trendingUpOutline,
      trendingDownOutline,
      timeOutline,
      peopleOutline,
      documentTextOutline,
      cashOutline,
    });
  }

  ngOnInit() {
    this.initializeKPIs();
  }

  initializeKPIs() {
    this.kpiCards = [
      {
        title: 'Spend Total',
        value: 'R$ 122k',
        subtitle: 'Gasto total no período',
        trend: 8.5,
        icon: 'cash-outline',
        color: 'primary',
      },
      {
        title: 'Savings Realizados',
        value: 'R$ 61k',
        subtitle: 'Economia total',
        trend: 12.3,
        icon: 'trending-up-outline',
        color: 'success',
      },
      {
        title: 'Lead Time Médio',
        value: '8.5 dias',
        subtitle: 'SC até entrada NF',
        trend: -5.2,
        icon: 'time-outline',
        color: 'warning',
      },
      {
        title: 'Aderência Contratos',
        value: '75%',
        subtitle: 'Compras com contrato',
        trend: 3.8,
        icon: 'document-text-outline',
        color: 'tertiary',
      },
      {
        title: 'Maverick Spend',
        value: 'R$ 44k',
        subtitle: 'Gastos sem PC',
        trend: -8.1,
        icon: 'people-outline',
        color: 'danger',
      },
      {
        title: 'OTIF Score',
        value: '92.3%',
        subtitle: 'Entregas no prazo',
        trend: 2.1,
        icon: 'trending-up-outline',
        color: 'success',
      },
    ];
  }
}
