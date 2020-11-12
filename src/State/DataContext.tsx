import React from 'react';

const DataContext = React.createContext({});

export type contextState = {
    processedVessels: object, 
    vessel_count: number,
    vessels_done: boolean,
    ports: object,
    ports_done: boolean,
    ports_started: boolean
}

export interface contextConsumerValue {
    values: contextState
}


export class DataProvider extends React.Component {

    state: contextState = {
        processedVessels: {},
        vessel_count: 0,
        vessels_done: false,
        ports: {},
        ports_done: false,
        ports_started: false
    };

    /* Obviously in a reaal life situation this would be done server side map reduce 
    like solution (or at any rate what I would do), and save the data for accumulated
    months years etc. and request those as needed. 

    */
    
    
    componentDidMount() {
        fetch('//import-coding-challenge-api.portchain.com/api/v2/vessels').then(response => response.json())
        .then(vessels => {
            const reducedVessels = vessels.reduce((obj, item) => (obj[item.imo] = item, obj) ,{});
            this.setState({processedVessels: reducedVessels, vessels_done: true, vessel_count: vessels.length});
        });
    }
    
    componentDidUpdate() {
        const {vessels_done, ports_started} = this.state;
        if (vessels_done && !ports_started) {
            /*at this level of development not likely to be a problem, but in production maybe
             want to do async stuff.
            */
        
            const insertPortToVessel = (imo: number, portCalls: any[]) => {
                    return (previousState) => {
                        const processedVessels = previousState.processedVessels;
                        if (!processedVessels[imo]) {
                            processedVessels[imo] = {imo, portCalls};
                        } else {
                        const currentPortCalls: any[] = processedVessels[imo].portCalls;
                        
                        processedVessels[imo].portCalls = (currentPortCalls) ?  
                        currentPortCalls.concat(portCalls) : portCalls;
                        return {processedVessels};
                        }
                    };
            }
            const insertVesselToPort = (portId: string, entry, vesselIimo) => {
                return (previousState) => {
                    const ports = previousState.ports;
                    if (!ports[portId]) {
                        ports[portId] = {entries: [entry], vessels: [vesselIimo], callCount: 1};
                    } else {
                        const port = ports[portId];
                        port.callCount = port.callCount + 1;
                        port.entries.push(entry);
                        port.vessels.push(vesselIimo);
                    }
                    return {ports};
                };
            }
            const getPorts = (
                vesselimo: number,
                index: number
            ) => {
                fetch(`//import-coding-challenge-api.portchain.com/api/v2/schedule/${vesselimo}`).then(response => response.json())
                    .then(vesselInfo => {
                        const portCalls = vesselInfo.portCalls;
                        this.setState(insertPortToVessel(vesselimo, portCalls));
                        portCalls.forEach((portCall) => {
                            const portId = portCall.port.id;
                            this.setState(insertVesselToPort( portId, portCall, vesselimo ));

                        })
                        
                 });
            }
            const vessels = Object.keys(this.state.processedVessels);
            const vessel_count = this.state.vessel_count;

            const ports = [];
            this.setState( { ports_started: true } );
            //the imo key will be a string in the object so we convert using Number function
            vessels.forEach((imo, index) => getPorts(Number(imo), index));

        }
    }
    /*
    componentWillUnmount() {
    }*/

    render() {
        const { Provider } = DataContext;
        const state = this.state;
        const addedValues = {
            ...state
        };

        return <Provider value={ this.state }>{ this.props.children }</Provider>;
    }
}

export const DataConsumer = DataContext.Consumer;
