import { Component, OnInit, ViewChild, ElementRef,Renderer2, OnDestroy, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs/Rx';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-guages',
  templateUrl: './guages.component.html',
  styleUrls: ['./guages.component.css']
})
export class GuagesComponent implements OnInit {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @Input() clientConfigGuages: {
    url: string[],
    node: string[]
  }
  HighCharts: Highcharts.ChartObject;
  series: number[] = [];
  days: string[] = [];
  param_avg_data: object[] = [];
  real_time_data: object = {};
  constructor(
    public _httpClient: HttpClient,
    private _realtimeService: RealtimeService,
    private _renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.fetch_rltm_on_init();
    this.fetch_data()
    this._realtimeService.device_changed_subject.subscribe((status) => {
      this.fetch_data();
    })
  }


  //http request to backend
  fetch_data() {
    var url_to_fetch_data = this.clientConfigGuages['url'][0] + '?req-type=2&' + 'device-id=' + this.clientConfigGuages.node;
    this._httpClient.get(url_to_fetch_data).subscribe((response) => {
      if (response['success']) {
        //storing data received 

        this.param_avg_data = response['msg'];
        this.onParamSelected('pm2.5', 'ug/m3',500,0,100);//to display pm10 graph by default
        //subscribed in AQI graph component
        this._realtimeService.data_received_subject.next({ 'aqi': this.param_avg_data });
      }
    });
    this.startPolling();
  }

  //start polling real time data  
  startPolling() {
    Observable.interval(5000).flatMap(() =>
      this._httpClient.get(this.clientConfigGuages['url'][0] + '?req-type=1&' + 'device-id=' + this.clientConfigGuages.node)).subscribe((response) => {
        if (response['success']) {
          this.real_time_data = response['msg'];
        }
        else {
          this.real_time_data = [];
        }
      })
  }

  //to prevent observable interval delay on init http call
  fetch_rltm_on_init() {
    this._httpClient.get(this.clientConfigGuages['url'][0] + '?req-type=1&' + 'device-id=' + this.clientConfigGuages.node)
      .subscribe((response) => {
        if (response['success']) {
          this.real_time_data = response['msg'];
        }
        else {
          this.real_time_data = [];
        }
      })
  }
  //for displaying graph of average values of last 7 days
  onParamSelected(parameter: string, unit: string,max:number,min:number,tickInterval: number) {
   // this._renderer2.addClass(elRef.nativeElement,'active');
    let series = [];
    let days = [];
    for (let item in this.param_avg_data) {
      series.push(Number(this.param_avg_data[item][parameter]));
      days.push(this.param_avg_data[item]['date']);
    }
    this.series = series;
    this.days = days;

    //this.initializeChart();
    // const options: Highcharts.Options = {
    //   chart: {
    //     type: 'line',
    //     backgroundColor: 'rgba(255,255,255,1)',
    //     borderRadius: 10
    //   },
    //   title: {
    //     text: parameter,
    //     style: {
    //       color: 'coral'
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: unit,
    //       style: { color: 'gray' }
    //     },
    //     labels: {
    //       style: {
    //         color: 'white'
    //       }
    //     },
    //     gridLineColor: "rgba(236, 125, 125, 0.5)",
    //   },
    //   xAxis: {
    //     categories: this.days,
    //     labels: {
    //       style: {
    //         color: 'coral',
    //         fontSize: "9px"
    //       }
    //     },
    //     gridLineColor: "rgba(236, 125, 125, 0.5)",
    //   },
    //   series: [{
    //     name: parameter,
    //     data: this.series,
    //     color: 'coral'
    //   }]
    // };
    const options: Highcharts.Options = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        alignTicks: false
      },
      plotOptions: {
        column: {
          
          borderColor: null,
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false,
        },
     
      },
      title: {
        text: parameter + ' (24 hrs average)',
        style: {
          color: 'coral',
          fontSize: "15px"
        }
      },
      yAxis: {        
        max: max,
        min: min,
        tickInterval:tickInterval,
        endOnTick: false,
        title: {
          text: unit,
          style: { color: 'gray' }
        },
        labels: {
          style: {
            color: 'coral'
          }
        },
        gridLineColor: "rgba(236, 125, 125, 0.5)",
      },
      xAxis: {
        categories: this.days,
        labels: {
          style: {
            color: 'coral',
            fontSize: "9px"
          }
        },
        gridLineColor: "rgba(236, 125, 125, 0.5)"
      },
      series: [{
        type: 'column',
        name: parameter,
        data: this.series,
        color: 'coral'
      },
      {
        type: 'spline',
        name: parameter,
        data: this.series,
        color: '#569929'

      }

      ]
    };

    this.HighCharts = chart(this.chartTarget.nativeElement, options);
    //console.log(this.clientConfig['clientConfigGuages'])
  }

  // initializeChart() {

  //   this.chart = new Chart('avgChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['Mar 2', 'Mar 3', 'Mar 4', 'Mar 5'],
  //       datasets: [
  //         {
  //           data: ['30', '34', '45', '44', '55', '56'],
  //           borderColor: "#3cba9f",
  //           borderWidth: 2,
  //           fill: false
  //         }

  //       ]
  //     },
  //     options: {
  //       legend: {
  //         display: false,
  //       },
  //       scales: {
  //         yAxes: [{
  //           display: true,
  //           gridLines: {
  //             color: 'rgba(252, 116, 103,0.7)'
  //           }
  //         }],
  //         xAxes: [{
  //           display: true,
  //           gridLines: {
  //             color: 'rgba(252, 116, 103,0.7)'
  //           }
  //         }]
  //       },
  //       layout: {
  //         padding: {
  //           left: 20,
  //           right: 30,
  //           top: 40,
  //           bottom: 30
  //         }
  //       }
  //     }
  //   });

  // }


}
