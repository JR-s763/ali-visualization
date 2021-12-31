import React, { Component } from 'react';
// import *as d3 from 'd3'
import *as echarts from 'echarts'
import data from './machine_usage_all.json'
import river  from '../Chart3/index.js'
import LineChart from '../JobChart/index.js';




/*for (let i = 0; i <= Math.round(99319 / 60); i++) {
    machine_abnormal_num[i] = 0
    time_stamp[i] = i
}*/



export default class Chart2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        this.draw();
    
    }
    
    draw =()=> {
        //在这里画图
        var myChart1 = echarts.init(document.getElementById('view2'));
        var machine_duqu_flag = false;
        var machine_data = [];
        var machine_cpu_num = [],
            machine_disaster_level_1 = [],
            machine_disaster_level_2 = [];
        var machine_machine_id = [],
            machine_mem_size = [],
            machine_status = [],
            machine_time_stamp = [];
        var machine_abnormal_num = [],
            time_stamp = [];
        for (var i=0;i<data.length;i++){
            machine_data.push(data[i])
            machine_cpu_num.push(data[i].cpu_num);
            machine_disaster_level_1.push(data[i].disaster_level_1)
            machine_disaster_level_2.push(data[i].disaster_level_2)
            machine_machine_id.push(data[i].machine_id)
            machine_mem_size.push(data[i].mem_size)
            machine_status.push(data[i].status)
            machine_time_stamp.push(data[i].time_stamp)
            machine_abnormal_num.push(data[i].countNum)
            time_stamp.push(data[i].timeStamp)
        }
        myChart1.setOption( {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: time_stamp
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            toolbox: {
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                startValue: '11'
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                    gt: 0,
                    lte: 200,
                    color: '#096'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#ffde33'
                }, {
                    gt: 300,
                    lte: 400,
                    color: '#ff9933'
                }, {
                    gt: 400,
                    lte: 500,
                    color: '#cc0033'
                }, {
                    gt: 500,
                    lte: 600,
                    color: '#660099'
                }, {
                    gt: 600,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: {
                name: '',
                type: 'line',
                data: machine_abnormal_num,
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 50
                    }, {
                        yAxis: 100
                    }, {
                        yAxis: 150
                    }, {
                        yAxis: 200
                    }, {
                        yAxis: 300
                    }]
                }
            }
        });
        myChart1.on('click',function(params){
            // console.log(params.name)
            var time_=params.name;
            new river().draw(time_);
            // a.draw(time_);
            new LineChart().draw(time_)
            
        })
       
}

    render() {
        return (
            <div >
                
            </div>
        )
    }
}