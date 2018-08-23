import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { RealtimeService } from '../realtime.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  HighCharts: Highcharts.ChartObject;
  @ViewChild('aqiChart') aqiChart: ElementRef;
  @Input() clientConfigGraph: {
    url: string[],
    node: string
  }
  healthStatus: string = '';
  healthColor: string = '#9ae620';
  series = [];
  days = [];
  constructor(
    private _realTimeService: RealtimeService
  ) { }

  ngOnInit() {
    var dataReceived = [
      2, 2.5, 1.8, 5.9, 7.4, 6.7, 4.5, 4.2, 3.9, 2.9, 3.4, 4, 4.9, 2.2
    ]

    this.todaysHealthStatus(dataReceived[dataReceived.length - 1]);
    var dataToPush: object[] = this.setDataColorArray(dataReceived);

    //data received for AQI graph
    this._realTimeService.data_received_subject.subscribe((data) => {
      let series = [];
      let days = [];
      for (let item in data['aqi']) {
        series.push(Number(data['aqi'][item]['pm2.5']));
        days.push(data['aqi'][item]['date']);
      }

      this.series = this.setDataColorArray(series);
      this.days = days;
      const options: Highcharts.Options = {
        credits: {
          enabled: false
        },
        chart: {
          type: 'column',
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 10
        },
        plotOptions: {
          column: {
            borderColor: null,
            colorByPoint: true,
            dataLabels: {
              enabled: true,
              style:{color:'white',fontWeight:'normal',fontSize:'8px',textOutline:'0px'}
            },
            enableMouseTracking: false
          }
        },
        title: {
          text: 'Air Quality Index (last 30 days)',
          style: {
            color: 'white',
            fontSize: '12px'
          }
        },
        yAxis: {
          max: 500,
          endOnTick: false,
          title: {
            text: null,
            style: { color: 'gray' }
          },
          labels: {
            style: {
              color: 'white'
            }
          },
          gridLineColor: "rgba(236, 125, 125, 0.5)",
        },
        xAxis: {
          categories: this.days,
          labels: {
            enabled: false,
            style: {
              color: 'orange',
              fontSize: '7px'
            }
          },
          gridLineColor: "rgba(236, 125, 125, 0.5)",
        },
        series: [{
          name: 'AQI',
          data: this.series,
          color: 'rgb(230, 167, 32)'
        }]
      };

      this.HighCharts = chart(this.aqiChart.nativeElement, options);


    });

  }




  setDataColorArray(dataReceived) {
    var dataToPush = []
    for (let item of dataReceived) {
      if (item <= 100) {
        dataToPush.push({ y: item, color: '#9ae620' });
      }
      else if (item > 100 && item <= 150) {
        dataToPush.push({ y: item, color: 'orange' })

      }
      else {
        dataToPush.push({ y: item, color: 'red' })

      }
    }

    return dataToPush
  }


  todaysHealthStatus(todaysAqi) {
    if (todaysAqi <= 3) {
      this.healthStatus = 'Healthy';
      this.healthColor = '#9ae620';
    }
    else if (todaysAqi > 3 && todaysAqi <= 6) {
      this.healthStatus = 'Unhealthy';
      this.healthColor = 'orange';
    }
    else {
      this.healthStatus = 'Poor';
      this.healthColor = '#e64e20 ';
    }
  }



}
