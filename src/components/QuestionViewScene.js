import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooterView } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'

class QuestionViewScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        check: false,
        lastAnswerRight: undefined
    }

    answer1Click() {
        if (this.state.check) return;
        console.log(this.state.answer1Clicked);
        this.setState({ answer1Clicked: false });
        this.setState({ answer2Clicked: true });
        this.setState({ answer3Clicked: true });
        /*this.props.currentQuestion.question.answer1.choosen = true;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers(); */
    }

    answer2Click() {
        if (this.state.check) return;
        this.setState({ answer2Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer3Clicked: true });
        /*
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = true;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers(); */
    }

    answer3Click() {
        if (this.state.check) return;
        this.setState({ answer3Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: true });
        /*
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = true;
        this.checkAnswers(); */
    }

    render() {

        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const backgroundAnswer1 = answer1Clicked ? '#23B800' : '#B21515';
        const backgroundAnswer2 = answer2Clicked ? '#23B800' : '#B21515';
        const backgroundAnswer3 = answer3Clicked ? '#23B800' : '#B21515';

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
                            backgroundColor: backgroundAnswer1,
                            borderWidth: answer1Clicked ? 0 : 2,
                            minHeight: '12%',
                            outline: 'none',
                            textAlign: 'left',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: answer1Clicked ? '#fff' : '#fff', margin: 12 }}>
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
                            backgroundColor: backgroundAnswer2,
                            borderWidth: answer2Clicked ? 0 : 2,
                            textAlign: 'left',
                            outline: 'none',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: backgroundAnswer2, margin: 12 }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. St
                        </p>
                    </button>

                    <button
                        onClick={this.answer3Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundAnswer3,
                            borderWidth: answer1Clicked ? 0 : 2,
                            minHeight: '12%',
                            textAlign: 'left',
                            width: '90%',
                            outline: 'none',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: backgroundAnswer3, margin: 12 }}>
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
                        Übungsmodus
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        3.5 Private Unfallversicherung
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%', marginTop: 6 }}>
                        Frage 30 / 32
                    </h1>

                    <div align="left" style={{ marginLeft: '10%', marginBottom: -4, marginTop: '12%' }}>
                        <p style={{ textALign: 'left', color: '#fff', margin: 0 }}>
                            Statistik Aktuell
                        </p>
                    </div>

                    <p style={wrongAnswers}>
                        4 Antworten falsch
                    </p>

                    <p style={questionBackText}>
                        16 Antworten richtig
                    </p>

                    <div style={{ backgroundColor: '#663399', height: '28%', paddingLeft: 16, paddinTop: 16, marginTop: '12.7%', bottom: 0, position: "absolute" }}>
                        <p style={{ textAlign: "left", color: '#fff', marginTop: 0, marginLeft: 12 }}>
                            Aktionen
                        </p>

                        <div align="right" style={{ marginRight: '11%' }}>
                            <ImageButton
                                link="/kategorien"
                                buttonText="PDF öffnen"
                                image={iconContinue} />

                            <ImageButton
                                buttonText="Falsche Fragen üben"
                                image={iconContinue} />
                        </div>
                    </div>
                </div>

                <QuestionFooterView forwardClick={{}} backwardClick={{}} />
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

export default QuestionViewScene;