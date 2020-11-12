import React  from 'react';
import {getDurations, percentile}  from '../../Utils/Utils';

interface portInterface {
    port: any,
    prefix: string
}
//TODO - port types should probably be moed into the datacontext
interface portInfo {
    id: string,
    name: string
}

export default class PortDataBlock extends React.PureComponent<portInterface> {

    render() {
        const {port, prefix} = this.props;
        const {callCount} = port;
        const portInfo: portInfo = port.entries[0].port;
        const name = portInfo.name;
        const durations = getDurations(port.entries);
        
        return (
        <div className={`pure-u-1 pure-u-md-1-3 portDataBlock portDataBlock_${prefix}`} key={`${name}_${prefix}`}>
            <div className="column-block">
                <div className="column-block-header">
                    <h2>{name}</h2>
                    <span className="column-block-info">{callCount}</span>
                </div>
                <h3>Durations</h3>
                {durations.length === 1 &&
                 <p>There was only one duration therefore every percentile is 
                    <span className="percentile"> {durations[0]}</span></p>
                }
                {durations.length > 1 &&
                    <ul className="column-block-list">
                        <li>5th Percentile: 
                            <span className="percentile"> {percentile(durations, .05)}</span>
                        </li>
                        <li>20th Percentile: 
                            <span className="percentile">{percentile(durations, .2)}</span>
                        </li>
                        <li>50th Percentile: 
                            <span className="percentile">{percentile(durations, .5)}</span>
                        </li>
                        <li>75th Percentile: 
                            <span className="percentile"> {percentile(durations, .75)}</span>
                        </li>
                        <li>90th Percentile: 
                            <span className="percentile"> {percentile(durations, .9)}</span>
        
                        </li>
                        
                    </ul>
                }
            </div>
        </div>);
    }

}