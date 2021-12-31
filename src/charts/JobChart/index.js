import React, { Component } from 'react';
import *as d3 from 'd3'               //引入D3
import data from './batch_task.json' //引入数据
// import *as echarts from 'echarts'
// import './style.css';
// import {event}  from 'd3'

var time;
// console.log(data)
export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  
  componentDidMount() {
    this.draw();

  }
   

  draw =(time)=> {

    d3.select('.vis-barchart > *').remove();
    //初始化数据
    console.log(time);
    jl(time);
    
      function jl(time){
        
        var width= document.getElementById("view4").clientWidth;
	    var height = document.getElementById("view4").clientHeight;
        // var time = 87076 //点击事件时间 作为接口
        // var width = 500; //svg宽度
        // var height = 500; //svg高度

        function links_data(data) {

            var nodes = [];
            var edges = [];
            for (let i in data) {
                nodes.push(data[i].task_name)
                nodes.push(data[i].job_name)
            }
            nodes = [...new Set(nodes)]; //获取节点名字，即所有task和job的名字
        
            for (let i in data) {
                //添加边，source，和target代表两个节点之间的联系从source到target
                //weight暂时为此任务inst_num的数量 由于相差过大 利用 多次开根号缩小其差距（可用其他算法代替）
                //color暂用taskname长度随机
                // console.log(data[i].job_name)
                edges.push({ source: nodes.indexOf(data[i].job_name), target: nodes.indexOf(data[i].task_name), weight: Math.sqrt(Math.sqrt(+data[i].inst_num)), color: data[i].task_name.length });
            }
            nodes = nodes.map(function(item) {
                return { name: item }
            })
        
            return { nodes, edges }
        }
        
        function draw_chart(dataset) {
            var w = width;
            var h = height
            var colors = d3.scale.category20()
            var force = d3.layout.force()
                .nodes(dataset.nodes) //加载节点数据
                .links(dataset.edges) //加载边数据
                .size([w, h]) //设置有效空间的大小
                .linkDistance(50) //连线的长度
                .charge(-200) //负电荷量，相互排斥设置的负值越大越排斥
                .start(); //设置生效
        
            var svg = d3.select("#view4")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
        
            //(3)创建作为连线的svg直线
            var edges = svg.selectAll("line")
                .data(dataset.edges)
                .enter()
                .append("line")
                .style("stroke", function(d) { //  设置线的颜色
                    return colors(d.color);
                })
                .style("stroke-width", function(d, i) { //设置线的宽度
                    return d.weight;
                });
        
            //(4) 创建作为连线的svg圆形
            var nodes = svg.selectAll("circle")
                .data(dataset.nodes)
                .enter()
                .append("circle")
                .attr("r", function(d) { //设置圆点的半径，圆点的度越大weight属性值越大，可以对其做一点数学变换
                    return Math.log(d.weight) * 10 + 5;
                })
                .style("fill", function(d) {
        
                    return colors(d.weight * d.weight * d.weight);
                })
                .call(force.drag); //可以拖动
        
            //(5)打点更新，没有的话就显示不出来了
            force.on("tick", function() {
                //边
                edges.attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });
        
                //节点
                nodes.attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    });
        
            })
        }
        
        function get_pridata(time, data) {
            var priData = [];
            for (var i in data) {
                // console.log(data[i])
                if (data[i].start_time <= time && data[i].end_time >= time) {
                    priData.push(data[i])
                }
            }
            return priData
        }
        
        var priData = get_pridata(time, data);
        var { nodes, edges } = links_data(priData) //转换数据的格式
        var force_data = { nodes: nodes, edges: edges }
        draw_chart(force_data)
        // var net=document.getElementById('view4')
        // d3.csv('./batch_task/batch_task1.csv', function(data) {
        
            
        // })

        
      }
        
    

  }
  render() {
    return (
        
        <div id="view4" ></div>
    )
  }
}
