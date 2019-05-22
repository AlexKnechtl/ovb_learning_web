import React from 'react';

import icon from '../../img/logo_ovb_white.png'

const InteractSection = ({title, children}) => {
    return (
        <div className="blueBox" style={interactSection} >
            <img
                src={icon}
                style={iconStyle}
                alt="OVB-Logo" />

            <h1 style={titleStyle}>
                {title}
            </h1>

           {children}
        </div>
    )
}

const interactSection = {
    backgroundColor: "#003A65",
    minWidth: 'max-content',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const titleStyle = {
    fontSize: '1em',
    marginBottom: '1.5em',
    fontWeight: 'bold',
    marginTop: '3%'
}

const iconStyle = {
    marginTop: '5vh',
    width: '17%'
}

export { InteractSection };
