import React from 'react';

import icon from '../../img/logo_ovb_white.png'

const InteractSection = ({title, children}) => {
    return (
        <div className="blueBox" style={interactSection} >
            <div style={{alignItems: "center"}}>
                <img
                    src={icon}
                    style={iconStyle}
                    alt="OVB-Logo" />

                <h1 style={titleStyle}>
                    {title}
                </h1>
            </div>
           {children}
        </div>
    )
}

const interactSection = {
    backgroundColor: "#003A65",
    justifyContent: "flex-start",
    // alignItems: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column"
}

const titleStyle = {
    fontSize: '1em',
    marginBottom: '1.5em',
    width: '15em',
    fontWeight: 'bold',
    marginTop: '3%'
}

const iconStyle = {
    marginTop: '5vh',
    width: '17%'
}

export { InteractSection };
