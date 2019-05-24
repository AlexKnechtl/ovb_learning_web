//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooterView, ImageLineButton, DisplaySection, InteractSection, Answer, AppHeader } from './common';
import './styles.css';

import iconWrong from '../img/x_icon.png'
import iconPdfRed from '../img/pdf_red.png'
import { QuestionService, LearningAlgorithm, LearningService } from '../coreFork';
import { connect } from 'react-redux';
import Loading from './Loading';
import PageNotExists from './PageNotExists';
import { Link } from "react-router-dom";
import { goBack } from 'connected-react-router';

class QuestionViewScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        currentQuestion: undefined,
        questions: [],
        currentIndex: 0,
        mouseOverPdf: false,
        mouseOverWrong: false,
        currMID: undefined
    }
    la = new LearningAlgorithm(new QuestionService(), LearningService);
    pageNotExists = false;
    constructor(props) {
        super(props);
        var currMID = props.match.params.subCatId;
        this.setState({ currMID })
        if (!new QuestionService().questionStore.questionPool.moduleIds.hasOwnProperty(currMID)) {
            this.pageNotExists = true;
            return;
        }
        this.state.questions = new QuestionService().questionStore.getQuestionInfosByModuleId(currMID);
        this.state.currentIndex = 0;
        this.state.currentQuestion = this.state.questions[0];
    }

    GetPrevQuestion() {
        this.setState({ currentQuestion: this.state.questions[this.state.currentIndex - 1], currentIndex: this.state.currentIndex - 1 });
    }

    GetNextQuestion() {
        this.setState({ currentQuestion: this.state.questions[this.state.currentIndex + 1], currentIndex: this.state.currentIndex + 1 });
    }


    render() {
        if (!(this.props.modules || {}).modules) return;
        if (this.props.modules.modules.length === 0) return <Loading />;
        console.log(this.props.modules.modules);
        if (this.pageNotExists) return <PageNotExists />

        const currQuestion = this.state.currentQuestion;

        const answer1Clicked = !currQuestion.question.answer1.isRight;
        const answer2Clicked = !currQuestion.question.answer2.isRight;
        const answer3Clicked = !currQuestion.question.answer3.isRight;

        const backgroundColor1 = answer1Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';
        const backgroundColor2 = answer2Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';
        const backgroundColor3 = answer3Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';

        const textColor1 = answer1Clicked ? "#003A65" : "#fff";
        const textColor2 = answer2Clicked ? "#003A65" : "#fff";
        const textColor3 = answer3Clicked ? "#003A65" : "#fff";

        var question = currQuestion.question.question;

        var a1 = currQuestion.question.answer1.answer;
        var a2 = currQuestion.question.answer2.answer;
        var a3 = currQuestion.question.answer3.answer;

        var canGetNextQuestion = this.state.questions.length > this.state.currentIndex + 1;
        var cangetPrevQuestion = this.state.currentIndex > 0;
        const pdfSrc = ((currQuestion || {}).pdfInfo || {}).url;
        const pdfPage = ((currQuestion || {}).pdfInfo || {}).pageNumber;
        const scriptName = ((currQuestion || {}).pdfInfo || {}).scriptName;
        const questionHeaderText = `${currQuestion.moduleId.replace("_", "\.")} Frage ${parseInt(currQuestion.questionId.substr(4))}`;
        const { falseQuestions,
            questionCount,
            seenQuestions: rightQuestions,
            successRate } = this.la.calcCurrentLearningStatsForModule(currQuestion.moduleId);
        const { name: subModuleName } = this.props.modules.modules[currQuestion.sectionId].modules[currQuestion.moduleId];

        return (
            <AppHeader>

                <InteractSection title="Übungsmodus">
                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6, width: '18em', textAlign: 'center', margin: '0 auto' }}>
                        {currQuestion.moduleId.replace('_', '.')} {subModuleName}
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', textAlign: 'right', marginRight: '11%', marginTop: 6 }}>
                        Frage {parseInt(currQuestion.questionId.substr(4))} / {questionCount}
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
                            {pdfSrc && <Link to={`/pdf?url=${btoa(pdfSrc)}&page=${pdfPage}&pdfname=${encodeURI(scriptName)}`}>
                                <ImageButton
                                    mouseOver={() => { this.setState({ mouseOverPdf: true }) }}
                                    mouseLeave={() => { this.setState({ mouseOverPdf: false }) }}
                                    mouseOverBtn={this.state.mouseOverPdf}
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
                                }}
                            />
                        </div>
                    </div>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <DisplaySection title={questionHeaderText}>
                    <div style={{ marginLeft: '1.5em', marginRight: '1.5em', height: '100%' }}>

                        <p style={questionText}>
                            {question}
                        </p>

                        <div style={questionLine} />

                        <h1 style={titleAnswer}>Antworten</h1>

                        <Answer
                            check={this.state.check}
                            text={a1}
                            backgroundColor={backgroundColor1}
                            colorAnswer={textColor1}
                            answerClicked={answer1Clicked} />

                        <Answer
                            check={this.state.check}
                            text={a2}
                            backgroundColor={backgroundColor2}
                            colorAnswer={textColor2}
                            answerClicked={answer2Clicked} />

                        <Answer
                            check={this.state.check}
                            text={a3}
                            backgroundColor={backgroundColor3}
                            colorAnswer={textColor3}
                            answerClicked={answer3Clicked} />

                        <QuestionFooterView
                            abbortClick={() => this.props.dispatchGoBack()}
                            forwardClick={() => this.GetNextQuestion()}
                            backwardClick={() => this.GetPrevQuestion()}
                            
                            backButtonDisabled={!cangetPrevQuestion}
                            forwardButtonDisabled={!canGetNextQuestion} />
                    </div>
                </DisplaySection>
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

const questionText = {
    fontSize: '0.6em',
    width: '100%',
    color: '#003A65',
    fontWeight: 'bold',
    textAlign: "left",
    height: '8em',
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
    dispatchGoBack: goBack
};

const mapStateToProps = state => ({
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionViewScene);