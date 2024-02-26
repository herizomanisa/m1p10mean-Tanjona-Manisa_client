import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { ResponseData } from '../../models/ResponseData';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { StatMois } from '../../models/StatMois'
import { firstValueFrom, lastValueFrom } from 'rxjs';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(private managerService: ManagerService) {
    this.initMainChart();
    this.initChartCA();
  }

  public mainChart: IChartProps = {};
  public chartCA: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initChartCA(period: string = 'MonthCA') {

    let labels: string[] = [];

    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // mainChart
    // mainChart
    this.chartCA['elements'] = period === 'Month' ? 12 : 31;
    this.chartCA['Data1'] = [];
    this.chartCA['Data2'] = [];
    this.chartCA['Data3'] = [];
    
    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    const datasets = [
      {
        data: this.chartCA['Data1'],
        label: 'Chiffre d\'affaire (Ar)',
        ...colors[0]
      },
      // {
      //   data: this.mainChart['Data2'],
      //   label: 'Previous',
      //   ...colors[1]
      // },
      // {
      //   data: this.mainChart['Data3'],
      //   label: 'BEP',
      //   ...colors[2]
      // }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          // max: 250,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
    
    if (period === 'MonthCA') {
      this.managerService.getStatistics_CA_mois()
      .subscribe({
        next: (result: ResponseData<StatMois[]>) => {
          
          for(let i=0;i<result.details!.length;i++){
            labels.push(result.details![i].name)
            this.chartCA['Data1'].push(result.details![i].value);
          }

          this.chartCA.type = 'line';
          this.chartCA.options = options;
          this.chartCA.data = {
            datasets,
            labels
          };
          // console.log(labels)
        },
        error: (error) => console.log(error),
        complete: () => console.log('complete CA')
      })
    }

    if (period === 'DayCA') {
      this.managerService.getStatistics_CA_jour()
      .subscribe({
        next: (result: ResponseData<StatMois[]>) => {
          
          for(let i=0;i<result.details!.length;i++){
            labels.push(result.details![i].name)
            this.chartCA['Data1'].push(result.details![i].value);
          }

          this.chartCA.type = 'line';
          this.chartCA.options = options;
          this.chartCA.data = {
            datasets,
            labels
          };
          // console.log(labels)
        },
        error: (error) => console.log(error),
        complete: () => console.log('complete CA')
      })
    }

    this.chartCA.type = 'line';
    this.chartCA.options = options;
    this.chartCA.data = {
      datasets,
      labels
    };
  }

  initMainChart(period: string = 'Month') {

    let labels: string[] = [];

    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // mainChart
    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 12 : 31;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];
    
    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Nombre de reservation(s)',
        ...colors[0]
      },
      // {
      //   data: this.mainChart['Data2'],
      //   label: 'Previous',
      //   ...colors[1]
      // },
      // {
      //   data: this.mainChart['Data3'],
      //   label: 'BEP',
      //   ...colors[2]
      // }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          // max: 250,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
    
    if (period === 'Month') {
      this.managerService.getStatistics_rdv_mois()
      .subscribe({
        next: (result: ResponseData<StatMois[]>) => {
          
          for(let i=0;i<result.details!.length;i++){
            labels.push(result.details![i].name)
            this.mainChart['Data1'].push(result.details![i].value);
          }

          this.mainChart.type = 'line';
          this.mainChart.options = options;
          this.mainChart.data = {
            datasets,
            labels
          };
          // console.log(labels)
        },
        error: (error) => console.log(error),
        complete: () => console.log('complete')
      })
    }

    if (period === 'Day') {
      this.managerService.getStatistics_rdv_jour()
      .subscribe({
        next: (result: ResponseData<StatMois[]>) => {
          
          for(let i=0;i<result.details!.length;i++){
            labels.push(result.details![i].name)
            this.mainChart['Data1'].push(result.details![i].value);
          }

          this.mainChart.type = 'line';
          this.mainChart.options = options;
          this.mainChart.data = {
            datasets,
            labels
          };
          // console.log(labels)
        },
        error: (error) => console.log(error),
        complete: () => console.log('complete')
      })
    }

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

}
