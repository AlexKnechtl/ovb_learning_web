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
                    fontSize: "0.9em",
                    height: '2em',
                    width: '78%',
                    borderWidth: 2,
                    borderColor: '#fff4',
                    textAlign: "center",
                    color: "#fff",
                    paddingLeft: '0.8em',
                    paddingRight: '0.8em',
                    marginBottom: 14,
                }}>
                <Center style={{}}>
                    <img src={props.image} style={{ height: '1.3em', marginRight: 12 }} alt="User Icon" />
                    {props.buttonText}
                </Center>
            </button>
        </Link >
    )
}

export { CategoryButton };