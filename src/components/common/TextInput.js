import React from 'react';
import '../styles.css';

const TextInput = props => {
    return (
        <div style={rowTransparent} >
            <img src={props.icon} style={{ height: '1em', marginLeft: '0.6em' }} alt="User Icon" />
            <hr style={verticalLine} />
            <form style={{ flexDirection: 'row' }} >
                <input style={inputStyle} type="text" name={props.name} placeholder={props.hint} />
            </form>
        </div>
    )
}

const rowTransparent = {
    backgroundColor: '#fff3',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '2em',
    marginBottom: '0.7em',
    width: '80%',
    minWidth: '4em',
    alignItems: 'center',
    marginLeft: '10%'
}

const verticalLine = {
    height: '65%',
    width: '2px',
    backgroundColor: '#fff',
    borderStyle: 'none',
    marginTop: 0,
    marginBottom: 0,
    marginRight: '0.4em',
    marginLeft: '0.4em'
}

const inputStyle = {
    backgroundColor: '#fff0',
    borderStyle: 'none',
    fontSize: '0.8em',
    margin: 0,
    color: '#fff'
}

export { TextInput };