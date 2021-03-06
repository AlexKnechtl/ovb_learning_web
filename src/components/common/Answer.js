import React from 'react';

const Answer = props => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '4em',
            marginBottom: '1em',
            marginLeft: props.marginAnswer
        }}>
            <button disabled={props.check}
                onClick={props.onClick}
                style={{
                    border: 'solid',
                    borderColor: props.colorAnswer,
                    backgroundColor: props.backgroundColor,
                    borderWidth: props.answerClicked ? 3 : 0,
                    outline: 'none',
                    flexGrow: 1,
                    height: '100%',
                    textAlign: 'left',
                    marginBottom: '0.6em'
                }}>
                <p style={{ fontSize: 16, color: props.colorAnswer, padding: '1.5em', margin: 0, fontWeight: "bold" }}>
                    {props.text}
                </p>
            </button>
        </div>
    )
}

export { Answer };
