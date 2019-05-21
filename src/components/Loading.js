import React, { Component } from 'react'
import { StageSpinner } from "react-spinners-kit";
import icon from '../img/logo_ovb_white.png'

export default class Loading extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        backgroundColor: '#003A65',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column'
      }}>

        <img src={icon} style={ovbIcon} alt="ovb_logo" />

        <h1 style={{
          fontFamily: 'Roboto Slab',
          color: '#fff',
          fontSize: '2.2em'
        }}>
          Learning Suite
        </h1>

        <StageSpinner
          size={36}
          color="#fff"
        />

        <p style={{
          fontFamily: 'Roboto Slab',
          color: '#fff',
          fontSize: '1.4em'
        }}>
          Lade Daten...
        </p>
      </div>
    )
  }
}

const ovbIcon = {
  width: '7em'
}
