import React, { Component } from 'react';
import Primary from '../Layouts/Primary';
import {DataConsumer, contextConsumerValue, contextState} from '../State/DataContext';
import SmallHeadline from '../Components/Functions/SmallHeadline';
import {sortByCallCount} from '../Utils/Utils';

/*exporting interfaces does not work currently because 
of this problem https://github.com/webpack/webpack/issues/7378
I am not going to do the work to make the proposed solution
work at the moment, so you will see these interfaces
hand copied at different places
 */
interface Entry {
    arrival: string,
    departure: string,
    createdDate: string,
    isOmitted: boolean,
    service: string,
    port: {
      id: string,
      name: string
    },
    logEntries: object[]
  }

  interface PortInterface {
    callCount: number,
    entries: Entry[],
    vessels: object[]
}

class LocalComponent extends React.PureComponent<contextConsumerValue> {
    render() {
        const {values} = this.props;
        const portsArr = sortByCallCount(values.ports).map((port: PortInterface) => {
            const entries: Entry[] = port.entries;
            const portInfo = entries[0].port;
            const id = portInfo.id;
            const arrivals: string[] = [];
            const departures: string[] = [];
            const listMaker = (arr: string[], listType: string) => {
                return arr.map((item) => {
                    return <li key={`${id}_${listType}_${item}`}>
                        {item}
                    </li>
                })
            }
            entries.forEach((entry: Entry) => {
                arrivals.push(entry.arrival);
                departures.push(entry.departure);
            });
            const arrivalsList = listMaker(arrivals,'arrivals');
            const departuresList = listMaker(departures,'departuress');
            return (<tr key={`port_table_${portInfo.id}`}>
            <td>{portInfo.name}</td>
            <td>{port.callCount}</td>
            <td>
                <ul className="timeList arrivalsList">
                    {arrivalsList}
                </ul>
            </td>
            <td>
                <ul className="timeList departuresList">
                    {departuresList}
                </ul>
            </td>
        </tr>)
        });

        return (
        <div className="componentBody">
            <table>
                <tr>
                    <th>Port</th>
                    <th>Calls</th>
                    <th>Arrivals</th>
                    <th>Departures</th>
                </tr>
                {portsArr}
            </table>
        </div>);
    }
}

export default class Ports extends Component {

    render() {
        return (
            <Primary>
                <DataConsumer>
                    {(value: contextState) => (
                        <>
                            <SmallHeadline headline="All Ports"/>
                            <LocalComponent values={value}/>
                        </>
                    )}
                </DataConsumer>
            </Primary>);
    }
}