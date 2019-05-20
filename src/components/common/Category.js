
import React from 'react';
import { Link } from 'react-router-dom'
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const Category = ({imageUri, titleText, onPress, learningState, isPressed, questionsFalse, questionsRight, successRate, testMode, style, ...props}) => {
    return (
        // <Link to={link} style={{ textDecoration: "none" }}>
            <div onClick={onPress} style={{
                backgroundImage: `url(${imageUri})`,
                backgroundSize: '110%',
                // minWidth: '12em',
                // maxWidth: '15em',
                textDecorationLine: 'none',
                textDecoration: 'none',
                textDecorationColor: '#fff0',
                ...style
            }} {...props}>
                <p style={title}> {titleText} </p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '68%', textAlign: "center", marginLeft: 8 }}>
                        <div style={{ color: '#fff', fontSize: "0.65em" }}>
                            Lernfortschritt
                        </div>
                        <Progress style={progressBar} color="#94C231" height={18} completed={learningState*100} />
                        <p style={{ color: "#fff8", marginTop: 2, fontSize: 16 }}>
                        {questionsRight} Fragen richtig / {questionsFalse} falsch
                        </p>
                    </div>
                    <div align="center" style={{ width: '30%' }}>
                        <Center style={erfolgBackground}>
                            <p style={percentageText}>
                                {(successRate * 100).toFixed(0)} %
                            </p>
                        </Center>
                        <p style={erfolgschance}>
                            Erfolgschance
                        </p>
                    </div>
                </div>
            </div>
        // </Link >
    )
}

const title = {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#fff3",
    marginBottom: '0.85em',
    fontSize: "0.7em",
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
    fontSize: 16,
    fontWeight: "bold"
}

const erfolgBackground = {
    backgroundColor: '#fff2',
    width: 55,
    height: 55,
    flex: 1
}

const erfolgschance = {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    flex: 1
}

export { Category };
