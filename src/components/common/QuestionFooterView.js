//@ts-check


import React from 'react';
import '../styles.css';

import arrow from '../../img/arrow.png'

const QuestionFooterView = ({ backButtonDisabled = false, forwardButtonDisabled = false, forwardClick, backwardClick }) => {
    return (
        <div style={bottomLayout} >
            <button style={backButton}>
                Abbrechen
            </button>
            <button onClick={backwardClick} disabled={backButtonDisabled} style={{
                backgroundColor: '#003A65',
                color: '#fff',
                flexGrow: 1,
                borderStyle: 'none',
                fontSize: '0.7em',
                marginRight: '0.5em',
                height: '2em'
            }}>
                <img src={arrow} style={{ width: '1.7em', margin: 0, transform: "rotate(180deg)" }} alt="User Icon" />
            </button>
            <button onClick={forwardClick} disabled={forwardButtonDisabled} style={weiterButton}>
                <img src={arrow} style={{ width: '1.7em', margin: 0 }} alt="User Icon" />
            </button>
        </div>
    )
}

const bottomLayout = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '0.7em',
    marginBottom: '0.8em',
    height: '1.8em',
    width: '100%'
}

const backButton = {
    backgroundColor: '#fff',
    border: 'solid',
    flexGrow: 1,
    fontSize: '0.7em',
    borderWidth: 2,
    color: '#003A65',
    marginRight: '0.5em',
    borderColor: '#003A65',
    height: '2em'
}

const weiterButton = {
    backgroundColor: '#003A65',
    color: '#fff',
    flexGrow: 1,
    borderStyle: 'none',
    fontSize: '0.7em',
    height: '2em'
}

export { QuestionFooterView };