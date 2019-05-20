import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const ImageLineButton = props => {
    return (
        // <Link style={{ textDecoration: "none" }} to={props.link}>
            <button onClick={props.onPress}
                style={button}>
                <Center>
                    <img src={props.image} style={{ maxHeight: '1.2em', maxWidth: '1.3em', marginRight: 12 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
        // </Link >
    )
}

const button = {
    flex: 1,
    fontWeight: "bold",
    backgroundColor: '#fff0',
    fontSize: "0.8em",
    height: '2.3em',
    border: "solid",
    borderColor: "#fff",
    borderWidth: 2,
    textAlign: "center",
    color: "#fff",
    paddingLeft: '0.7em',
    paddingRight: '0.7em',
    marginBottom: 14,
}

export { ImageLineButton };
