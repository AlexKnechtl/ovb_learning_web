//@ts-check


import React from 'react';
import '../styles.css';

import arrow from '../../img/arrow.png'

const QuestionFooterView = ({backButtonDisabled = false, forwardButtonDisabled = false, forwardClick, backwardClick}) => {
    return (
        <div style={bottomLayout} >
            <button style={backButton}>
                Abbrechen
            </button>
            <button onClick={backwardClick} disabled={backButtonDisabled} style={weiterButton}>
                <img src={arrow} style={{ width: '1.7em', margin: 0, transform: "rotate(180deg)" }} alt="User Icon" />
            </button>
            <button onClick={forwardClick} disabled={forwardButtonDisabled} style={weiterButton}>
                <img src={arrow} style={{ width: '1.7em', margin: 0}} alt="User Icon" />
            </button>
        </div>
    )
}

const bottomLayout = {
    position: 'absolute',
    bottom: '1em',
    left: '3.5%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '2em',
    width: '64.3%',
}

const backButton = {
    backgroundColor: '#fff',
    border: 'solid',
    fontSize: 20,
    borderWidth: 2,
    color: '#003A65',
    marginRight: 12,
    borderColor: '#003A65',
    width: '28%',
    height: 40
}

const weiterButton = {
    backgroundColor: '#003A65',
    color: '#fff',
    borderStyle: 'none',
    fontSize: 20,
    marginRight: 12,
    width: '33.4%',
    height: 40
}

export { QuestionFooterView };