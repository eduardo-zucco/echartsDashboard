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
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
  selector: 'app-dashboard-ng2-charts',
  templateUrl: './dashboard-ng2-charts.page.html',
  styleUrls: ['./dashboard-ng2-charts.page.scss'],
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
    BaseChartDirective,
    MatTableModule,
    MatCardModule,
  ],
})
export class DashboardNg2ChartsPage implements OnInit {
  kpiCards: KPICard[] = [];


  spendChartData: ChartData<'bar'> = {
    labels: ['Materiais', 'Equipamentos', 'Serviços', 'Software', 'Manutenção'],
    datasets: [
      {
        label: 'Spend (R$)',
        data: [15000, 45000, 30000, 20000, 12000],
        backgroundColor: [
          '#3880ff',
          '#2dd36f',
          '#ffc409',
          '#eb445a',
          '#92949c',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  spendChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Spend por Categoria',
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: (context) => {
            const yValue = context.parsed.y;
            if (yValue !== null) {
              return `R$ ${yValue.toLocaleString()}`;
            } else {
              return 'N/A';
            }
          },
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
      x: {
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
    },
  };


  savingsChartData: ChartData<'bar'> = {
    labels: ['João', 'Maria', 'Carlos', 'Ana', 'Lucas'],
    datasets: [
      {
        label: 'Savings (R$)',
        data: [12000, 18000, 9000, 15000, 7000],
        backgroundColor: '#2dd36f',
        borderRadius: 8,
      },
    ],
  };

  savingsChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Savings por Comprador',
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: (context) => {
            const yValue = context.parsed.y;
            if (yValue !== null) {
              return `R$ ${yValue.toLocaleString()}`;
            } else {
              return 'N/A';
            }
          },
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
      x: {
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
    },
  };

  // Gastos Dissidentes (Horizontal Bar)
  maverickChartData: ChartData<'bar'> = {
    labels: ['Marketing', 'TI', 'Manutenção', 'Compras', 'Logística'],
    datasets: [
      {
        label: 'Maverick Spend',
        data: [12000, 9500, 8500, 7000, 6500],
        backgroundColor: '#eb445a',
        borderRadius: 8,
      },
    ],
  };

  maverickChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Gastos Dissidentes',
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',

      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
    },
  };

  // Aderência a Contratos (Doughnut)
  contractChartData: ChartData<'doughnut'> = {
    labels: ['Em Contrato', 'Spot'],
    datasets: [
      {
        data: [75000, 25000],
        backgroundColor: ['#2dd36f', '#ffc409'],
        borderWidth: 2,
        borderColor: '#1e1e1e',
      },
    ],
  };

  contractChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#ffffff' },
      },
      title: {
        display: true,
        text: 'Aderência a Contratos',
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Concentração de Fornecedores (Pie)
  concentrationChartData: ChartData<'pie'> = {
    labels: [
      'Fornecedor A',
      'Fornecedor B',
      'Fornecedor C',
      'Fornecedor D',
      'Fornecedor E',
      'Outros',
    ],
    datasets: [
      {
        data: [40000, 25000, 15000, 10000, 5000, 5000],
        backgroundColor: [
          '#3880ff',
          '#2dd36f',
          '#ffc409',
          '#eb445a',
          '#92949c',
          '#666666',
        ],
        borderWidth: 2,
        borderColor: '#1e1e1e',
      },
    ],
  };

  concentrationChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#ffffff' },
      },
      title: {
        display: true,
        text: 'Risco de Concentração',
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

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
