//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import './styles.css';

import { ImageButton, QuestionFooter, ImageLineButton, FinishedPopup, InteractSection, Answer, DisplaySection, AppHeader } from './common';
import { updateCurrentQuestion, getNextQuestionAction, MultipleChoiceQuestionInteractor, LearningAlgorithm, QuestionService, LearningService, learnFalseQuestionsFromModuleAction } from '../coreFork';
import { connect } from 'react-redux';

import iconWrong from '../img/x_icon.png'
import iconPdfRed from '../img/pdf_red.png'
import { Link } from "react-router-dom";
import { goBack } from 'connected-react-router';

class QuestionScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        check: false,
        lastAnswerRight: undefined,
        mouseOverPdf: false,
        mouseOverWrong: false,
        mouseOverWeiter: false,
        mouseOverCancel: false
    }

    la = new LearningAlgorithm(new QuestionService(), LearningService);

    constructor(props) {
        super(props);
        props.dispatchGetNextQuestion();
    }

    answer1Click() {
        if (this.state.check) return;

        this.setState({ answer1Clicked: false });
        this.setState({ answer2Clicked: true });
        this.setState({ answer3Clicked: true });

        this.props.currentQuestion.question.answer1.choosen = true;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers();
    }

    answer2Click() {
        if (this.state.check) return;

        this.setState({ answer2Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer3Clicked: true });

        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = true;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers();
    }

    answer3Click() {
        if (this.state.check) return;

        this.setState({ answer3Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: true });

        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = true;
        this.checkAnswers();
    }

    checkAnswers() {
        this.setState({ check: !this.state.check });
        if (!this.state.check) {
            var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.currentQuestion.question);
            this.setState({ lastAnswerRight: isright });
//console.log(isright);
            // var answeredRight = this.state.answer1Clicked == q.answer1.isRight && this.state.answer2Clicked == q.answer2.isRight && this.state.answer3Clicked == q.answer3.isRight;
            this.props.dispatchUpdateQuestion({ questionid: this.props.currentQuestion.questionId, answeredRight: isright });
        } else {
            this.props.dispatchGetNextQuestion();
            this.setState({ answer3Clicked: true });
            this.setState({ answer1Clicked: true });
            this.setState({ answer2Clicked: true });
        }
    }


    toogleModal() {
        this.refs.popupInfo.openModal();
    }

    closeModal() {
        this.refs.popupInfo.closeModal();
    }

    render() {
        if (!this.props.currentQuestion) {
            this.props.dispatchGetNextQuestion();
            return <FinishedPopup ref={'popupInfo'} show={this.props.noMoreQuestions} onPress={() => this.props.dispatchGoBack()} />;
        }

        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const background1 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer1.isRight ? '#23B800' : '#B21515' : answer1Clicked ? 'white' : 'white';
        const background2 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer2.isRight ? '#23B800' : '#B21515' : answer2Clicked ? 'white' : 'white';
        const background3 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer3.isRight ? '#23B800' : '#B21515' : answer3Clicked ? 'white' : 'white';

        const colorAnswers = answer1Clicked && answer2Clicked && answer3Clicked ? '#003A65' : '#fff';

        const marginAnswer1 = answer1Clicked ? 0 : '-1.5em'
        const marginAnswer2 = answer2Clicked ? 0 : '-1.5em'
        const marginAnswer3 = answer3Clicked ? 0 : '-1.5em'

        let lineColor1;

        if (background1 == '#23B800' && !answer1Clicked || background2 == '#23B800' && !answer2Clicked || background3 == '#23B800' && !answer3Clicked)
            lineColor1 = '#23B800';
        else if (answer1Clicked && answer2Clicked && answer3Clicked)
            lineColor1 = '#00B7E5'
        else
            lineColor1 = '#B21515'

        const answer1Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer1.answer : '';
        const answer2Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer2.answer : '';
        const answer3Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer3.answer : '';

        const questionText = this.props.currentQuestion ? this.props.currentQuestion.question.question : ''; // +  this.props.currentQuestion  ? `\nAntwort Nummer ${this.props.currentQuestion.question.answer1.isRight ? '1' : this.props.currentQuestion.question.answer2.isRight ? '2' : '3'} ist korrekt` : '';
        const questionHeaderText = this.props.currentQuestion ? `${this.props.currentQuestion.moduleId.replace("_", ".")} Frage ${parseInt(this.props.currentQuestion.questionId.substr(4))}` : '';

        const { falseQuestions, questionCount, seenQuestions: rightQuestions } = this.la.calcCurrentLearningStatsForModule(this.props.currentQuestion.moduleId);
        const { name: subModuleName } = this.props.modules.modules[this.props.currentQuestion.sectionId].modules[this.props.currentQuestion.moduleId];

        const pdfSrc = ((this.props.currentQuestion || {}).pdfInfo || {}).url;
        const pdfPage = ((this.props.currentQuestion || {}).pdfInfo || {}).pageNumber;
        const scriptName = ((this.props.currentQuestion || {}).pdfInfo || {}).scriptName;

        return (
            <AppHeader>
                <InteractSection title="Übungsmodus">
                    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                        <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6, width: '90%' }}>
                            {this.props.currentQuestion.moduleId.replace('_', '.')} {subModuleName}
                        </h1>

                        <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%', marginBottom: 6 }}>
                            Frage {parseInt(this.props.currentQuestion.questionId.substr(4))} / {questionCount}
                        </h1>

                        <div align="left" style={{ marginLeft: '10%', marginBottom: -4, marginTop: '12%' }}>
                            <p style={{ textALign: 'left', color: '#fff', margin: 0 }}>
                                Statistik Aktuell
                        </p>
                        </div>

                        <p style={wrongAnswers}>
                            {falseQuestions} Antworten falsch
                    </p>

                        <p style={questionBackText}>
                            {rightQuestions} Antworten richtig
                    </p>

                        <div style={{ backgroundColor: '#663399', height: '30%', paddingTop: '0.5em', marginTop: '12.7%', bottom: 0, flex: "1" }}>
                            <p style={{ textAlign: "left", color: '#fff', marginTop: 0, marginLeft: '0.5em' }}>
                                Aktionen
                        </p>

                            <div align="right" style={{ marginRight: '11%' }}>
                                {pdfSrc && <Link to={`/pdf?url=${btoa(pdfSrc)}&page=${pdfPage}&pdfname=${encodeURI(scriptName)}`}>
                                    <ImageButton
                                        mouseOver={() => { this.setState({ mouseOverPdf: true }) }}
                                        mouseLeave={() => { this.setState({ mouseOverPdf: false }) }}
                                        mouseOverBtn={this.state.mouseOverPdf}
                                        pdfButton={true}
                                        buttonText="PDF öffnen"
                                        image={iconPdfRed} />
                                </Link>}

                                <ImageLineButton
                                    mouseOver={() => { this.setState({ mouseOverWrong: true }) }}
                                    mouseLeave={() => { this.setState({ mouseOverWrong: false }) }}
                                    mouseOverState={this.state.mouseOverWrong}
                                    buttonText="Falsche Fragen üben"
                                    image={iconWrong}
                                    onPress={() => {
                                        if (falseQuestions == 0)
                                            this.toogleModal();
                                        else
                                            this.props.dispatchLearnFalseQuestions(this.props.currentQuestion.moduleId);
                                        this.props.dispatchGetNextQuestion();
                                    }} />
                            </div>
                        </div>
                    </div>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <DisplaySection title={questionHeaderText}>
                    <div style={{ marginLeft: '1.5em', marginRight: '1.5em', height: '100%' }}>

                        <div style={questionTextStyle}>
                            <p >
                                {questionText}
                            </p>
                        </div>

                        <div style={{
                            width: '100%',
                            height: '0.2em',
                            backgroundColor: lineColor1,
                        }} />

                        <h1 style={titleAnswer}>Antworten</h1>

                        <Answer
                            check={this.state.check}
                            text={answer1Text}
                            backgroundColor={background1}
                            colorAnswer={colorAnswers}
                            answerClicked={answer1Clicked}
                            marginAnswer={marginAnswer1}
                            onClick={this.answer1Click.bind(this)} />

                        <Answer
                            check={this.state.check}
                            text={answer2Text}
                            backgroundColor={background2}
                            colorAnswer={colorAnswers}
                            answerClicked={answer2Clicked}
                            marginAnswer={marginAnswer2}
                            onClick={this.answer2Click.bind(this)} />

                        <Answer
                            check={this.state.check}
                            text={answer3Text}
                            backgroundColor={background3}
                            colorAnswer={colorAnswers}
                            answerClicked={answer3Clicked}
                            marginAnswer={marginAnswer3}
                            onClick={this.answer3Click.bind(this)} />

                        <QuestionFooter
                            onPressContinue={() => this.state.check ? this.checkAnswers() : {}}
                            onPressBack={() => this.props.dispatchGoBack()}
                            mouseOverBack={() => { this.setState({ mouseOverCancel: true }) }}
                            mouseLeaveBack={() => { this.setState({ mouseOverCancel: false }) }}
                            mouseOverWeiter={() => { this.setState({ mouseOverWeiter: true }) }}
                            mouseLeaveWeiter={() => { this.setState({ mouseOverWeiter: false }) }}
                            mouseBackState={this.state.mouseOverCancel}
                            mouseWeiterState={this.state.mouseOverWeiter} />
                    </div>
                </DisplaySection>
                <FinishedPopup ref={'popupInfo'} show={this.props.noMoreQuestions} onPress={() => this.props.dispatchGoBack()} />
            </AppHeader>
        );
    }
}

const questionLine = {
    width: '100%',
    height: '0.1em',
    backgroundColor: "#58ACD9",
}

const titleAnswer = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginBottom: '0.6em'
}

const questionTextStyle = {
    fontSize: '0.6em',
    width: '100%',
    color: '#003A65',
    fontWeight: 'bold',
    textAlign: "left",
    height: '8em',
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: '0.5em',
    fontWeight: 'bold',
    fontSize: '0.7em',
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '0.5em',
    marginBottom: '0.5em'
}

const wrongAnswers = {
    padding: '0.5em',
    fontWeight: 'bold',
    fontSize: '0.7em',
    color: '#fff',
    border: 'solid',
    borderWidth: '0.1em',
    borderColor: '#fff',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '0.5em',
    marginBottom: '0.5em'
}

// export default QuestionScene;
const mapDispatchToProps = {
    dispatchUpdateQuestion: updateCurrentQuestion,
    dispatchGetNextQuestion: getNextQuestionAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction,
    dispatchGoBack: goBack
};

const mapStateToProps = state => ({
    currentQuestion: state.learning.currentQuestion,
    noMoreQuestions: state.learning.noMoreQuestions,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScene);
