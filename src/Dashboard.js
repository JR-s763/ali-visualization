import React, { Component } from 'react';
// import data from './data';
import { Layout} from 'antd';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
// import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';

const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {


    render() {
     
        return (
            <div>
                <Layout height={document.body.clientHeight/10}>
                    <header>
                        <div style={{textAlign:'center',fontSize:30,backgroundColor:'#fff'}}> <h3 >Alibaba集群数据可视化</h3></div>
                    </header>
                </Layout>
                
                
                <Layout height={document.body.clientHeight/5*2}>
                    <Layout width={document.body.clientWidth/2}style={{backgroundColor:'#fff'}}><View4/></Layout>
                    <Sider width={document.body.clientWidth/2}style={{backgroundColor:'#fff'}}><View2/></Sider>
                </Layout>
                <Layout height={document.body.clientHeight/5*2}>
                    <Sider width={document.body.clientWidth/4}><View3/></Sider>
                    <Sider width={document.body.clientWidth/2} style={{backgroundColor:'#fff'}}><View1/></Sider>
                    <Sider width={document.body.clientWidth/4} style={{backgroundColor:'#fff'}}><View6/></Sider>
                    
                </Layout>
                {/* <Layout style={{ height: 900 }}>
                    <Sider width={600} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 400 }}>
                            <View1/>
                        </Content>
                        <Content style={{ height: 400 }}>
                            <View2 />
                        </Content>
                        
                    </Sider>
                    <Content style={{ height: 400}}>
                            <View3 />
                    </Content> */}
                    
                    {/* <Content>
                        
                    </Content> */}
                    
                    {/* <Layout> */}
                        {/* <Layout>
                       
                        <Content>
                            <View4 />
                        </Content>
                            <Sider width={500} style={{backgroundColor:'#eee'}}>
                                <View6 />
                            </Sider>
                        
                       </Layout> */}

                      
                        {/* <Layout style={{ height: 500 }}>
                            <Content>
                                <View5 />
                            </Content>
                           
                        </Layout> */}
                    {/* </Layout> */}
                    {/* <Layout>
                        <Slider width={500} style={{backgroundColor:'#eee'}}>
                            <View3 />
                        </Slider>
                    </Layout> */}

                    {/* <Sider width={600} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 400 }}>
                            <View4/>
                        </Content>
                        <Content style={{ height: 400 }}>
                            <View6/>
                        </Content>
                    </Sider>

                </Layout> */}
                {/* <Layout>
                    
                        
                </Layout> */}

                <Layout height={document.body.clientHeight/20}>
                    <Footer>
                        <div style={{textAlign:'center'}}>
                            JZ20-022基于Alibaba集群数据的运维可视化系统
                        </div>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
