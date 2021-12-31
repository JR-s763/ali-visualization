import React, { Component } from 'react';
// import *as d3 from 'd3'
import *as echarts from 'echarts'
import data from './1.json'



export default class Chart1 extends Component {


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
        var myChart= echarts.init(document.getElementById("view1"));
        var app = {};
        var option;
        var option = {
            // title: {
            //     text: 'Describe CPU utilization and memory utilization',
            //     left: 'center',
            //     top: 0
            // },
            visualMap: {
                min: 0,
                max: 100,
                dimension: 1,
                orient: 'vertical',
                right: 50,
                top: 'center',
                text: ['HIGH', 'LOW'],
                textStyle:{
                    fontSize: 20
                },
                itemWidth:20,
                itemHeight:100,
                calculable: true,
                inRange: {
                    color: ['#f2c31a', '#24b7f2']
                }
            },
            tooltip: {
                 backgroundColor: ['rgba(255,255,255,0.7)'],
                         formatter: function (object) {
                             var value = object.value;
                             //console.log(value);
                             return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                + 'cpu_u：'   + value[0] +'%' +'<br>'
                                + 'mem_u：'  + value[1]+'%' ;
                         },
                
                trigger: 'item',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: [{
                name:'Cpu_u',
                nameGap:16,//坐标轴名称与轴线之间的距离，注意是三维空间的距离而非屏幕像素值。
                nameTextStyle: {
                            fontSize: 20
                        },
                axisLabel:{fontSize:20},
                type: 'value',
            splitLine: {
                show: false
            }
            }],
            yAxis: [{
                name:'Mem_u',
                nameTextStyle: {
                            fontSize: 20
                        },
                axisLabel:{fontSize:20},
                type: 'value',
            splitLine: {
                show: false
            }
            }],
            series: [{
                name: 'cpu_u',
                nameTextStyle: {
                            fontSize: 20
                        },
                type: 'scatter',
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        borderWidth: 0.6,
                        borderColor: '#fff'
                    }
                },
                data: data
            }]
        };
    
        myChart.setOption(option);
        // if (option && typeof option === 'object') {
        //     myChart.setOption(option);
        // }
        // myChart.clear()

    } 

    render() {
        return (
            <div id="view1"></div>
        )
    }
}