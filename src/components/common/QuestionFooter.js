import React from 'react';
import '../styles.css';

const QuestionFooter = props => {
    return (
        <div style={bottomLayout} >
            <button
                style={{
                    backgroundColor: '#fff',
                    border: 'solid',
                    fontSize: 20,
                    fontWeight: "bold",
                    borderWidth: 2,
                    color: '#003A65',
                    marginRight: 12,
                    borderColor: '#003A65',
                    opacity: props.mouseBackState ? 0.7 : 1,
                    width: '28%',
                    height: 42
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
                    fontSize: 20,
                    marginRight: 12,
                    width: '68%',
                    height: 42
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
    position: 'absolute',
    bottom: '1em',
    left: '5%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '2em',
    width: '64.3%',
    maxWidth: '120em'
}

export { QuestionFooter };