import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const CategoryButton = ({onPress, buttonText, image}) => {
    return (
            <button onClick={onPress}
                onMouseOver={props.mouseOver}
                onMouseLeave={props.mouseLeave}
                style={{
                    flex: 1,
                    fontWeight: "bold",
                    backgroundColor: "#003A65",
                    fontSize: "1em",
                    height: '2em',
                    minWidth: '10em',
                    borderWidth: 2,
                    borderColor: props.mouseOverState ? '#fff9' : '#fff',
                    border: "solid",
                    textAlign: "center",
                    color: props.mouseOverState ? '#fff9' : '#fff',
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    marginBottom: 14,
                }}>
                <Center>
                    <img src={props.image} style={{ height: '1.6em', marginRight: 24, opacity: props.mouseOverState ? 0.8 : 1 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
    )
}

export { CategoryButton };