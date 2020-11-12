import React, { Component } from 'react';
import Primary from '../Layouts/Primary';
import SmallHeadline from '../Components/Functions/SmallHeadline';

type ClassProps = {
    originalPath: string;
}

export default class NotFound extends Component<ClassProps> {

    render() {
        const originalPath = this.props.originalPath;

        return (
            <Primary>
                <SmallHeadline headline="We couldn't find your route" /> 
                <div className="compoentBody"> 
                    {originalPath &&
                        <p>Requested Route <strong>{originalPath}</strong></p>
                    }
                </div>
            </Primary>
        );
    }
}