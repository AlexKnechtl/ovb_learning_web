import React from 'react';
import { Link } from 'react-router-dom'
import Center from 'react-center'

const CategoryButton = props => {
    return (
        <Link style={{ textDecoration: "none" }} to={props.link}>
            <button
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
                    <img src={props.image} style={{ height: '1.6em', marginRight: 24 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
        </Link >
    )
}

export { CategoryButton };