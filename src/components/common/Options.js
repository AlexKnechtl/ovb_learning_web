import React from 'react';

const Options = props => {
    return (
        <button
            style={button}>
            Einstellungen | Impressum
        </button>
    )
}

const button = {
    position: "absolute",
    left: '1.5em',
    bottom: '1.0em',
    backgroundColor: "#fff",
    fontSize: "0.8em",
    borderWidth: 2,
    textAlign: "center",
    borderColor: '#003A65',
    color: "#003A65",
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingTop: '0.4em',
    paddingBottom: '0.4em'
}

export { Options };
