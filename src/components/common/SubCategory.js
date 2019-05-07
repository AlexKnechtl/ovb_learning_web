//@ts-check

import React from 'react';
import { Link } from 'react-router-dom'
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const SubCategory = ({titleText, link, onPress,successRate, learningState, ...props}) => {
    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <div onClick={onPress} style={{
                backgroundColor: '#003A65',
                backgroundSize: '100%',
                width: '40%',
                textDecorationLine: 'none',
                textDecoration: 'none',
                textDecorationColor: '#fff0',
                marginLeft: '1.5em'
            }} {...props}>
                <p style={title}> {titleText} </p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{ width: '68%', textAlign: "center", marginLeft: 8 }}>
                        <div style={{ color: '#fff', fontSize: "0.65em" }}>
                            {(learningState*100).toFixed(0)}% abgeschlossen
                        </div>
                        <Progress style={progressBar} color="#58ACD9" height={18} completed={learningState*100} />
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
        </Link >
    )
}

const title = {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#fff3",
    fontSize: "0.7em",
    marginBottom: '0.75em',
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
    height: 35,
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1
}

const erfolgschance = {
    color: "#fff",
    fontSize: 10,
    marginTop: 6,
    flex: 1
}

export { SubCategory };
