import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import '../styles/main.css';

export default class PrimaryLayout extends Component {

    render() {
        return ( 
        <div id="layout" className="pure-g">
            <Sidebar />
            <div className="content pure-u-md-21-24">
                {this.props.children}
            </div>
        </div>);
    }
}