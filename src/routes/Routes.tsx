import React, { Component } from 'react';
import {Route, Redirect, BrowserRouter as Router, Switch, RouteComponentProps} from 'react-router-dom';
import Frontpage from '../Pages/Frontpage';
import Dashboard from '../Pages/Dashboard';
import Vessels from '../Pages/Vessels';
import Ports from '../Pages/Ports';
import {DataProvider} from '../State/DataContext';

import NotFound from '../Pages/NotFound';
/*

import { ResizeProvider, ResizeConsumer } from '../../util/ResizeContext';

export default class MemberButton extends PureComponent {
    render() {
        const { isRoot, showSmall = false } = this.props;

        return (
<ResizeProvider>
            <ResizeConsumer>

*/

interface MatchParams {
    originalPath: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

export default class Routes extends Component {

    render() {
        const path = location.pathname;
        return (
            <DataProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Frontpage} />
                        <Route exact path="/Dashboard" component={Dashboard} />
                        <Route exact path="/Vessels" component={Vessels} />
                        <Route exact path="/Ports" component={Ports} />
                        <Route exact path="/404" component={NotFound} />
                        <Route path="/404:originalPath" render={( {match}: MatchProps) => (
                                <NotFound originalPath={match.params.originalPath} /> )} />
                        <Redirect to={"/404" + path} />
                    </Switch>
                </Router>
            </DataProvider>
        );

    }
    
}