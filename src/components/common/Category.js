import React from 'react';
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const Category = ({ imageUri, titleText, onPress, learningState, isPressed, questionsFalse, questionsRight, successRate, testMode,style, ...props }) => {
    return (
        <div onClick={onPress} style={{
            backgroundImage: `url(${imageUri})`,
            backgroundSize: '110%',
            textDecorationLine: 'none',
            textDecoration: 'none',
            textDecorationColor: '#fff0',
            ...style
        }} {...props}>
            <p numberOfLines={1} style={title}> {titleText} </p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '68%', textAlign: "center", marginLeft: 8 }}>
                    <div style={{ color: '#fff', fontSize: "0.65em" }}>
                        Lernfortschritt
                        </div>
                    <Progress style={progressBar} color="#94C231" height={'0.7em'} completed={learningState * 100} />
                    <p style={{ color: "#fff8", marginTop: 2, fontSize: '0.5em' }}>
                        {questionsRight} Fragen richtig / {questionsFalse} falsch
                        </p>
                </div>
                <div align="center" style={{ width: '30%' }}>
                    <Center style={{
                        backgroundColor: isPressed ? 'rgba(46, 239, 100, 0.55)' : '#fff2',
                        width: '2em',
                        height: '2em',
                        flex: 1
                    }}>
                        {() => {
                            if (!testMode) {
                                isPressed = false;
                                return <p style={percentageText}> {(successRate * 100).toFixed(0)} % </p>;
                            } else {
                                return <img source={require('../../img/ic_check.png')} style={{ width: isPressed ? 31 : 0, height: 24 }} />;
                            }
                        }}
                    </Center>
                    <p style={{
                        fontSize: '0.5em',
                        marginTop: 6,
                        marginBottom: 0,
                        flex: 1
                    }}>
                        {testMode ? '' : 'Erfolgschance'}
                    </p>
                </div>
            </div>
        </div>
    )
}

const title = {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#fff3",
    marginTop: 0,
    marginBottom: '0.85em',
    fontSize: "0.7em",
    maxLines: 1,
    maxHeight: '1.3em',
    height: '1.3em',
    overflow: "hidden",
    textAlign: "left",
    paddingLeft: "0.6em",
    paddingTop: '0.3em',
    paddingBottom: '0.3em'
}

const progressBar = {
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: "#fff3",
    margin: 6
}

const percentageText = {
    verticalAlign: "center",
    flex: 1,
    color: '#fff',
    textAlign: "center",
    fontSize: '0.7em',
    fontWeight: "bold"
}

const erfolgBackground = {

}

const erfolgschance = {

}

export { Category };
