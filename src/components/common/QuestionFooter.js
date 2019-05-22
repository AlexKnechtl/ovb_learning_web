import React from 'react';
import '../styles.css';

const QuestionFooter = props => {
    return (
        <div style={bottomLayout} >
            <button
                style={{
                    backgroundColor: '#fff',
                    border: 'solid',
                    fontSize: '0.7em',
                    fontWeight: "bold",
                    borderWidth: 2,
                    color: '#003A65',
                    marginRight: '0.5em',
                    borderColor: '#003A65',
                    flexGrow: 1,
                    opacity: props.mouseBackState ? 0.7 : 1,
                    height: '2em'
                }}
                onMouseOver={props.mouseOverBack}
                onMouseLeave={props.mouseLeaveBack}
                onClick={props.onPressBack}>
                Abbrechen
            </button>

            <button
                style={{
                    backgroundColor: '#003A65',
                    color: props.mouseWeiterState ? '#fff9' : '#fff',
                    fontWeight: "bold",
                    borderStyle: 'none',
                    fontSize: '0.7em',
                    flexGrow: 2,
                    height: '2em'
                }}
                onMouseOver={props.mouseOverWeiter}
                onMouseLeave={props.mouseLeaveWeiter}
                onClick={props.onPressContinue}
                disabled={props.continueDisabled}>
                Weiter
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
    height: '100%',
    width: '100%'
}

export { QuestionFooter };