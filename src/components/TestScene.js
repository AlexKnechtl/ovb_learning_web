//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { QuestionFooter } from './common';
// @ts-ignore
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import { getNextExamQuestionAction, answerExamQuestionAction, finishExamAction, MultipleChoiceQuestionInteractor } from '../coreFork';
import { connect } from 'react-redux';

class TestScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        check: false,
        lastAnswerRight: undefined
    }

    checkAnswers() {
        var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.exam.currentQuestion.question);
        this.setState({ lastAnswerRight: isright });
        console.log(isright);
        this.props.dispatchAnswerQuestion(this.props.exam.currentIndex, isright);
        this.props.dispatchGetNextQuestion();
        this.setState({ answer1Clicked: true, answer2Clicked: true, answer3Clicked: true, check: false });
    }
    
    answer1Click() {
        this.setState({ check: true, answer1Clicked: false, answer2Clicked: true, answer3Clicked: true });
        this.props.exam.currentQuestion.question.answer1.choosen = true;
        this.props.exam.currentQuestion.question.answer2.choosen = false;
        this.props.exam.currentQuestion.question.answer3.choosen = false;
        // this.checkAnswers();
    }

    answer2Click() {
        this.setState({ check: true, answer1Clicked: true, answer2Clicked: false, answer3Clicked: true });
        this.props.exam.currentQuestion.question.answer1.choosen = false;
        this.props.exam.currentQuestion.question.answer2.choosen = true;
        this.props.exam.currentQuestion.question.answer3.choosen = false;
        // this.checkAnswers();
    }

    answer3Click() {
        this.setState({ check: true, answer1Clicked: true, answer2Clicked: true, answer3Clicked: false });
        this.props.exam.currentQuestion.question.answer1.choosen = false;
        this.props.exam.currentQuestion.question.answer2.choosen = false;
        this.props.exam.currentQuestion.question.answer3.choosen = true;
        // this.checkAnswers();
    }

    render() {
        const currentQuestion = this.props.exam.currentQuestion;
        if (this.props.exam.questions && this.props.exam.currentIndex >= this.props.exam.questions.length)
        this.props.dispatchFinishExam();
        if(!currentQuestion) return null;
        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const backgroundColor1 = !answer1Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor2 = !answer2Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor3 = !answer3Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';

        const textColor1 = !answer1Clicked ? "#fff" : "#003A65";
        const textColor2 = !answer2Clicked ? "#fff" : "#003A65";
        const textColor3 = !answer3Clicked ? "#fff" : "#003A65";

        const fontWeightStyle  =  !answer1Clicked ? "bold" : "normal";
        const fontWeightStyle2  = !answer2Clicked ? "bold" : "normal";
        const fontWeightStyle3  = !answer3Clicked ? "bold" : "normal";

        const marginAnswer1 = !answer1Clicked ? 0 : '5%';
        const marginAnswer2 = !answer2Clicked ? 0 : '5%';
        const marginAnswer3 = !answer3Clicked ? 0 : '5%';

        const questionHeaderText = this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", ".")} Frage ${this.props.exam.currentQuestion.questionId.substr(4)}` : '';
        const questionText = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.question : '';
        const answer1Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer1.answer : '';
        const answer2Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer2.answer : '';
        const answer3Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer3.answer : '';
        const subModuleId = this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", ".")} ${this.props.modules.selectedSubmoduleName}` : '';
        const questionNumberText = this.props.exam.currentQuestion ? `Frage ${this.props.exam.currentIndex + 1} / ${this.props.exam.questions.length}` : '';
        const subModuleName = this.props.modules.modules[currentQuestion.sectionId].modules[currentQuestion.moduleId].name;
        return (
            <header style={appHeader}>
                <div style={{ height: '100vh', width: '69.5%' }}>
                    <h1 
// @ts-ignore
                    style={titleStyle}>{questionHeaderText}</h1>
                    <p 
// @ts-ignore
                    style={questionTextStyle}>{questionText}</p>

                    <div style={questionLine} />

                    <h1 
// @ts-ignore
                    style={titleAnswer}>Antworten</h1>
                    <div style={{display: "flex", flexDirection: "column"}}>
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
                        <p style={{ fontSize: 14, color: textColor1, margin: 12 }}>{answer1Text}</p>
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
                        <p style={{ fontSize: 14, color: textColor2, margin: 12 }}>{answer2Text}</p>
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
                        <p style={{ fontSize: 14, color: textColor3, margin: 12 }}>{answer3Text}</p>
                    </button>
                    </div>
                </div>

                <div style={{ width: '0.5%', backgroundColor: '#663399' }} />

                <div 
// @ts-ignore
                style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1.3em', fontWeight: 'bold', marginTop: '3%' }}>
                        Prüfungsmodus
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        {subModuleId + " " + subModuleName}
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%' }}>
                        {questionNumberText}
                    </h1>
                </div>
                <QuestionFooter onPressContinue={() => this.state.check ? this.checkAnswers() : {}} continueDisabled={!this.state.check} />
            </header>
        );
    }
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
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
    fontWeight: "bold",
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

const questionTextStyle = {
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

// export default TestScene;
const mapDispatchToProps = {
    dispatchGetNextQuestion: getNextExamQuestionAction,
    dispatchAnswerQuestion: answerExamQuestionAction,
    dispatchFinishExam: finishExamAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScene);
