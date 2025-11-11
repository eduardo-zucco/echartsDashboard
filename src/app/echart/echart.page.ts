import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
} from '@ionic/angular/standalone';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsCoreOption } from 'echarts/core';

import * as echarts from 'echarts/core';
import { BarChart, FunnelChart, HeatmapChart, LineChart, PieChart, TreemapChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { text } from 'ionicons/icons';

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
  VisualMapComponent,
  HeatmapChart,
  LineChart
]);

@Component({
  selector: 'app-echart',
  templateUrl: './echart.page.html',
  styleUrls: ['./echart.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
  ],
})
export class EchartPage implements OnInit {
  options!: EChartsCoreOption;
  options2!: EChartsCoreOption;
  options3!: EChartsCoreOption;
  options4!: EChartsCoreOption;
  optionHeatmap!: EChartsCoreOption;
  optionLineStacked!: EChartsCoreOption;
  optionBar!: EChartsCoreOption;
  faturamentoTotalOption!: EChartsCoreOption;
  constructor() { }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

     this.faturamentoTotalOption = {
      title: {
        text: 'Faturamento Total - Comparativo',
        textStyle: {
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'axis',
        appendToBody: true
      },
      legend: {
        top: 'bottom',
        left: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '25%'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          rotate: 30,
          interval: 0
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ],
      media: [
        {
          query: {
            maxWidth: 668
          },
          option: {
            title: {
              left: 'center',
              textStyle: {
                fontSize: 14
              }
            },
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


    this.optionBar = {
      title: {
        text: 'Produtos mais Vendidos',
        textStyle: {
          fontSize: 15,
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',

      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          "rotate": 40,
          "interval": 0
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'bar'
        }
      ],
      media: [
        {
          query: {
            maxWidth: 668
          },
          option: {
            title: {

              left: "center",
              textStyle: {
                fontSize: 14
              }
            },
            axisLabel: {
              rotate: 45,
              width: 75,
              overflow: 'truncate',
              ellipsis: '...',
            }
          }
        }
      ]
    };


    this.optionLineStacked = {
      title: {
        text: 'Comparação de Faturamento',
        textStyle: {
          fontSize: 15,
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '23%',

      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [

      ],
      media: [
        {
          query: { maxWidth: 668 },
          option: {
            title: {
              textStyle: {
                fontSize: 14,
              }
            }
          }
        }
      ]
    };



    for (let i = 0; i < 10; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const clientes = ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D'];
    const produtos = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4'];

    // Os dados do heatmap devem ser no formato [indexProduto, indexCliente, Quantidade]
    // Ex: [0, 0, 10] = (Produto 1, Cliente A, 10)
    // Ex: [1, 2, 50] = (Produto 2, Cliente C, 50)
    const dataHeatmap = [
      [0, 0, 10], [1, 0, 25], [2, 0, 5], [3, 0, 33],
      [0, 1, 40], [1, 1, 12], [2, 1, 20], [3, 1, 8],
      [0, 2, 50], [1, 2, 5], [2, 2, 45], [3, 2, 15],
      [0, 3, 22], [1, 3, 30], [2, 3, 18], [3, 3, 2]
    ];

    // --- Configuração do Gráfico ---

    this.optionHeatmap = {
      title: {
        text: 'Heatmap: Clientes x Produtos',
        left: 'center'
      },
      // Tooltip mostra os nomes e o valor
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const p = params.value;
          return `
        <b>${clientes[p[1]]}</b><br/>
        <b>${produtos[p[0]]}</b><br/>
        Quantidade: <b>${p[2]}</b>
      `;
        },
        appendToBody: true
      },
      // Grid (área de plotagem)
      grid: {
        height: '60%',
        top: '10%'
      },
      // Eixo X (Produtos)
      xAxis: {
        type: 'category',
        data: produtos,
        splitArea: { show: true },
        axisLabel: {
          rotate: 45, width: 100,
          overflow: 'truncate',
          ellipsis: '...'
        } // Rotaciona os nomes dos produtos
      },
      // Eixo Y (Clientes)
      yAxis: {
        type: 'category',
        data: clientes,
        splitArea: { show: true } // Linhas de grade
      },
      // O componente que cria a legenda de cores
      visualMap: {
        min: 0,
        max: 100,

        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        itemWidth: 20,
        itemHeight: 120,
        textStyle: {
          fontSize: 11
        },

        inRange: {
          color: ['#FFFFE0', '#FFA500', '#FF0000']
        }
      },
      series: [
        {
          name: 'Vendas',
          type: 'heatmap',
          data: dataHeatmap,
          // Mostra o valor numérico dentro de cada célula
          label: {
            show: true,
            color: '#000'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    type EChartsOption = any; // Tipo 'any' para este exemplo autônomo


    const produtos2: string[] = [
      'Parafuso Sextavado 1/4"',
      'Porca 1/4"',
      'Arruela Lisa 1/4"',
      'Parafuso Sextavado 3/8"',
      'Porca 3/8"',
      'Arruela Lisa 3/8"',
      'Chave de Fenda Média',
      'Chave Phillips Média',
      'Alicate Universal',
      'Fita Isolante 10m',
      'WD-40 300ml'
    ];


    const clientes2: string[] = [
      'Cliente Padrão',
      'Lucas Lima',
      'Cliente XG',
      'Cliente Y',
      'Cliente XXGG',
      'Cliente Alfa',
      'Cliente Beta'
    ];


    type HeatmapDataPoint = [number, number, number];

    const vendasData: HeatmapDataPoint[] = [
      // Cliente Padrão (índice 0)
      [0, 0, 50], [1, 0, 45], [2, 0, 48], [3, 0, 10], [4, 0, 8], [5, 0, 12],
      [6, 0, 1], [7, 0, 1], [8, 0, 0], [9, 0, 5], [10, 0, 3],

      // Lucas Lima (índice 1)
      [0, 1, 150], [1, 1, 150], [2, 1, 200], [3, 1, 0], [4, 1, 0], [5, 1, 0],
      [6, 1, 5], [7, 1, 5], [8, 1, 2], [9, 1, 10], [10, 1, 8],

      // Instituto do Sorriso (índice 2)
      [0, 2, 5], [1, 2, 5], [2, 2, 5], [3, 2, 0], [4, 2, 0], [5, 2, 0],
      [6, 2, 0], [7, 2, 0], [8, 2, 0], [9, 2, 30], [10, 2, 10],

      // Tegbe Agência (índice 3)
      [0, 3, 0], [1, 3, 0], [2, 3, 0], [3, 3, 0], [4, 3, 0], [5, 3, 0],
      [6, 3, 0], [7, 3, 1], [8, 3, 0], [9, 3, 2], [10, 3, 0],

      // Lipe Cortes Barbearia (índice 4)
      [0, 4, 10], [1, 4, 10], [2, 4, 5], [3, 4, 0], [4, 4, 0], [5, 4, 0],
      [6, 4, 0], [7, 4, 0], [8, 4, 0], [9, 4, 2], [10, 4, 20],

      // Cliente Alfa (índice 5)
      [0, 5, 80], [1, 5, 75], [2, 5, 100], [3, 5, 80], [4, 5, 75], [5, 5, 100],
      [6, 5, 20], [7, 5, 20], [8, 5, 10], [9, 5, 15], [10, 5, 12],

      // Cliente Beta (índice 6)
      [0, 6, 0], [1, 6, 0], [2, 6, 0], [3, 6, 0], [4, 6, 0], [5, 6, 0],
      [6, 6, 0], [7, 6, 0], [8, 6, 0], [9, 6, 0], [10, 6, 0]
    ];



    this.options4 = {
      tooltip: {
        position: 'top',
        zlevel: 2,
        z: 9999,
        appendToBody: true,

        // Formata a dica (tooltip) para mostrar os nomes
        //   formatter: (params: any): string => { // Tipando os parâmetros
        //     // 'params.value' é o array [indiceProduto, indiceCliente, Quantidade]
        //     const clienteNome: string = clientes2[params.value[1]];
        //     const produtoNome: string = produtos2[params.value[0]];
        //     const quantidade: number = params.value[2];

        //     return `
        //   <strong>Cliente:</strong> ${clienteNome}<br/>
        //   <strong>Produto:</strong> ${produtoNome}<br/>
        //   <strong>Quantidade:</strong> ${quantidade}
        // `;
        //   }
      },
      title: {
        text: 'Heatmap: Clientes x Produtos',
        left: 'center'
      },
      grid: {
        height: "65%",
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "18%",
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: produtos2,
        splitArea: {
          show: true
        },
        axisLabel: {
          rotate: 30, // Gira os nomes dos produtos
          interval: 0 // Mostra todos os nomes
        }
      },
      yAxis: {
        type: 'category',
        data: clientes2,
        splitArea: {
          show: true
        },
        axisLabel: {
          interval: 0
        }
      },
      visualMap: {


        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        itemWidth: 20,
        itemHeight: 120,
        textStyle: {
          fontSize: 11
        },
        // Define o gradiente de cores
        inRange: {
          color: ['#FFFFE0', '#FFA500', '#FF0000']
        }
      },
      series: [
        {

          type: 'heatmap',
          data: vendasData,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      media: [
        {
          // Quando a largura for menor que 600px
          query: { maxWidth: 600 },
          option: {
            title: {
              bottom: '92%',
              text: 'Heatmap: Clientes x Produtos',
              left: 'center',
              textStyle: {

                fontSize: 14
              }
            },
            xAxis: {
              type: 'category',

              splitArea: { show: true },
              axisLabel: {
                rotate: 45,
                width: 75,
                overflow: 'truncate',
                ellipsis: '...',
              }
            },
            yAxis: {
              type: 'category',

              splitArea: { show: true },
              axisLabel: {
                rotate: 45,
                width: 65,
                overflow: 'truncate',
                ellipsis: '...',
              }
            },


            grid: {
              height: "70%",
              top: "10%",
              left: "0%",
              right: "5%",
              bottom: "15%",
            },

          }
        },

      ]
    };

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    this.options2 = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };

    this.options3 = {
      title: {
        text: 'Funnel',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      legend: {
        data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
      },

      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' },
          ],
        },
      ],
    };

  }
}
