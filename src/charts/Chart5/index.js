import React, { Component } from 'react';
// import *as d3 from 'd3'
import data from './batch_task.json'
import *as echarts from 'echarts'

// var batch_task_data = [],
//     batch_task_task_name = [],
//     batch_task_inst_num = [],
//     batch_task_job_name = [],
//     batch_task_task_type = [],
//     batch_task_status = [],
var batch_task_start_time = [],
    batch_task_end_time = [];
    // batch_task_plan_cpu = [],
    // batch_task_plan_mem = [];

    // batch_task_data.push(data);
    // batch_task_task_name.push(data.task_name);
    // batch_task_inst_num.push(data.inst_num)
    // batch_task_job_name.push(data.job_name)
    // batch_task_task_type.push(data.task_type)
    // batch_task_status.push(data.status)
   
    // batch_task_plan_cpu.push(data.plan_cpu)
    // batch_task_plan_mem.push(data.plan_mem)
    // console.log(data.length)
    // console.log(parseInt(data.start_time))

export default class Chart5 extends Component {
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

    var myChart3 = echarts.init(document.getElementById("view6"));
    

const time_max = 744843;
var calendar_start = 7000;
var calendar_end = 7301;
var time_data = [];
var faw = [];
var ccb = [];
for (let i = 0; i < 43; i++) {
    ccb.push(i)
    
}

for (let i = 0; i < 7; i++) {
    faw.push(i)
}

var task_time = [];
for (let i = 0; i <= parseInt(time_max / 60); i++) {
    task_time[i] = 0;
}

function time_compute(start, end) {
    for (let i = start; i <= end; i++) {
        task_time[i]++;
    }
}


for (let i = 0; i < 43 * 7; i++) {
    time_data[i] = [i % 43, parseInt(i / 43), 100]
}

for(var i=0;i<data.length;i++){
    batch_task_start_time.push(parseInt(data[i].start_time))
    batch_task_end_time.push(parseInt(data[i].end_time))
    time_compute(parseInt(data[i].start_time / 60), parseInt(data[i].end_time / 60))
}





myChart3.setOption({
    tooltip: {
        position: 'top'
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    animation: false,
    grid: {
        height: '50%',
        left: '13%',
        top: '20%',

        //backgroundColor:'white'
    },
    xAxis: {
        name: 'CCW',
        nameTextStyle: {
            padding: [0, 0, -60, -245] // 四个数字分别为上右下左与原位置距离
        },
        type: 'category',
        data: ccb,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        name: 'FAW',
        nameTextStyle: {
            padding: [0, 0, -210, -80] // 四个数字分别为上右下左与原位置距离
        },
        type: 'category',
        data: faw,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max: 100,
        // align: 'left',
        calculable: true,
        orient: 'vertical',
        left: '90%',
        top: '35%',
        // top: 'auto',    
        //right: '10%',
        inRange: {
            color: ['white', 'rgb(191,68,76)']
        }
    },
    series: [{
        name: 'fawVSccb',
        type: 'heatmap',
        data: time_data.map(function(d, i) {
            return [d[0], d[1], task_time.slice(calendar_start, calendar_end)[i]]
        }),
        label: {
            show: false,
            color: 'white'
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'white'
            },
        }
    }]
})

// d3.csv('public/data/batch_task.csv',function(data) {

   

    
    
    
// }).then(function(data) {

    

    
//     // console.log(batch_task_task_name)
//     // console.log(batch_task_inst_num)
//     // console.log(batch_task_job_name)
//     // console.log(batch_task_task_type)
//     // console.log(batch_task_status)
//     // console.log(batch_task_start_time)
//     // console.log(batch_task_end_time)
//     // console.log(batch_task_plan_cpu)
//     // console.log(batch_task_plan_mem)


//     // console.log(task_time)

    
// })
   
    } 

    render() {
        return (
            <div id="view6" ></div>
        )
    }
}