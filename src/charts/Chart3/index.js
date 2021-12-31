import React, { Component } from 'react';
import *as d3 from 'd3'
import *as echarts from 'echarts'
import $ from 'jquery'
import data from './batch_task_info.json'

var time_;
export default class River extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
        
        }
    }
    componentDidMount() {
        this.draw();
    
    }
    
    draw =(time_)=> {
        //在这里画图
    //    time_=253170;
    console.log(time_);
      xr(time_);
        function xr(time_) {
            var myChart4 = echarts.init(document.getElementById('view3'));
                function compute_value(params) {
                    for (let param of params) 
                    {		
                        // console.log(param);
                        param.value += getchildvalue(param.children);
        
                    }
                    return params
                }
        
                function getchildvalue(arrs) {
                    let child_value = 0;
        
                    for (let arr of arrs) {
                        if (arr.children != null) {
        
                            child_value += getchildvalue(arr.children);
        
                        }
                        child_value += arr.value
        
                    }
                    // console.log(arrs, child_value)
                    return child_value;
                }
        
        
                function data_get(time) {
                    function generateOptions(params) { //生成Cascader级联数据
                        var result = [];
                        for (let param of params) {
                            if (param.parentId == 0) { //判断是否为顶层节点
                                var parent = { //转换成el-Cascader可以识别的数据结构
                                    'name': param.name,
                                    'value1': param.id,
                                    "value": param.value
        
                                }
                                // console.log(param)
                                parent.children = getchilds(param.id, params); //获取子节点
                                result.push(parent);
                            }
                        }
                        return result;
                    }
        
                    function getchilds(id, array) {
                        let childs = new Array();
                        for (let arr of array) { //循环获取子节点
                            if (arr.parentId == id) {
                                childs.push({
                                    'name': arr.name,
                                    'value1': arr.id,
                                    'value': arr.value
        
                                });
                            }
                        }
                        for (let child of childs) { //获取子节点的子节点
                            let childscopy = getchilds(child.value1, array); //递归获取子节点
                            // console.log(child)
                            if (childscopy.length > 0) {
                                child.children = childscopy;
                            }
                        }
                        return childs;
                    }
        
                    //关于时间time 的旭日图数据生成
        
        
        
                    var chart_data = [];
                    var job_data = [];
                    var time_data = [];
                    var task_job = [];
                    var task_name_first = []
                    var iter_id = 1
                    // console.log(data)
        
                    for (let i of data) {
                        for (let j in i) {
                            if (j == 0) {
                                if (i[1].start_time <= time && i[1].end_time >= time) {
                                    job_data.push({
                                        name: i[0],
                                        id: iter_id,
                                        parentId: 0,
                                        time: i[1].start_time,
                                        value: 0
                                    });
                                    iter_id++;
                                }
                                continue;
                            } else if (i[j].start_time <= time && i[j].end_time >= time) {
                                time_data.push(i[j])
        
                            }
                        }
                    }
        
                    //独立任务 为父级 
                    //非独立任务 后面处理
                    for (let i of time_data) {
        
                        task_name_first.push(i.task_name.slice(0, 1))
                        if (i.task_name.slice(0, 1) >= 'a' && i.task_name.slice(0, 1) <= 'z') {
                            chart_data.push({
                                name: i.task_name,
                                id: iter_id,
                                parentId: 0,
                                time: i.start_time,
                                value: i.inst_num
                            })
                            iter_id++;
                        } else {
                            // console.log(i.task_name.slice(1).split('_'))
                            task_job.push({
                                name: i.task_name,
                                id: iter_id,
                                parentId: 0,
                                time: i.start_time,
                                value: i.inst_num
                            });
                            iter_id++;
                        }
                    }
        
        
                    for (let i of task_job) {
                        for (let j of task_job) {
                            if (i == j) continue;
                            else if (i.parentId != 0 && i.time != j.time) continue;
                            else {
                                if (i.name.slice(0, 1) != j.name.slice(0, 1)) continue;
                                else {
                                    var tempi = i.name.slice(3).split('_');
        
                                    var tempj = j.name.split('_')[0].slice(1);
                                    if (tempi.indexOf(tempj) != -1) {
                                        i.parentId = j.id;
                                    }
                                }
                            }
                        }
                    }
                    for (let i of job_data) {
                        for (let j of chart_data) {
                            if (j.time == i.time && j.parentId == 0) {
                                j.parentId = i.id;
                            }
                        }
                        for (let j of task_job) {
                            if (j.time == i.time && j.parentId == 0) {
                                j.parentId = i.id;
                            }
                        }
                    }
                    chart_data = [...job_data, ...chart_data, ...task_job]
                    // console.log(generateOptions(chart_data))
                    // console.log(job_data)
                    generateOptions(chart_data)
                    let final_data = compute_value(generateOptions(chart_data))
        
                    return final_data
                    // console.log(tm1)   
                }
                //var time = 87076
                var time=time_
                var tm1 = data_get(time)
                var judge_job = 'j';
                myChart4.setOption(
                     {
                        visualMap: {
                            type: 'continuous',
                            min: 0,
                            max: 10,
                            inRange: {
                                color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C', ]
                            }
                        },
                        series: {
                            type: 'sunburst',
                            highlightPolicy: 'descendant',
                            data: tm1,
                            radius: [0, '90%'],
                            label: {
                                rotate: 'radial'
                            }
                        },
                        tooltip: {
                            tirgger: "axis",
                            formatter(params) {
                                if (!params.data.name.indexOf(judge_job)) {
                                    return `job_name:${params.data.name} <br/>
                            task_num:${Object.keys(params.data.children).length}`;
                                } else {
                                    return `task_name:${params.data.name}<br/>
                            instance_num:${params.data.value}`;
                                }
                            },
                            axisPointer: {
                                type: 'cross',
                                animation: 'false',
                                label: {
                                    backgroundColor: 'red'
                                }
                            }
                        },
        
                    })
        
            
       }
        
    } 

    render() {
        return (
            <div >
                
            </div>
        )
    }
}