import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const ImageButton = props => {
    return (
        <Link style={{ textDecoration: "none" }} to={props.link}>
            <button
                style={button}>
                <Center>
                    <img src={props.image} style={{ height: '1.3em', marginRight: 12 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
        </Link >
    )
}

const button = {
    flex: 1,
    fontWeight: "bold",
    backgroundColor: "#fff",
    fontSize: "0.8em",
    height: '2em',
    border: "none",
    textAlign: "center",
    color: "#003A65",
    paddingLeft: '0.8em',
    paddingRight: '0.8em',
    marginBottom: 14,
}

export { ImageButton };
