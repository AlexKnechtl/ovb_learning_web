

import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooter, ImageLineButton } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconWrong from '../img/x_icon.png'
import iconPdfRed from '../img/pdf_red.png'
import { updateCurrentQuestion, getNextQuestionAction, MultipleChoiceQuestionInteractor, LearningAlgorithm, QuestionService, LearningService, learnFalseQuestionsFromModuleAction } from '../coreFork';
import { connect } from 'react-redux';

class QuestionScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        check: false,
        lastAnswerRight: undefined
    }
    la = new LearningAlgorithm(new QuestionService(), LearningService);
    constructor(props) {
        super(props);
        props.dispatchGetNextQuestion();
    }
    answer1Click() {
        if (this.state.check) return;
        console.log(this.state.answer1Clicked);
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
            var q = this.props.currentQuestion.question;
            var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.currentQuestion.question);
            this.setState({ lastAnswerRight: isright });
            console.log(isright);
            // var answeredRight = this.state.answer1Clicked == q.answer1.isRight && this.state.answer2Clicked == q.answer2.isRight && this.state.answer3Clicked == q.answer3.isRight;
            this.props.dispatchUpdateQuestion({ questionid: this.props.currentQuestion.questionId, answeredRight: isright });
        } else {
            this.props.dispatchGetNextQuestion();
            this.setState({ answer3Clicked: true });
            this.setState({ answer1Clicked: true });
            this.setState({ answer2Clicked: true });
        }
    }

    render() {
        if (!this.props.currentQuestion) {
            this.props.dispatchGetNextQuestion();
            return null;
        }
        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const background1 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer1.isRight ? '#23B800' : '#B21515' : answer1Clicked ? 'white' : 'white';
        const background2 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer2.isRight ? '#23B800' : '#B21515' : answer2Clicked ? 'white' : 'white';
        const background3 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer3.isRight ? '#23B800' : '#B21515' : answer3Clicked ? 'white' : 'white';

        const colorAnswers = answer1Clicked && answer2Clicked && answer3Clicked ? '#003A65' : '#fff';

        const marginAnswer1 = answer1Clicked ? '5%' : '0%'
        const marginAnswer2 = answer2Clicked ? '5%' : '0%'
        const marginAnswer3 = answer3Clicked ? '5%' : '0%'

        const answer1Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer1.answer : '';
        const answer2Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer2.answer : '';
        const answer3Text = this.props.currentQuestion ? this.props.currentQuestion.question.answer3.answer : '';

        const questionText = this.props.currentQuestion ? this.props.currentQuestion.question.question : ''; // +  this.props.currentQuestion  ? `\nAntwort Nummer ${this.props.currentQuestion.question.answer1.isRight ? '1' : this.props.currentQuestion.question.answer2.isRight ? '2' : '3'} ist korrekt` : '';
        const questionHeaderText = this.props.currentQuestion ? `${this.props.currentQuestion.moduleId.replace("_", "\.")} Frage ${parseInt(this.props.currentQuestion.questionId.substr(4))}` : '';

        const { falseQuestions, questionCount, seenQuestions: rightQuestions, successRate } = this.la.calcCurrentLearningStatsForModule(this.props.currentQuestion.moduleId);
        const { name: subModuleName } = this.props.modules.modules[this.props.currentQuestion.sectionId].modules[this.props.currentQuestion.moduleId];

        return (
            <header style={appHeader}>
                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1.3em', fontWeight: 'bold', marginTop: '3%' }}>
                        Übungsmodus
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        {this.props.currentQuestion.moduleId.replace('_', '.')} {subModuleName}
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%', marginTop: 6 }}>
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
                                image={iconWrong} onPress={() => {
                                    if (falseQuestions == 0)
                                        console.log("doNothing"); //TODO: implement modal or sth like that
                                    else
                                        this.props.dispatchLearnFalseQuestions(this.props.currentQuestion.moduleId);
                                }} />
                        </div>
                    </div>
                </div>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <div style={displaySection}>
                    <h1 style={titleStyle}>{questionHeaderText}</h1>
                    <p style={questionTextStyle}>
                        {questionText}
                    </p>
                    <div style={questionLine} />

                    <h1 style={titleAnswer}>Antworten</h1>

                    <button disabled={this.state.check}
                        onClick={this.answer1Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: colorAnswers,
                            backgroundColor: background1,
                            borderWidth: answer1Clicked ? 3 : 0,
                            minHeight: '12%',
                            outline: 'none',
                            textAlign: 'left',
                            width: answer1Clicked ? '90%' : '95%',
                            marginLeft: marginAnswer1,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 16, color: colorAnswers, margin: 12 }}>
                            {answer1Text}
                        </p>
                    </button>

                    <button disabled={this.state.check}
                        onClick={this.answer2Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: colorAnswers,
                            minHeight: '12%',
                            backgroundColor: background2,
                            borderWidth: answer2Clicked ? 3 : 0,
                            textAlign: 'left',
                            outline: 'none',
                            width: answer2Clicked ? '90%' : '95%',
                            marginLeft: marginAnswer2,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 16, color: colorAnswers, margin: 12 }}>
                            {answer2Text}
                        </p>
                    </button>

                    <button disabled={this.state.check}
                        onClick={this.answer3Click.bind(this)}
                        style={{
                            border: 'solid',
                            borderColor: colorAnswers,
                            backgroundColor: background3,
                            borderWidth: answer1Clicked ? 3 : 0,
                            minHeight: '12%',
                            textAlign: 'left',
                            outline: 'none',
                            width: answer3Clicked ? '90%' : '95%',
                            marginLeft: marginAnswer3,
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 16, color: colorAnswers, margin: 12 }}>
                            {answer3Text}
                        </p>
                    </button>
                </div>

                <QuestionFooter onPressContinue={() => this.state.check ? this.checkAnswers() : {}}
                    onPressBack={() => { }}
                    backDisabled={!this.state.check} />
            </header>
        );
    }
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row-reverse',
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
    width: '20em',
    maxWidth: '30%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const displaySection = {
    width: '100%',
    height: '100vh'
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

// export default QuestionScene;
const mapDispatchToProps = {
    dispatchUpdateQuestion: updateCurrentQuestion,
    dispatchGetNextQuestion: getNextQuestionAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction
};

const mapStateToProps = state => ({
    currentQuestion: state.learning.currentQuestion,
    noMoreQuestions: state.learning.noMoreQuestions,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScene);
