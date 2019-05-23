
//ts-check
import React from 'react';
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const icSucceded = require('../../img/ic_check_green.png')
const icFailed = require('../../img/ic_wrong_red.png')

const StatisticsCategory = ({ titleText, questionsRight, success, imageUri, questionsFalse, learningState, style }) => {
    return (
        <div style={{
            backgroundImage: `url(${imageUri})`,
            backgroundSize: '110%',
            textDecorationLine: 'none',
            textDecoration: 'none',
            textDecorationColor: '#fff0',
            ...style
        }}>
            <p style={titleTextStyle}>
                {titleText}
            </p>
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
                <p style={{ color: '#fff', fontSize: 20, fontFamily: 'Roboto Slab', textAlign: "right" }}>
                    {questionsFalse} Fragen {"\n"}falsch
            </p>
            </div>
            <Progress style={{ minHeight: 24, width: "100%" }} width={null} progress={learningState} height={24} color={'#2EEF6A'} unfilledColor='#F44B4B' borderWidth={0} borderRadius={0}>
                <p style={{ marginLeft: 12, marginTop: -24, marginBottom: -2, color: "#fff", width: "100%", fontFamily: 'Roboto Slab', fontWeight: "bold", fontSize: 18 }}>{(learningState * 100).toFixed(0)} %</p>
            </Progress>
        </div>
    )
}

const containerStyle = {
    height: 128,
    paddingHorizontal: 12,
    paddingVertical: 2
}

const textErfolg = {
    fontSize: 14,
    fontFamily: 'Roboto Slab',
    margin: 3,
    color: "#fff"
}

const titleTextStyle = {
    fontSize: 20,
    fontFamily: 'Roboto Slab',
    fontWeight: "bold",
    color: "#fff"
}

const textStyle = {
    fontSize: 16,
    fontFamily: 'Roboto Slab',
    marginTop: 8,
    marginBottom: 6,
    color: '#fff'
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

const detailsButton = {
    backgroundColor: "#003A65",
    flexDirection: "row",
    marginTop: -16,
    alignItems: "center",
    width: '35%',
    alignSelf: "flex-end",
    padding: 6,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

export { StatisticsCategory };
