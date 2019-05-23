
//ts-check
import React from 'react';
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const icSucceded = require('../../img/ic_check_green.png')
const icFailed = require('../../img/ic_wrong_red.png')

const StatisticsCategory = ({ titleText, questionsRight, success, imageUri, questionsFalse, learningState, style }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} onClick={onPress}>
            <div style={{
                backgroundImage: `url(${imageUri})`,
                backgroundSize: '110%',
                textDecorationLine: 'none',
                textDecoration: 'none',
                textDecorationColor: '#fff0',
                ...style
            }}>

            </div>
            <p numberOfLines={1} style={title}> {titleText} </p>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
                <p style={questionInfo}>
                    {questionsRight} Fragen {"\n"}richtig
            </p>
                <div style={{
                    width: 58,
                    height: 58,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#fff0',
                    borderColor: success ? '#2EEF6A' : '#F44B4B',
                    borderWidth: 2
                }}>
                    <img style={icon} src={success ? icSucceded : icFailed} />
                </div>
            </div>
            <Progress style={{ minHeight: 24, width: "100%" }} width={null} progress={30} height={24} color={'#2EEF6A'} unfilledColor='#F44B4B' borderWidth={0} borderRadius={0}>
                <p style={{ marginLeft: 12, marginTop: -24, marginBottom: -2, color: "#fff", width: "100%", fontFamily: 'Roboto Slab', fontWeight: "bold", fontSize: 18 }}>{(learningState * 100).toFixed(0)} %</p>
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

const questionInfo = {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto Slab',
}

const icon = {
    height: 24,
    width: 28
}

export { StatisticsCategory };
