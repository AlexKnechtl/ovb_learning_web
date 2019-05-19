import React from 'react';
import { Link } from 'react-router-dom' 
import Center from 'react-center'

const ImageButton = ({ image, onPress, buttonText, mouseOver, mouseLeave, mouseOverBtn, link }) => {

    return (
        <Link style={{ textDecoration: "none" }} to={link}>
            <button
                onMouseOver={mouseOver}
                onMouseLeave={mouseLeave}
                onClick={onPress}
                style={{
                    flex: 1,
                    fontWeight: "bold",
                    backgroundColor: mouseOverBtn ? "#fff8" : "#fff",
                    fontSize: "0.8em",
                    height: '2em',
                    border: "none",
                    textAlign: "center",
                    color: "#003A65",
                    paddingLeft: '0.7em',
                    paddingRight: '0.7em',
                    marginBottom: 14,
                }}>
                <Center>
                    <img
                        src={image}
                        style={{ maxHeight: '1.3em', maxWidth: '1.3em', marginRight: 12 }}
                        alt="User Icon" />
                    {buttonText}
                </Center>
            </button>
        </Link >
    )
}

export { ImageButton };
