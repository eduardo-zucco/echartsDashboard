import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard
} from '@ionic/angular/standalone';

import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClient } from '@angular/common/http';

import * as echarts from 'echarts/core';
import type { EChartsCoreOption } from 'echarts/core';

import {
  BarChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  MapChart,
  PieChart,
  TreemapChart
} from 'echarts/charts';

import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
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
  VisualMapComponent,
  HeatmapChart,
  LineChart,
  GaugeChart,
  MapChart
]);

@Component({
  selector: 'app-testes-echarts',
  templateUrl: './testes-echarts.page.html',
  styleUrls: ['./testes-echarts.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    NgxEchartsModule
  ]
})
export class TestesEchartsPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBrazilMap();
  }

  // =========================
  // LOAD MAPA BRASIL (GEOJSON)
  // =========================
  private loadBrazilMap(): void {
    this.http
      .get<any>('assets/maps/brazil.json')
      .subscribe(geoJson => {
        echarts.registerMap('Brazil', geoJson);
        this.setMapaClientesData();
      });
  }

  // =========================
  // HEATMAP CLIENTE X PRODUTO
  // =========================
  public heatmapClientesProdutosOption: EChartsCoreOption = {
    title: {
      bottom: '92%',
      text: 'Heatmap: Clientes x Produtos',
      left: 'center',
      textStyle: { fontSize: 15 }
    },

    tooltip: {
      position: 'top',
      trigger: 'item',
      appendToBody: true,
      formatter: (params: any) => {
        if (!params?.data) return '';

        const produto = this.heatmapData.x[params.data[0]];
        const cliente = this.heatmapData.y[params.data[1]];
        const valor = params.data[2];

        return `
        <strong>Cliente:</strong> ${cliente}<br/>
        <strong>Produto:</strong> ${produto}<br/>
        <strong>Valor:</strong> ${valor.toLocaleString('pt-BR')}
      `;
      }
    },

    grid: {
      height: '65%',
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '18%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      data: [] as string[],
      splitArea: { show: true },
      axisLabel: {
        rotate: 35,
        width: 90,
        overflow: 'truncate',
        ellipsis: '...'
      }
    },

    yAxis: {
      type: 'category',
      data: [] as string[],
      splitArea: { show: true },
      axisLabel: {
        rotate: 15,
        width: 90,
        overflow: 'truncate',
        ellipsis: '...'
      }
    },

    visualMap: {
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      itemWidth: 20,
      itemHeight: 120,
      textStyle: { fontSize: 11 },
      inRange: {
        color: [
          '#E3F2FD',
          '#BBDEFB',
          '#90CAF9',
          '#64B5F6',
          '#5E35B1',
          '#4527A0'
        ]
      }
    },

    series: [
      {
        name: 'Vendas por Cliente/Produto',
        type: 'heatmap',
        data: [] as Array<[number, number, number]>,
        label: { show: true },
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
        query: { maxWidth: 668 },
        option: {
          title: {
            bottom: '92%',
            text: 'Heatmap: Clientes x Produtos',
            left: 'center',
            textStyle: { fontSize: 14 }
          },
          xAxis: {
            axisLabel: {
              rotate: 45,
              width: 75,
              overflow: 'truncate',
              ellipsis: '...'
            }
          },
          yAxis: {
            axisLabel: {
              rotate: 45,
              width: 65,
              overflow: 'truncate',
              ellipsis: '...'
            }
          },
          grid: {
            height: '70%',
            top: '10%',
            left: '0%',
            right: '5%',
            bottom: '15%'
          }
        }
      }
    ]
  };

  heatmapData = {
    y: [
      'ABRAFOL FERTILIZANTES LTDA - EPP',
      'AGRICHEM DO BRASIL LTDA.',
      'AGRO VALLER LTDA',
      'AGROPEU-AGRO INDUSTRIAL DE POMPEU S/A'
    ],
    x: [
      'ACIDO BORICO',
      'ACIDO BORICO - SACOS 25 KG',
      'ACIDO BORICO IMPORTADO'
    ],
    value: [
      [0, 0, 200],
      [1, 1, 150],
      [2, 2, 320],
      [0, 2, 500]
    ]
  };

  // =========================
  // MAPA CLIENTES POR UF
  // =========================
  ufToEstado: Record<string, string> = {
    AC: 'Acre',
    AL: 'Alagoas',
    AP: 'Amapá',
    AM: 'Amazonas',
    BA: 'Bahia',
    CE: 'Ceará',
    DF: 'Distrito Federal',
    ES: 'Espírito Santo',
    GO: 'Goiás',
    MA: 'Maranhão',
    MT: 'Mato Grosso',
    MS: 'Mato Grosso do Sul',
    MG: 'Minas Gerais',
    PA: 'Pará',
    PB: 'Paraíba',
    PR: 'Paraná',
    PE: 'Pernambuco',
    PI: 'Piauí',
    RJ: 'Rio de Janeiro',
    RN: 'Rio Grande do Norte',
    RS: 'Rio Grande do Sul',
    RO: 'Rondônia',
    RR: 'Roraima',
    SC: 'Santa Catarina',
    SP: 'São Paulo',
    SE: 'Sergipe',
    TO: 'Tocantins'
  };

  public mapaClientesPorUfOption: EChartsCoreOption = {
    title: {
      text: 'Clientes por Estado',
      left: 'center'
    },

    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `${params.name}<br/>Clientes: ${params.value ?? 0}`
    },

    visualMap: {
      min: 0,
      max: 350,
      left: 'left',
      bottom: '5%',
      calculable: true,
      inRange: {
        color: ['#E3F2FD', '#1565C0']
      }
    },

    series: [
      {
        type: 'map',
        map: 'Brazil',
        roam: true,
        data: []
      }
    ]
  };

  mapaClientesMock = [
    { uf: 'SP', total: 320 },
    { uf: 'MG', total: 180 },
    { uf: 'PR', total: 140 },
    { uf: 'GO', total: 95 },
    { uf: 'MT', total: 70 }
  ];



  ionViewDidEnter(): void {
    this.setHeatmapData();

  }

  private setHeatmapData(): void {
    const option = this.heatmapClientesProdutosOption;

    (option['xAxis'] as any).data = this.heatmapData.x;
    (option['yAxis'] as any).data = this.heatmapData.y;

    ((option['series'] as any[])[0]).data = this.heatmapData.value;
  }



  private setMapaClientesData(): void {
    const option = this.mapaClientesPorUfOption;

    ((option['series'] as any[])[0]).data =
      this.mapaClientesMock.map(item => ({
        name: this.ufToEstado[item.uf],
        value: item.total
      }));
  }

}
