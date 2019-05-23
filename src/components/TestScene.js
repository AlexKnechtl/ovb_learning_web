//@ts-check

import React, { Component } from 'react';
import { QuestionFooter, InteractSection, DisplaySection, Answer, SurePopup } from './common';
// @ts-ignore
import './styles.css';

import { getNextExamQuestionAction, answerExamQuestionAction, finishExamAction, MultipleChoiceQuestionInteractor } from '../coreFork';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Prompt } from 'react-router-dom';
import AppHeader from './common/AppHeader';

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

    toogleModal() {
        this.refs.surePopup.openModal();
    }

    closeModal() {
        this.refs.surePopup.closeModal();
    }

    render() {
        const currentQuestion = this.props.exam.currentQuestion;
        if (this.props.exam.questions && this.props.exam.currentIndex >= this.props.exam.questions.length)
            this.props.dispatchFinishExam();
        if (!currentQuestion) return null;
        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const backgroundColor1 = !answer1Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor2 = !answer2Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';
        const backgroundColor3 = !answer3Clicked ? 'rgba(0, 183, 229, 1)' : '#fff';

        const textColor1 = answer1Clicked ? "#003A65" : "#fff";
        const textColor2 = answer2Clicked ? "#003A65" : "#fff";
        const textColor3 = answer3Clicked ? "#003A65" : "#fff";

        const questionHeaderText = this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", ".")} Frage ${this.props.exam.currentQuestion.questionId.substr(4)}` : '';
        const questionText = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.question : '';
        const answer1Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer1.answer : '';
        const answer2Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer2.answer : '';
        const answer3Text = this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer3.answer : '';
        const subModuleId = this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", ".")} ${this.props.modules.selectedSubmoduleName}` : '';
        const questionNumberText = this.props.exam.currentQuestion ? `Frage ${this.props.exam.currentIndex + 1} / ${this.props.exam.questions.length}` : '';
        const subModuleName = this.props.modules.modules[currentQuestion.sectionId].modules[currentQuestion.moduleId].name;
        return (
            <AppHeader>
                <Prompt
                    when={this.props.exam.currentIndex < this.props.exam.questions.length-1}
                    message={location =>
                        `Wollen sie wirklich den Testmodus beenden?`
                    }
                />
                <InteractSection title="Prüfungsmodus">

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                        {subModuleId + " " + subModuleName}
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%' }}>
                        {questionNumberText}
                    </h1>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <DisplaySection title={questionHeaderText}>
                    <div style={{ marginLeft: '1.5em', marginRight: '1.5em', height: '100%' }}>
                        <div style={questionTextStyle}>
                            <p >
                                {questionText}
                            </p>
                        </div>

                        <div style={questionLine} />

                        <h1 style={titleAnswer}>Antworten</h1>

                        <Answer
                            text={answer1Text}
                            backgroundColor={backgroundColor1}
                            colorAnswer={textColor1}
                            answerClicked={answer1Clicked}
                            onClick={this.answer1Click.bind(this)} />

                        <Answer
                            text={answer2Text}
                            backgroundColor={backgroundColor2}
                            colorAnswer={textColor2}
                            answerClicked={answer2Clicked}
                            onClick={this.answer2Click.bind(this)} />

                        <Answer
                            text={answer3Text}
                            backgroundColor={backgroundColor3}
                            colorAnswer={textColor3}
                            answerClicked={answer3Clicked}
                            onClick={this.answer3Click.bind(this)} />

                        <QuestionFooter
                            onPressContinue={() => this.state.check ? this.checkAnswers() : {}}
                            continueDisabled={!this.state.check}
                            onPressBack={() => this.toogleModal()}
                        />
                    </div>
                </DisplaySection>
                <SurePopup ref={'surePopup'} />
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

// export default TestScene;
const mapDispatchToProps = {
    dispatchGetNextQuestion: getNextExamQuestionAction,
    dispatchAnswerQuestion: answerExamQuestionAction,
    dispatchFinishExam: finishExamAction,
    dispatchNavigation: push
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScene);
