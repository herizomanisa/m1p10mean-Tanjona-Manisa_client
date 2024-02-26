import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { ResponseData } from 'src/app/models/ResponseData';
import { EmployeTravail } from 'src/app/models/EmployeTravail';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private chartsData: DashboardChartsData,
    private managerService: ManagerService
    ) { }

  current_year = new Date().getFullYear();

  public employe: EmployeTravail[] = []

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  public mainChartCA: IChartProps = {};
  public chartCA: Array<IChartProps> = [];
  public trafficRadioGroupCA = new UntypedFormGroup({
    trafficRadioCA: new UntypedFormControl('MonthCA')
  });

  ngOnInit(): void {
    this.initCharts();
    this.initCACharts();
    this.initTravailMoyenne();
    // console.log(this.chartsData.chartCA.data)
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  initCACharts(): void {
    this.mainChartCA = this.chartsData.chartCA;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    // console.log(this.chartsData.mainChart.data)
    this.initCharts();
  }

  setTrafficPeriodCA(value: string): void {
    this.trafficRadioGroupCA.setValue({ trafficRadioCA: value });
    this.chartsData.initChartCA(value);
    // console.log(this.chartsData.mainChart.data)
    this.initCACharts();
  }

  initTravailMoyenne(){
    this.managerService.getStatistics_travail_employe()
    .subscribe({
      next: (result: ResponseData<EmployeTravail[]>) => {
        
        this.employe = result.details!.map(item => ({
          _id: item._id,
          image: item.image,
          nom: item.nom,
          email: item.email,
          tel: item.tel,
          created_at: new Date(item.created_at),
          moyenne: item.moyenne
        }));

        // console.log(this.employe)
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    })
  }
}
