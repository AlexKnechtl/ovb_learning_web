import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const ImageLineButton = props => {
    return (
            <button onClick={props.onPress}
                onMouseOver={props.mouseOver}
                onMouseLeave={props.mouseLeave}
                onClick={props.onPress}
                style={{
                    flex: 1,
                    fontWeight: "bold",
                    backgroundColor: '#fff0',
                    fontSize: "0.8em",
                    height: '2.3em',
                    border: "solid",
                    borderColor: props.mouseOverState ? '#fff9' : '#fff',
                    borderWidth: 2,
                    textAlign: "center",
                    color: props.mouseOverState ? '#fff9' : '#fff',
                    paddingLeft: '0.7em',
                    paddingRight: '0.7em',
                    marginBottom: 14
                }}>
                <Center>
                    <img src={props.image} style={{ maxHeight: '1.2em', maxWidth: '1.3em', marginRight: 12, opacity: props.mouseOverState ? 0.8 : 1 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
        // </Link >
    )
}

export { ImageLineButton };
