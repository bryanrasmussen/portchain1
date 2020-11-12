import React, { Component } from 'react';
import Primary from '../Layouts/Primary';
import {DataConsumer, contextConsumerValue, contextState} from '../State/DataContext';
import SmallHeadline from '../Components/Functions/SmallHeadline';


class LocalComponent extends React.PureComponent<contextConsumerValue> {
    render() {
        const {values} = this.props;
        const vessels = Object.values(values.processedVessels).map((vessel) => {
            const name = vessel.name;
            const imo = vessel.imo;
            const portCalls = vessel.portCalls;
            const calls = portCalls.length;
            const ports = []
;           portCalls.forEach((call) => {
                const portname = call.port.name;
                if (ports.indexOf(portname) === -1) {
                    ports.push(portname);
                }
            });
            const portList = ports.map((port) => {
                return <li key={`${imo}_${port}`}>
                    {port}
                </li>
            });
            return (
                <tr key={`vessels_${imo}`}>
                    <td>{name}</td>
                    <td>{calls}</td>
                    <td>
                        <ul className="portList">
                            {portList}
                        </ul>
                    </td>
                </tr>
            )

        });

        return (
            <div className="componentBody">
                <table>
                    <tr>
                        <th>Vessels</th>
                        <th>Calls</th>
                        <th>Ports</th>
                    </tr>
                    {vessels}
                </table>
            </div>);
    }
    
}
export default class Vessels extends Component {

    render() {
        return (
            <Primary>
                <DataConsumer>
                    {(value: contextState)  => (
                    <>
                        <SmallHeadline headline="All Vessels" />
                        <LocalComponent values={value}/>
                    </>
                        )}
                </DataConsumer>
            </Primary>);
    }
}