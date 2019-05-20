import React from 'react';
import { Link } from 'react-router-dom'

const Answer = props => {
    return (
        <div style={{
            width: props.answerClicked ? '53em' : '54.5em',
            maxWidth: '90%',
            height: '4em',
            marginBottom: '1em',
            marginLeft: props.answerClicked ? 0 : '-1.5em'
        }}>
            <button disabled={props.check}
                onClick={props.onClick}
                style={{
                    border: 'solid',
                    borderColor: props.colorAnswer,
                    backgroundColor: props.backgroundColor,
                    borderWidth: props.answerClicked ? 3 : 0,
                    outline: 'none',
                    width: '100%',
                    height: '100%',
                    textAlign: 'left',
                    marginBottom: 16
                }}>
                <p style={{ fontSize: 16, color: props.colorAnswer, margin: 12, fontWeight: "bold" }}>
                    {props.text}
                </p>
            </button>
        </div>
    )
}

export { Answer };
