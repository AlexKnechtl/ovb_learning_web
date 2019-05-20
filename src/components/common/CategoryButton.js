import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const CategoryButton = ({onPress, buttonText, image}) => {
    return (
            <button onClick={onPress}
                style={{
                    flex: 1,
                    fontWeight: "bold",
                    backgroundColor: "#003A65",
                    fontSize: "1em",
                    height: '2em',
                    minWidth: '10em',
                    borderWidth: 2,
                    borderColor: '#fff4',
                    textAlign: "center",
                    color: "#fff",
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    marginBottom: 14,
                }}>
                <Center>
                    <img src={image} style={{ height: '1.6em', marginRight: 24 }} alt="User Icon" />
                    {buttonText}
                </Center>
            </button>
    )
}

export { CategoryButton };