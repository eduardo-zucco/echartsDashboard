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
  text,
} from 'ionicons/icons';

import * as echarts from 'echarts/core';
import { BarChart, FunnelChart, LineChart, PieChart, TreemapChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { interval } from 'rxjs';

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
  LineChart,
]);

interface KPICard {
  title: string;
  value: string;
  subtitle: string;
  trend?: number;
  icon: string;
  color: string;
}
interface BuilderJson {
  all: number;
  charts: Record<string, number>;
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
  optionRankingClientes!: EChartsCoreOption;
  optionCurvaABC!: EChartsCoreOption;
  optionTeste!: EChartsCoreOption;
  option!: EChartsCoreOption;
  optionHorizontalBar!: EChartsCoreOption;
  margemBrutaOption!: EChartsCoreOption;

  clientesXFaturamento!: EChartsCoreOption;
  kpiCards: KPICard[] = [];

  produtosMaisVendidosOption!: EChartsCoreOption;


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

  chartInstances: { [key: string]: any } = {};

  onChartInit(chartInstance: any, id: string) {
    this.chartInstances[id] = chartInstance;

    // Redimensiona o gráfico para o tamanho da tela
    chartInstance.resize();

    // Redimensiona automaticamente ao mudar a tela
    window.addEventListener('resize', () => chartInstance.resize());
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
    const data = [18203, 23489, 29034, 104970, 131744, 630230];
    const produtosMaisVendidosData = {
      produtos: [
        'Smartphone X',
        'Notebook Pro',
        'Fone Bluetooth',
        'Monitor 24"',
        'Teclado Mecânico'
      ],
      vendas: [150, 80, 230, 120, 95].sort((a, b) => b - a),
    };

    this.margemBrutaOption = {
      title: {
        text: 'Margem Bruta por Mês',
        textStyle: { fontSize: 15 }
      },
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',

      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        axisLabel: { rotate: 30, interval: 0 },

      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [20, 34, 25, 40, 45, 50, 30, 60, 55, 70],
          type: 'bar',
          itemStyle: { color: '#8dc6eb' },
        }
      ],
      media: [
        {
          query: { maxWidth: 668 },
          option: {
            title: { left: 'center', textStyle: { fontSize: 14 } },
            xAxis: {
              axisLabel: {
                rotate: 45,
                width: 75,
                overflow: 'truncate',
                ellipsis: '...'
              }
            }
          }
        }
      ]



    };

    this.produtosMaisVendidosOption = {
      title: {
        text: 'Produtos Mais Vendidos',
        show: true,
        textStyle: { fontSize: 15 }
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        appendToBody: true,
        axisPointer: { type: 'shadow' }
      },
      legend: { show: false },
      grid: {
        left: '5%',
        right: '8%',
        bottom: '10%',
        top: '15%',
        containLabel: false
      },
      xAxis: {
        type: 'value',
        show: true,
        axisLine: { show: false },
        z: 2,
        axisTick: { show: false },
        axisLabel: {
          formatter: '{value}',
          inside: false,
          show: true,
          interval: 0,
          rotate: 45
        },
        boundaryGap: [0, 0.01]
      },
      yAxis: [
        {
          type: 'category',
          data: produtosMaisVendidosData.produtos,
          show: true,
          inverse: true,
          position: 'left',
          axisLine: { show: false },
          z: 3,
          axisTick: { show: false },
          axisLabel: {
            color: '#ffffff',
            inside: true,
            show: true
          },
          nameLocation: 'start'
        }
      ],
      series: [
        {
          type: 'bar',
          data: produtosMaisVendidosData.vendas,
          label: {
            show: false,
            formatter: '{c}',
            position: 'right',
            distance: 0
          },
          itemStyle: {
            color: '#3991cf',
            borderRadius: 4
          }
        }
      ],
      media: [
        {
          query: { maxWidth: 668 },
          option: {
            title: { textStyle: { fontSize: 14 } }
          }
        }
      ]
    };
    this.clientesXFaturamento = {
      title: {
        text: "Ranking de clientes por faturamento",
        show: true,

      },
      tooltip: {
        trigger: "axis",
        show: true,
        axisPointer: {
          type: "none"
        }
      },
      legend: { show: false },
      grid: { containLabel: true },
      xAxis: {
        type: "value",
        show: true,

        axisLine: {
          show: false
        },

        z: 2,
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: "{value}",

          inside: false,
          show: true,
          interval: 0,
          rotate: 45
        },
        boundaryGap: [0, 0.01]
      },
      yAxis: [{
        type: "category",
        data: ['cliente A', 'cliente B', 'cliente C', 'cliente D', 'cliente E', 'cliente F'],
        show: true,
        position: "left",
        axisLine: {
          show: false
        },
        z: 3,
        axisTick: {
          show: false
        },
        axisLabel: {

          inside: true,
          color: "#ffff",
          show: true
        },
        nameLocation: "start"
      },
      ],
      series: [
        {

          type: "bar",
          data: data,
          label: {
            show: false,
            formatter: "{c}",
            position: "right",
            distance: 0
          },

          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#008D8E"
                },
                {
                  offset: 1,
                  color: "#24C1C3"
                }
              ],
              global: false
            },
            borderRadius: 4,

          }
        }
      ]
    }

    const seriesData: number[] = [1, 1, 2,];

    this.optionHorizontalBar = {
      color: ['#3398DB'],
      grid: { containLabel: true },
      yAxis: [
        {
          type: 'category',
          data: [
            'logisdtoajfsdg',
            'jkdgfçdfklh]fgj',
            'sjkdhfg~lçdfkh]~lçjg]fghkhjdgfhkdjklildswyufkjlsfdghjdbflgdbk',
          ]
        },
        {
          type: 'category',
          data: seriesData,
          axisLine: { show: false },
          axisTick: { show: false }
        }
      ],
      xAxis: [
        {
          type: 'value',
          splitLine: { show: false }
        }
      ],
      series: [
        {
          type: 'bar',
          data: seriesData
        }
      ]
    }

    const builderJson: BuilderJson = {
      all: 100,
      charts: {
        pie: 1,
        scatter: 1,
        candlestick: 1,
        radar: 2,
        heatmap: 3,
        treemap: 6,
        graph: 7,
        boxplot: 7,
        parallel: 8,
        gauge: 9,
        funnel: 15,
        sankey: 30
      }
    };

    this.option = {
      xAxis: [
        {
          type: 'value',
          max: builderJson.all,
          axisLabel: { show: false },
          splitLine: { show: false }
        }
      ],
      yAxis: [
        {
          data: Object.keys(builderJson.charts),
          axisLabel: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
        }
      ],
      series: [
        {
          type: 'bar',
          stack: 'chart',
          barCategoryGap: 30,
          barWidth: 20,
          label: {
            position: [0, -14],
            formatter: '{b}',
            show: true
          },
          itemStyle: {
            borderRadius: [0, 2, 2, 0]
          },
          data: Object.keys(builderJson.charts).map(key => builderJson.charts[key])
        },
        {
          type: 'bar',
          stack: 'chart',
          barCategoryGap: 30,
          barWidth: 20,
          itemStyle: { color: 'whitesmoke' },
          label: {
            position: 'insideRight',
            formatter: (params: any) => `${100 - params.value}%`,
            show: true
          },
          data: Object.keys(builderJson.charts).map(
            key => builderJson.all - builderJson.charts[key]
          )
        }
      ]
    };



    const textColor = '#ffffff';
    const axisColor = '#666666';


    type DataPoint = [number, number];

    // Dados da "Classe A" (0% a 80% do valor)
    // 3. 'dataA' agora é explicitamente um array de DataPoint
    const dataA: DataPoint[] = [
      [0, 0],
      [10, 60],
      [20, 80] // Atingiu o limite de 80%
    ];

    // Dados da "Classe B" (80% a 95% do valor)
    const dataB: DataPoint[] = [
      [20, 80], // Ponto de conexão
      [30, 88],
      [40, 92],
      [50, 95] // Atingiu o limite de 95%
    ];

    // Dados da "Classe C" (95% a 100% do valor)
    const dataC: DataPoint[] = [
      [50, 95], // Ponto de conexão
      [60, 97],
      [70, 98],
      [80, 99],
      [90, 99.5],
      [100, 100]
    ];

    // Estilo de linha comum para todas as séries
    // 4. 'commonLineStyle' também recebe um tipo explícito
    const commonLineStyle: { color: string; width: number } = {
      color: '#000',
      width: 3
    };

    this.optionTeste = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => { // 6. 'params' tipado como 'any'
          // Tooltip personalizado para mostrar apenas um valor
          const point = params[0]; // Pega o primeiro ponto (todos são iguais)
          return `Itens: <b>${point.axisValue}%</b><br/>Valor Acumulado: <b>${point.data[1]}%</b>`;
        }
      },

      // Eixo X (Percentual de Itens)
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },

      // Eixo Y (Percentual de Valor Acumulado)
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },

      series: [
        {
          name: 'Classe A',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: dataA, // O TS sabe que isso é DataPoint[]
          lineStyle: commonLineStyle,
          areaStyle: {
            color: 'rgba(211, 47, 47, 0.7)' // Vermelho
          }
        },
        {
          name: 'Classe B',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: dataB, // O TS sabe que isso é DataPoint[]
          lineStyle: commonLineStyle,
          areaStyle: {
            color: 'rgba(25, 118, 210, 0.7)' // Azul
          }
        },
        {
          name: 'Classe C',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: dataC, // O TS sabe que isso é DataPoint[]
          lineStyle: commonLineStyle,
          areaStyle: {
            color: 'rgba(245, 124, 0, 0.7)' // Laranja
          }
        }
      ]
    };




    // this.optionConcentration = {
    //   title: {
    //     text: 'Risco de Concentração',
    //     left: 'center',
    //     textStyle: {
    //       color: textColor,
    //       fontSize: 18,
    //       fontWeight: 'bold',
    //     },
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{b}: R$ {c} ({d}%)',
    //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
    //     borderColor: '#333',
    //     textStyle: { color: '#fff' },
    //   },
    //   legend: {
    //     bottom: 10,
    //     left: 'center',
    //     data: this.concentrationData.map((d) => d.name),
    //     textStyle: { color: textColor },
    //   },
    //   series: [
    //     {
    //       name: 'Spend Total',
    //       type: 'pie',
    //       radius: ['50%', '75%'],
    //       avoidLabelOverlap: false,
    //       itemStyle: {
    //         // borderRadius: 8,
    //         borderColor: '#1e1e1e',
    //         borderWidth: 2,
    //       },
    //       label: {
    //         show: true,
    //         position: 'outside',
    //         formatter: '{d}%',
    //         color: textColor,
    //       },
    //       emphasis: {
    //         label: { show: true, fontSize: 16, fontWeight: 'bold' },
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)',
    //         },
    //       },
    //       labelLine: { show: true, lineStyle: { color: axisColor } },
    //       data: this.concentrationData,
    //     },
    //   ],
    //   media: [
    //     {
    //       query: { maxWidth: 768 },
    //       option: {
    //         legend: { orient: 'vertical', bottom: 0, left: 'center' },
    //         series: [
    //           {
    //             radius: ['30%', '50%'],
    //             center: ['50%', '40%'],
    //             label: { show: false },
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // };

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
        inverse: false,
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
      media: [
        {
          query: { maxWidth: 668 },
          option: {
            series: [
              {
                radius: ['30%', '50%'],
                center: ['50%', '40%'],
                label: { show: false },
              },
            ],
          },
        },
      ],
    };

    const mock = {
      classeA: [
        { percentualItens: 0, percentualValor: 0 },
        { percentualItens: 10, percentualValor: 60 },
        { percentualItens: 20, percentualValor: 80 }
      ],
      classeB: [
        { percentualItens: 20, percentualValor: 80 },
        { percentualItens: 30, percentualValor: 88 },
        { percentualItens: 40, percentualValor: 92 },
        { percentualItens: 50, percentualValor: 95 }
      ],
      classeC: [
        { percentualItens: 50, percentualValor: 95 },
        { percentualItens: 60, percentualValor: 97 },
        { percentualItens: 70, percentualValor: 98 },
        { percentualItens: 80, percentualValor: 99 },
        { percentualItens: 90, percentualValor: 99.5 },
        { percentualItens: 100, percentualValor: 100 }
      ]
    };

    // Exemplo: Curva ABC de Clientes — KPI 10
    this.optionCurvaABC = {
      title: { "text": "Curva ABC - Distribuição de Valor" },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const point = params[0];
          return `Clientes: <b>${point.axisValue}%</b><br/>Valor acumulado: <b>${point.data[1]}%</b>`;
        }

      },
      legend: {
        top: 'bottom',
        left: 'center',
        textStyle: {
          color: textColor
        }
      },
      xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
      yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
      series: [
        {
          name: 'Classe A',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: mock.classeA.map(p => [p.percentualItens, p.percentualValor]),
          lineStyle: { color: '#000', width: 3 },
          areaStyle: { color: 'rgba(211, 47, 47, 0.7)' },
          itemStyle: {
            color: 'rgba(211, 47, 47, 0.7)'
          }
        },
        {
          name: 'Classe B',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: mock.classeB.map(p => [p.percentualItens, p.percentualValor]),
          lineStyle: { color: '#000', width: 3 },
          areaStyle: { color: 'rgba(25, 118, 210, 0.7)' },
          itemStyle: {
            color: 'rgba(25, 118, 210, 0.7)'
          }
        },
        {
          name: 'Classe C',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: mock.classeC.map(p => [p.percentualItens, p.percentualValor]),
          lineStyle: { color: '#000', width: 3 },
          areaStyle: { color: 'rgba(245, 124, 0, 0.7)' },
          itemStyle: {
            color: 'rgba(245, 124, 0, 0.7)'
          }
        }
      ]

    };



    this.optionRankingClientes = {
      title: {
        text: 'Gastos Dissidentes',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: '{b}: R$ {c}',
      },
      xAxis: {
        type: 'category',
        data: [
          'Cliente A',
          'Cliente B',
          'Cliente C',
          'Cliente D',
          'Cliente E',
          'Cliente F',
          'Cliente G',
          'Cliente H',
          'Cliente I',
          'Cliente J',
          'Cliente K',
          'Cliente L',
          'Cliente M',
          'Cliente N',
          'Cliente O',
          'Cliente P',
          'Cliente Q',
          'Cliente R',
          'Cliente S',
          'Cliente T',
          'Cliente U',
          'Cliente V',
          'Cliente W',
          'Cliente X',
          'Cliente Y',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            12500, 9800, 15600, 8700, 19300, 22100, 13400, 8900, 14300, 17100,
            11600, 9700, 15200, 19900, 17800, 12300, 9100, 8400, 16500, 14800,
            10900, 9400, 13200, 18000, 15700,
          ],
          type: 'bar',
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
