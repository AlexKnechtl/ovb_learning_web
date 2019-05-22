//@ts-check

import React from 'react';
import '../styles.css';

const QuestionFooter = ({mouseBackState, mouseLeaveBack, onPressBack, onPressContinue, mouseOverBack, mouseOverWeiter, continueDisabled, mouseLeaveWeiter, mouseWeiterState }) => {
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
                    opacity: mouseBackState ? 0.7 : 1,
                    height: '2em'
                }}
                onMouseOver={mouseOverBack}
                onMouseLeave={mouseLeaveBack}
                onClick={onPressBack}>
                Abbrechen
            </button>

            <button
                style={{
                    backgroundColor: '#003A65',
                    color: mouseWeiterState ? '#fff9' : '#fff',
                    fontWeight: "bold",
                    borderStyle: 'none',
                    fontSize: '0.7em',
                    flexGrow: 2,
                    height: '2em'
                }}
                onMouseOver={mouseOverWeiter}
                onMouseLeave={mouseLeaveWeiter}
                onClick={onPressContinue}
                disabled={continueDisabled}>
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