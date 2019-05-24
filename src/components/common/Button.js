import React from 'react';
import { Link } from 'react-router-dom'

const Button = ({ onPress, buttonText, backgroundColor }) => {
  return (
    <button onClick={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderStyle: 'none',
        fontSize: '0.9em',
        color: '#003A65',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        paddingLeft: '3em',
        paddingRight: '3em',
        fontWeight: "bold",
        paddingHorizontal: "0.3em"
      }}>
      {buttonText}
    </button>
  )
}

const button = {

}

export { Button };
