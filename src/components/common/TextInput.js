//@ts-check
import React from 'react';
import '../styles.css';
import PropTypes from 'prop-types';

const TextInput = ({icon, name, hint, onChange, autofocus = false, ...restProps}) => {
    return (
        <div style={rowTransparent} >
            <img src={icon} style={{ height: '1em', marginLeft: '0.6em' }} alt="User Icon" />
            <hr style={verticalLine} />
            <div style={{ flexDirection: 'row' }} >
                <input style={inputStyle} type="text" onChange={onChange} name={name} placeholder={hint} autofocus={autofocus} {...restProps} />
            </div>
        </div>
    )
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    hint: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.any
}

const rowTransparent = {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
    borderStyle: 'none',
    fontSize: '0.8em',
    margin: 0,
    color: '#fff'
}

export { TextInput };
