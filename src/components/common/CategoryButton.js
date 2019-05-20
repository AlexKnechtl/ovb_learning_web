//@ts-check

import React from 'react';
import Center from 'react-center'

const CategoryButton = props => {
    return (
            <button onClick={props.onPress}
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
                    borderColor: mouseOverState ? '#fff9' : '#fff',
                    border: "solid",
                    textAlign: "center",
                    color: mouseOverState ? '#fff9' : '#fff',
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    marginBottom: 14,
                }}>
                <Center>
                    <img src={image} style={{ height: '1.6em', marginRight: 24, opacity: mouseOverState ? 0.8 : 1 }} alt="User Icon" />
                    {buttonText}
                </Center>
            </button>
    )
}

export { CategoryButton };