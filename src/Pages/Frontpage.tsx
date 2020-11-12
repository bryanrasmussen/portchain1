import React, { Component } from 'react';
import Primary from '../Layouts/Primary';
import SmallHeadline from '../Components/Functions/SmallHeadline';


export default class Frontpage extends Component {

    render() {
        return (
            <Primary>
                <>
                    <SmallHeadline 
                    headline="Front Page - Import and analyse container vessel schedules"/>
                    <div className="compoentBody">
                        <p>The Dashboard should show:</p>
                        <ol>
                            <li>The 5 ports with the most arrivals, and the corresponding 
                                number of total
                            port calls for each port.</li>
                            <li>The 5 ports that have the fewest port calls, 
                                and the number of total port calls
                                for each port.</li>
                            <li>For each port, the percentiles of port call durations: 
                                5th, 20th, 50th, 75th and 90th
                                percentiles.</li>
                            <li> For each vessel, calculate the 5th, 50th and 80th percentiles 
                                for the port call delay
                                when the vessel is 14, 7 and 2 days from arrival.
                            </li>
                        </ol>
                    </div>
                </>

            </Primary>
        );
    }
}