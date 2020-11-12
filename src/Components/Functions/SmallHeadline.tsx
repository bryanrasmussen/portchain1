import React, { Component } from 'react';

const SmallHeadline = (props: {headline: string}) => {

    return (
        <div className="header-small">
            <div className="items">
                <h1 className="subhead">{props.headline}</h1>
            </div>
        </div>);
}
export default SmallHeadline
