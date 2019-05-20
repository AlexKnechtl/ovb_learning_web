//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, QuestionFooterView, ImageLineButton } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconWrong from '../img/x_icon.png'
import iconPdfRed from '../img/pdf_red.png'
import { QuestionService, LearningAlgorithm, LearningService } from '../coreFork';
import { connect } from 'react-redux';
import Loading from './Loading';
import PageNotExists from './PageNotExists';

class QuestionViewScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        currentQuestion: undefined,
        questions: [],
        currentIndex: 0,
        currMID: undefined
    }
    la = new LearningAlgorithm(new QuestionService(), LearningService);
    pageNotExists = false;
    constructor(props){
        super(props);
        var currMID = props.match.params.subCatId;
        this.setState({currMID})
        if(!new QuestionService().questionStore.questionPool.moduleIds.hasOwnProperty(currMID)){
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
        if(!(this.props.modules||{}).modules) return;
        if (this.props.modules.modules.length ===0) return <Loading/>;
        console.log(this.props.modules.modules);
        if(this.pageNotExists) return <PageNotExists/>
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

        const fontWeightStyle = answer1Clicked ? "normal" : "bold";
        const fontWeightStyle2 = answer2Clicked ? "normal" : "bold";
        const fontWeightStyle3 = answer3Clicked ? "normal" : "bold";

        const marginAnswer1 = answer1Clicked ? 20 : 0;
        const marginAnswer2 = answer2Clicked ? 20 : 0;
        const marginAnswer3 = answer3Clicked ? 20 : 0;

        var question = currQuestion.question.question;

        var a1 = currQuestion.question.answer1.answer;
        var a2 = currQuestion.question.answer2.answer;
        var a3 = currQuestion.question.answer3.answer;

        var canGetNextQuestion = this.state.questions.length > this.state.currentIndex + 1;
        var cangetPrevQuestion = this.state.currentIndex > 0;
        const pdfSrc = ((currQuestion||{}).pdfInfo||{}).url;
        const pdfPage = ((currQuestion||{}).pdfInfo||{}).pageNumber;
        const questionHeaderText = `${currQuestion.moduleId.replace("_", "\.")} Frage ${parseInt(currQuestion.questionId.substr(4))}`;
        const  { falseQuestions, 
            questionCount, 
            seenQuestions: rightQuestions,
             successRate } = this.la.calcCurrentLearningStatsForModule(currQuestion.moduleId);
        const { name: subModuleName } = this.props.modules.modules[currQuestion.sectionId].modules[currQuestion.moduleId];
        return (
            <header style={appHeader}>
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
                            borderWidth: 2,
                            minHeight: '12%',
                            outline: 'none',
                            textAlign: 'left',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor1, margin: 12 }}>{a1}</p>
                    </div>

                    <div
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            minHeight: '12%',
                            backgroundColor: backgroundColor2,
                            borderWidth: 2,
                            textAlign: 'left',
                            outline: 'none',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor2, margin: 12 }}>{a2}</p>
                    </div>

                    <div
                        style={{
                            border: 'solid',
                            borderColor: '#003A65',
                            backgroundColor: backgroundColor3,
                            borderWidth: 2,
                            minHeight: '12%',
                            textAlign: 'left',
                            width: '90%',
                            outline: 'none',
                            marginLeft: '5%',
                            marginRight: '5%',
                            marginBottom: 16
                        }}>
                        <p style={{ fontSize: 14, color: textColor3, margin: 12 }}>{a3}</p>
                    </div>
                </div>

                <div style={{ width: '0.5%', backgroundColor: '#663399' }} />

                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1.3em', fontWeight: 'bold', marginTop: '3%' }}>
                        Übungsmodus
                    </h1>

                    <h1 style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '3%', marginBottom: 6 }}>
                    {currQuestion.moduleId.replace('_', '.')} {subModuleName}
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
                                image={iconWrong} />
                        </div>
                    </div>
                </div>
                <QuestionFooterView forwardClick={()=> this.GetNextQuestion()} backwardClick={()=>this.GetPrevQuestion()} backButtonDisabled={!cangetPrevQuestion} forwardButtonDisabled={!canGetNextQuestion}/>
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

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionViewScene);