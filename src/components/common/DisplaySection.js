import React from 'react';

const DisplaySection = props => {
    return (
        <div style={displaySection}>
            <h1 style={titleStyle}>
                {props.title}
            </h1>

            {props.children}
        </div>
    )
}

const displaySection = {
    width: '100%',
    height: '100vh',
    margin: '1.5em'
}

const titleStyle = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    margin: 0
}

export { DisplaySection };
