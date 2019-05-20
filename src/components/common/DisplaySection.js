//@ts-check

import React from 'react';

const DisplaySection = ({children, title}) => {
    return (
        <div style={displaySection}>
            <h1 style={titleStyle}>
                {title}
            </h1>

            {children}
        </div>
    )
}

const displaySection = {
    width: '100%',
    height: '100%'
}

const titleStyle = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    margin: '1.5em'
}

export { DisplaySection };
