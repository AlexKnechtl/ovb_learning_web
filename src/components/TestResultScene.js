//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooter, QuestionFooterView, AppHeader } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import { getNextExamResultQuestionAction, getPrevExamResultQuestionAction } from '../coreFork';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { goBack } from 'connected-react-router';

class TestResultScene extends Component {
    state = {
        answer1Clicked: false,
        answer2Clicked: false,
        answer3Clicked: false,
        check: false,
        lastAnswerRight: undefined,
        currentQuestion: undefined,
        currQuestionIndex: 0
    }

    render() {

        var currentQuestion = this.props.examResult.currentQuestion;
        if (!currentQuestion) {
            return;
        }

        const answer1Clicked = !currentQuestion.question.answer1.choosen;
        const answer2Clicked = !currentQuestion.question.answer2.choosen;
        const answer3Clicked = !currentQuestion.question.answer3.choosen;

        //Antwort die ausgewählt wurde
        const marginAnswer1 = answer1Clicked ? 20 : -1;
        const marginAnswer2 = answer2Clicked ? 20 : -1;
        const marginAnswer3 = answer3Clicked ? 20 : -1;

        const fontWeightStyle = answer1Clicked ? "normal" : "bold";
        const fontWeightStyle2 = answer2Clicked ? "normal" : "bold";
        const fontWeightStyle3 = answer3Clicked ? "normal" : "bold";

        //Hier muss nur noch die richtige Farbe der Antworten angezeigt werden
        //Richtig --> Grün Falsch --> Rot
        const backgroundColor1 = currentQuestion.question.answer1.isRight ? '#23B800' : '#B21515';
        const backgroundColor2 = currentQuestion.question.answer2.isRight ? '#23B800' : '#B21515';
        const backgroundColor3 = currentQuestion.question.answer3.isRight ? '#23B800' : '#B21515';

        let lineColor1;

        if (backgroundColor1 == '#23B800' && !answer1Clicked || backgroundColor2 == '#23B800' && !answer2Clicked || backgroundColor3 == '#23B800' && !answer3Clicked)
            lineColor1 = '#23B800';
        else if (answer1Clicked && answer2Clicked && answer3Clicked)
            lineColor1 = '#00B7E5'
        else
            lineColor1 = '#B21515'

        var question = currentQuestion.question.question;

        var a1 = currentQuestion.question.answer1.answer;
        var a2 = currentQuestion.question.answer2.answer;
        var a3 = currentQuestion.question.answer3.answer;
        const pdfSrc = ((currentQuestion||{}).pdfInfo||{}).url;
        const pdfPage = ((currentQuestion||{}).pdfInfo||{}).pageNumber;

        var canGetNextQuestion = this.props.examResult.canGetNextQuestion;
        var cangetPrevQuestion = this.props.examResult.currentIndex > 0;

        
        const questionHeaderText = `${currentQuestion.moduleId.replace("_", "\.")} Frage ${currentQuestion.questionId.substr(4)}`;
        // const questionText = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.question : '';
        // const answer1Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer1.answer : '';
        // const answer2Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer2.answer : '';
        // const answer3Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer3.answer : '';
        const subModuleId = `${currentQuestion.moduleId.replace("_", "\.")}`;
        const questionNumberText = `Frage ${this.props.examResult.currentIndex + 1} / ${this.props.examResult.questions.length}`;
        const subModuleName = this.props.modules.modules[currentQuestion.sectionId].modules[currentQuestion.moduleId].name;

        return (
            <AppHeader>
                
                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1.3em', fontWeight: 'bold', marginTop: '3%' }}>
                        Prüfung
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        {subModuleId + " " + subModuleName}
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%' }}>
                        {questionNumberText}
                    </h1>

                    <div style={{ backgroundColor: '#663399', height: '28%', paddingLeft: 16, paddinTop: 16, marginTop: '12.7%', bottom: 0, position: "absolute" }}>
                        <p style={{ textAlign: "left", color: '#fff', marginTop: 0, marginLeft: 12 }}>
                            Aktionen
                        </p>

                        <div align="right" style={{ marginRight: '11%' }}>
                        <Link to={`/pdf?url=${btoa(pdfSrc)}&page=${pdfPage}`}>
                            <ImageButton
                                // link="/kategorien"
                                buttonText="PDF öffnen"
                                image={iconContinue} />
                        </Link>
                        </div>
                    </div>
                </div>
                <div style={{ width: '0.5%', backgroundColor: '#663399' }} />

                <div style={{ height: '100vh', width: '69.5%' }}>
                    <h1 style={titleStyle}>{questionHeaderText}</h1>
                    <p style={questionText}>{question}</p>
                    <div style={questionLine} />

                    <h1 style={titleAnswer}>Antworten</h1>

                    <div
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundColor1,
                            borderWidth: answer1Clicked ? 0 : 2,
                            minHeight: '12%',
                            outline: 'none',
                            textAlign: 'left',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: '#fff', margin: 12 }}>{a1}</p>
                    </div>

                    <div
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            minHeight: '12%',
                            backgroundColor: backgroundColor2,
                            borderWidth: answer2Clicked ? 0 : 2,
                            textAlign: 'left',
                            outline: 'none',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: '#fff', margin: 12 }}>{a2}</p>
                    </div>

                    <div
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundColor3,
                            borderWidth: answer1Clicked ? 0 : 2,
                            minHeight: '12%',
                            textAlign: 'left',
                            width: '90%',
                            outline: 'none',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: '#fff', margin: 12 }}>{a3}</p>
                    </div>
                    <QuestionFooterView
                            backwardClick={() => this.props.dispatchGetPrevQuestion()}
                            forwardClick={() => this.props.dispatchGetNextQuestion()}
                            backButtonDisabled={!cangetPrevQuestion}
                            forwardButtonDisabled={!canGetNextQuestion} 
                            abbortClick={() => this.props.dispatchGoBack()}/>
                </div>
            </AppHeader>
        );
    }
}
const bottomLayout = {
    position: 'absolute',
    bottom: '1em',
    left: '3.5%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '2em',
    width: '64.3%',
}

const backButton = {
    backgroundColor: '#fff',
    border: 'solid',
    fontSize: 20,
    borderWidth: 2,
    color: '#003A65',
    marginRight: 12,
    borderColor: '#003A65',
    width: '50%',
    height: 40
}

const weiterButton = {
    backgroundColor: '#003A65',
    color: '#fff',
    borderStyle: 'none',
    fontSize: 20,
    marginRight: 12,
    width: '50%',
    height: 40
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

const mapDispatchToProps = {
    dispatchGetNextQuestion: getNextExamResultQuestionAction,
    dispatchGetPrevQuestion: getPrevExamResultQuestionAction,
    dispatchGoBack: goBack
};

const mapStateToProps = state => ({
    exam: state.exam,
    examResult: state.exam.moduleResults,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultScene);
