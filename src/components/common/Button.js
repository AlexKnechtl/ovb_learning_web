import React from 'react';
import { Link } from 'react-router-dom'

const Button = ({onPress, buttonText, link = null}) => {
  return (
    // <Link to={link}>
      <button onClick={onPress}
        style={button}>
        {buttonText}
      </button>
    // </Link>
  )
}

const button = {
  backgroundColor: '#fff',
  borderStyle: 'none',
  fontSize: '0.9em',
  color: '#003A65',
  paddingTop: '0.5em',
  paddingBottom: '0.5em',
  paddingLeft: '3em',
  paddingRight: '3em',
  fontWeight: "bold",
  paddingHorizontal: "0.3em"
}

export { Button };
