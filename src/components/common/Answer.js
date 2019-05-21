import React from 'react';

const Answer = props => {
    return (
        <div style={{
            width: '100%',
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
                    marginBottom: '0.6em'
                }}>
                <p style={{ fontSize: 16, color: props.colorAnswer, margin: '0.4em', fontWeight: "bold" }}>
                    {props.text}
                </p>
            </button>
        </div>
    )
}

export { Answer };
