import React, { Component } from 'react';
import Primary from '../Layouts/Primary';
import {DataConsumer, contextConsumerValue, contextState} from '../State/DataContext';
import PortDataBlock from '../Components/PortDataBlock/PortDataBlock';
import SmallHeadline from '../Components/Functions/SmallHeadline';
import {sortByCallCount} from '../Utils/Utils';

class LocalComponent extends React.PureComponent<contextConsumerValue> {

    render() {
        const {values} = this.props;
        const portsArr = sortByCallCount(values.ports);     
        const top5Ports = portsArr.slice(0, 5).map((port) => {
            return <PortDataBlock port={port} prefix="top"/>;
        });
        const last5Ports = portsArr.slice(portsArr.length - 6 ,portsArr.length - 1).map((port) => {
            return <PortDataBlock port={port} prefix="last"/>;
        });
        

        return (<>
            <SmallHeadline headline="Dashboard"/>
            <div className="compoentBody">
                <h2>Top Ports</h2>
                <div className="pure-g">
                    {top5Ports}
                </div>
                <h2>Last Ports</h2>
                <div className="pure-g">
                    {last5Ports}
                </div>
            </div>
            </>
        );
    }

}

export default class Dashboard extends Component<contextConsumerValue> {

    render() {
        return (
            <Primary>
                <DataConsumer>
                    {(value: contextState) => (<LocalComponent values={value}/>)}
                </DataConsumer>
            </Primary>
        );
    }
}