import React from 'react';
import { Link } from 'react-router-dom'
import Progress from 'react-progressbar';
import Center from 'react-center';
import '../styles.css';

const Category = props => {
    return (
        <Link to={props.link} style={{ textDecoration: "none" }}>
            <div style={{
                backgroundImage: `url(${props.categoryImage})`,
                backgroundSize: '110%',
                width: '40%',
                textDecorationLine: 'none',
                textDecoration: 'none',
                textDecorationColor: '#fff0',
                marginLeft: '1.5em'
            }}>
                <p style={title}> {props.titleName} </p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '68%', textAlign: "center", marginLeft: 8 }}>
                        <div style={{ color: '#fff', fontSize: "0.65em" }}>
                            0% abgeschlossen
                        </div>
                        <Progress style={progressBar} color="#94C231" height={18} completed={75} />
                        <p style={{ color: "#fff8", marginTop: 2, fontSize: 16 }}>
                            3 Fragen falsch beantwortet
                        </p>
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
