
//ts-check
import React from 'react';
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const icSucceded = require('../../img/ic_check_green.png')
const icFailed = require('../../img/ic_wrong_red.png')

const StatisticsCategory = ({ titleText, questionsRight, success, imageUri, questionsFalse, learningState, onPress, style }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${imageUri})`,
            backgroundSize: '110%',
            backgroundColor: '#003A65',
            textDecorationLine: 'none',
            textDecoration: 'none',
            textDecorationColor: '#fff0',
            ...style
        }} onClick={onPress}>

            <p numberOfLines={1} style={title}> {titleText} </p>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: "row", justifyContent: "space-between", height: '2.8em' }}>
                <p style={questionInfo}>
                    {questionsRight} Fragen {"\n"}richtig
                </p>
                <div style={{
                    display: 'flex',
                    width: '1.8em',
                    height: '1.8em',
                    borderRadius: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#fff0',
                    border: 'solid',
                    borderColor: success ? '#2EEF6A' : '#F44B4B',
                    borderWidth: 2
                }}>
                    <img style={icon} src={success ? icSucceded : icFailed} />
                </div>
                <p style={questionInfo}>
                    {questionsFalse} Fragen {"\n"}falsch
                </p>
            </div>
            <Progress style={progressBar} completed={(learningState * 100).toFixed(0)} height={'0.8em'} color={'#2EEF6A'}>
                <p style={percentageText}>
                    {(learningState * 100).toFixed(0)} %
                </p>
            </Progress>
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

const percentageText = {
    fontSize: '0.7em',
    marginLeft: 5,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "bold"
}

const progressBar = {
    backgroundColor: "#F44B4B",
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
    height: '0.8em'
}

const questionInfo = {
    color: '#fff',
    fontSize: 20,
    margin: '0.5em',
    height: '0.8em',
    fontFamily: 'Roboto Slab',
}

const icon = {
    height: 24,
    width: 28
}

export { StatisticsCategory };
