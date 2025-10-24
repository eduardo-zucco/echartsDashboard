import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsCoreOption } from 'echarts/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { addIcons } from 'ionicons';
import {
  trendingUpOutline,
  trendingDownOutline,
  timeOutline,
  peopleOutline,
  documentTextOutline,
  cashOutline,
  cash,
} from 'ionicons/icons';

import * as echarts from 'echarts/core';
import { BarChart, FunnelChart, PieChart, TreemapChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([
  BarChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
  PieChart,
  FunnelChart,
  TitleComponent,
  ToolboxComponent,
  TreemapChart,
]);


interface KPICard {
  title: string;
  value: string;
  subtitle: string;
  trend?: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-teste-sweb',
  templateUrl: './dashboard-teste-sweb.page.html',
  styleUrls: ['./dashboard-teste-sweb.page.scss'],
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
    NgxEchartsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  ],
})
export class DashboardTesteSwebPage implements OnInit {

  optionSpend!: EChartsCoreOption;
  optionSavings!: EChartsCoreOption;
  optionContract!: EChartsCoreOption;
  optionMaverick!: EChartsCoreOption;
  optionConcentration!: EChartsCoreOption;

  kpiCards: KPICard[] = [];

  spendData = [
    { name: 'Materiais de Escritório', value: 15000 },
    { name: 'Equipamentos', value: 45000 },
    { name: 'Serviços', value: 30000 },
    { name: 'Software', value: 20000 },
    { name: 'Manutenção', value: 12000 },
  ];

  savingData = [
    { comprador: 'João', saving: 12000 },
    { comprador: 'Maria', saving: 18000 },
    { comprador: 'Carlos', saving: 9000 },
    { comprador: 'Ana', saving: 15000 },
    { comprador: 'Lucas', saving: 7000 },
  ];

  contractData = [
    { name: 'Compras em Contrato', value: 75000 },
    { name: 'Compras Avulsas (Spot)', value: 25000 },
  ];

  maverickData = [
    { centroCusto: 'Marketing', valor: 12000 },
    { centroCusto: 'TI', valor: 9500 },
    { centroCusto: 'Manutenção', valor: 8500 },
    { centroCusto: 'Compras Gerais', valor: 7000 },
    { centroCusto: 'Logística', valor: 6500 },
  ];

  concentrationData = [
    { name: 'Fornecedor A', value: 40000 },
    { name: 'Fornecedor B', value: 25000 },
    { name: 'Fornecedor C', value: 15000 },
    { name: 'Fornecedor D', value: 10000 },
    { name: 'Fornecedor E', value: 5000 },
    { name: 'Outros', value: 5000 },
  ];

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
      cash,
    });
  }

  ngOnInit() {
    this.initializeKPIs();
    this.initializeCharts();
  }

  initializeKPIs() {
    const totalSpend = this.spendData.reduce(
      (acc, item) => acc + item.value,
      0
    );
    const totalSavings = this.savingData.reduce(
      (acc, item) => acc + item.saving,
      0
    );
    const totalMaverick = this.maverickData.reduce(
      (acc, item) => acc + item.valor,
      0
    );
    const contractAdherence =
      (this.contractData[0].value /
        (this.contractData[0].value + this.contractData[1].value)) *
      100;

    this.kpiCards = [
      {
        title: 'Spend Total',
        value: `R$ ${(totalSpend / 1000).toFixed(0)}k`,
        subtitle: 'Gasto total no período',
        trend: 8.5,
        icon: 'cash-outline',
        color: 'primary',
      },
      {
        title: 'Savings Realizados',
        value: `R$ ${(totalSavings / 1000).toFixed(0)}k`,
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
        value: `${contractAdherence.toFixed(0)}%`,
        subtitle: 'Compras com contrato',
        trend: 3.8,
        icon: 'document-text-outline',
        color: 'tertiary',
      },
      {
        title: 'Maverick Spend',
        value: `R$ ${(totalMaverick / 1000).toFixed(0)}k`,
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

  initializeCharts() {
    const textColor = '#ffffff';
    const axisColor = '#666666';

    this.optionConcentration = {
      title: {
        text: 'Risco de Concentração',
        left: 'center',
        textStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: R$ {c} ({d}%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: this.concentrationData.map((d) => d.name),
        textStyle: { color: textColor },
      },
      series: [
        {
          name: 'Spend Total',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#1e1e1e',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{d}%',
            color: textColor,
          },
          emphasis: {
            label: { show: true, fontSize: 16, fontWeight: 'bold' },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: { show: true, lineStyle: { color: axisColor } },
          data: this.concentrationData,
        },
      ],
    };

    this.optionMaverick = {
      title: {
        text: 'Gastos Dissidentes',

        left: 'center',
        textStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: '{b}: R$ {c}',
      },
      grid: {
        left: '15%',
        right: '10%',
        bottom: '15%',
        top: '20%',
      },
      xAxis: {
        type: 'value',
        name: 'Valor (R$)',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisColor } },
        splitLine: { lineStyle: { color: '#333333' } },
      },
      yAxis: {
        type: 'category',
        data: this.maverickData.map((d) => d.centroCusto),
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisColor } },
        inverse: true,
      },
      series: [
        {
          name: 'Gastos Dissidentes',
          type: 'bar',
          data: this.maverickData.map((d) => d.valor),
          itemStyle: {
            color: '#eb445a',
            borderRadius: [0, 8, 8, 0],
          },
          barWidth: '50%',
          label: {
            show: true,
            position: 'right',
            formatter: 'R$ {c}',
            color: textColor,
          },
        },
      ],
    };

    this.optionContract = {
      title: {
        text: 'Aderência a Contratos',

        left: 'center',
        textStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: R$ {c} ({d}%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
      },
      legend: {
        bottom: 10,
        left: 'center',
        textStyle: { color: textColor },
      },
      series: [
        {
          name: 'Aderência',
          type: 'pie',
          radius: ['50%', '75%'],
          data: this.contractData,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#1e1e1e',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{d}%',
            color: textColor,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    this.optionSavings = {
      title: {
        text: 'Savings por Comprador',

        left: 'center',
        textStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: '{b}: R$ {c}',
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '20%',
      },
      xAxis: {
        type: 'category',
        data: this.savingData.map((item) => item.comprador),
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisColor } },
      },
      yAxis: {
        type: 'value',
        name: 'Savings (R$)',
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisColor } },
        splitLine: { lineStyle: { color: '#333333' } },
      },
      series: {
        data: this.savingData.map((item) => item.saving),
        type: 'bar',
        itemStyle: {
          color: '#2dd36f',
          borderRadius: [8, 8, 0, 0],
        },
        barWidth: '40%',
        label: {
          show: true,
          position: 'top',
          formatter: 'R$ {c}',
          color: textColor,
        },
      },
    };

    this.optionSpend = {
      title: {
        text: 'Spend por Categoria',

        left: 'center',
        textStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        formatter: (info: any) => {
          const value = info.value;
          const name = info.name;
          return `${name}: R$ ${value.toLocaleString()}`;
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
      },
      series: [
        {
          type: 'treemap',
          data: this.spendData,
          roam: false,
          label: {
            show: true,
            formatter: '{b}\nR$ {c}',
            color: '#fff',
          },
          breadcrumb: { show: false },
          itemStyle: {
            borderColor: '#1e1e1e',
            borderWidth: 2,
            gapWidth: 2,
          },
          levels: [
            {
              itemStyle: {
                borderColor: '#1e1e1e',
                borderWidth: 4,
                gapWidth: 4,
              },
            },
          ],
        },
      ],
    };
  }
}
