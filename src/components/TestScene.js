import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooter, ImageLineButton } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconWrong from '../img/x_icon.png'
import iconPdfRed from '../img/pdf_red.png'

class TestScene extends Component {
    state = {
        answer1Clicked: false,
        answer2Clicked: false,
        answer3Clicked: false,
        check: false,
        lastAnswerRight: undefined
    }

    answer1Click() {
        if (this.state.check) return;
        console.log(this.state.answer1Clicked);
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: false });
        this.setState({ answer3Clicked: false });
        /*this.props.currentQuestion.question.answer1.choosen = true;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers(); */
    }

    answer2Click() {
        if (this.state.check) return;
        this.setState({ answer2Clicked: true });
        this.setState({ answer1Clicked: false });
        this.setState({ answer3Clicked: false });
        /*
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = true;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers(); */
    }

    answer3Click() {
        if (this.state.check) return;
        this.setState({ answer3Clicked: true });
        this.setState({ answer1Clicked: false });
        this.setState({ answer2Clicked: false });
        /*
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = true;
        this.checkAnswers(); */
    }

    render() {

        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const backgroundColor1 = answer1Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor2 = answer2Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor3 = answer3Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';

        const textColor1 = answer1Clicked ? "#fff" : "#003A65";
        const textColor2 = answer2Clicked ? "#fff" : "#003A65";
        const textColor3 = answer3Clicked ? "#fff" : "#003A65";

        const fontWeightStyle = answer1Clicked ? "bold" : "normal";
        const fontWeightStyle2 = answer2Clicked ? "bold" : "normal";
        const fontWeightStyle3 = answer3Clicked ? "bold" : "normal";

        const marginAnswer1 = answer1Clicked ? 0 : '5%';
        const marginAnswer2 = answer2Clicked ? 0 : '5%';
        const marginAnswer3 = answer3Clicked ? 0 : '5%';

        return (
            <header style={appHeader}>
                <div style={{ height: '100vh', width: '69.5%' }}>
                    <h1 style={titleStyle}>1.2 Frage 9</h1>
                    <p style={questionText}>
                        Welche der nachstehenden angeführten Krankheiten sind so geil das Gott sich gedacht hat sheeborghini a a a a  a a aa a a  lamborghini motherfucker nigga rigga sheesh skrrrrrrrrrrr
                    </p>

                    <div style={questionLine} />

                    <h1 style={titleAnswer}>Antworten</h1>

                    <button
                        onClick={this.answer1Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundColor1,
                            borderWidth: answer1Clicked ? 0 : 2,
                            minHeight: '12%',
                            outline: 'none',
                            textAlign: 'left',
                            fontWeight: fontWeightStyle,
                            marginLeft: marginAnswer1,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor1, margin: 12 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. St
                            et clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                    </button>

                    <button
                        onClick={this.answer2Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            minHeight: '12%',
                            backgroundColor: backgroundColor2,
                            borderWidth: answer2Clicked ? 0 : 2,
                            textAlign: 'left',
                            outline: 'none',
                            fontWeight: fontWeightStyle2,
                            marginLeft: marginAnswer2,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor2, margin: 12 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. St
                        </p>
                    </button>

                    <button
                        onClick={this.answer3Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundColor3,
                            borderWidth: answer3Clicked ? 0 : 2,
                            minHeight: '12%',
                            textAlign: 'left',
                            outline: 'none',
                            fontWeight: fontWeightStyle3,
                            marginLeft: marginAnswer3,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor3, margin: 12 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. St
                            et clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        </p>
                    </button>
                </div>

                <div style={{ width: '0.5%', backgroundColor: '#663399' }} />

                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1.3em', fontWeight: 'bold', marginTop: '3%' }}>
                        Prüfungsmodus
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        3.5 Private Unfallversicherung
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%' }}>
                        Frage 30 / 32
                    </h1>

                    <div style={{ backgroundColor: '#663399', height: '28%', paddingLeft: 16, paddinTop: 16, marginTop: '12.7%', bottom: 0, position: "absolute" }}>
                        <p style={{ textAlign: "left", color: '#fff', marginTop: 0, marginLeft: 12 }}>
                            Aktionen
                        </p>

                        <div align="right" style={{ marginRight: '11%' }}>
                            <ImageButton
                                link="/kategorien"
                                buttonText="PDF öffnen"
                                image={iconPdfRed} />

                            <ImageLineButton
                                buttonText="Falsche Fragen üben"
                                image={iconWrong} />
                        </div>
                    </div>
                </div>
                <QuestionFooter />
            </header>
        );
    }
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Roboto Slab',
    fontSize: `calc(10px + 2vmin)`,
    color: 'white'
}

const questionLine = {
    width: '90%',
    height: 3,
    backgroundColor: "#58ACD9",
    marginLeft: '5%',
    marginRight: '5%'
}

const titleStyle = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '1.5em',
    marginBottom: 4
}

const titleAnswer = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 18
}

const questionText = {
    fontSize: 18,
    color: '#003A65',
    textAlign: "left",
    height: '15%',
    marginLeft: '5%',
    marginRight: '5%',
}

const interactSection = {
    backgroundColor: "#003A65",
    width: '30%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const statisticsText = {
    fontSize: 32,
    textAlign: "right",
    marginRight: '11%',
    marginBottom: 0
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: 12,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 12,
    marginBottom: 12
}

const wrongAnswers = {
    padding: 12,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    border: 'solid',
    borderWidth: 2,
    borderColor: '#fff',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 12,
    marginBottom: 12
}

export default TestScene;