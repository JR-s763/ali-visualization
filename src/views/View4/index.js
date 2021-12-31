import React, { Component } from 'react';
import './view4.css';
import LineChart  from '../../charts/JobChart';

export default class View4 extends Component {
    render() {
      
        return (
            <div className='vis-barchart' id='view4'>
                <LineChart/>
            </div>
            // <div className=''/>
        )
    }
}