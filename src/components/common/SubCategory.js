import React from 'react';
import { Link } from 'react-router-dom'
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const SubCategory = props => {
    return (
        <Link to={props.link} style={{ textDecoration: "none" }}>
            <div style={{
                backgroundColor: '#003A65',
                backgroundSize: '100%',
                width: '40%',
                textDecorationLine: 'none',
                textDecoration: 'none',
                textDecorationColor: '#fff0',
                marginLeft: '1.5em'
            }}>
                <p style={title}> {props.titleName} </p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{ width: '68%', textAlign: "center", marginLeft: 8 }}>
                        <div style={{ color: '#fff', fontSize: "0.65em" }}>
                            0% abgeschlossen
                        </div>
                        <Progress style={progressBar} color="#58ACD9" height={18} completed={75} />
                    </div>
                    <div align="center" style={{ width: '30%' }}>
                        <Center style={erfolgBackground}>
                            <p style={percentageText}>
                                30%
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
    textAlign: "left",
    paddingLeft: "0.4em",
    paddingTop: '0.15em',
    paddingBottom: '0.15em'
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
