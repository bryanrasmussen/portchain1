import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {

    render() {
        return ( <div className="sidebar pure-u-md-3-24">
        <div id="menu">
            <div className="pure-menu">
                <p className="pure-menu-heading">
                    PortChain!
                </p>
                <ul className="pure-menu-list">
                    
                    <li className="pure-menu">
                        <NavLink to="/" className="pure-menu-link" activeClassName="pure-menu-link-selected"
                        >Home</NavLink>
                    </li>
                    <li className="pure-menu">
                         <NavLink to="/Dashboard" className="pure-menu-link" activeClassName="pure-menu-link-selected"
                        >Dashboard</NavLink>
                    </li>
                    <li className="pure-menu">
                         <NavLink to="/Ports" className="pure-menu-link" activeClassName="pure-menu-link-selected"
                        >Ports</NavLink>
                    </li>
                    <li className="pure-menu">
                         <NavLink to="/Vessels" className="pure-menu-link" activeClassName="pure-menu-link-selected"
                        >Vessels</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>);
    }
}