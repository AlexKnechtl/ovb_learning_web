//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { SubCategory, ImageButton, Options, CategoryButton, ProgressSection } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconWrongQuestions from '../img/ic_wrong_questions.png'
import iconBereiche from '../img/icon_bereiche.png'
import { SelectSubmoduleAction, setLearningModeAction, continueSectionLearningAction, LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, learnFalseQuestionsFromModuleAction } from '../coreFork';
import { connect } from 'react-redux';
import { FinishedPopup } from './common/FinishedPopup';
import Loading from './Loading';
import PageNotExists from './PageNotExists';

class SubCategoryScene extends Component {

    state = {
        currentSubmodule: null,
        mouseOver1: false,
        mouseOver2: false,
        mouseOver3: false
    }

    la = new LearningAlgorithm(new QuestionService(), LearningService);

    mapModules() {
        var currMID = this.props.match.params.catId;
        if (!currMID) return undefined;
        var currMods = this.props.modules.modules[currMID].modules;
        return Object.keys(currMods).map(key => {
            var stats = this.la.calcCurrentLearningStatsForModule(key);
            return (<SubCategory key={key} onMouseEnter={() => this.setState({ currentSubmodule: key })}
                onPress={() => this.setState({ currentSubmodule: key })}
                titleText={`${key.replace('_', '.')} ${currMods[key].name}`}
                learningState={stats.seenQuestions / stats.questionCount}
                successRate={stats.successRate}
            />);
        });
    }

    toogleModal() {
        this.refs.popupInfo.openModal();
    }

    closeModal() {
        this.refs.popupInfo.closeModal();
    }

    startLearning = () => {
        this.state.currentSubmodule ?
            this.props.dispatchContinueModuleLearning(this.state.currentSubmodule) :
            this.props.dispatchContinueSectionLearning(this.props.match.params.catId);
    }

    render() {
        // console.log(this.props.match.params.catId);
        
        if (!this.props.modules.modules) return;
        if (this.props.modules.modules.length ===0) return <Loading/>;
        console.log(this.props.modules.modules);
        var currMID = this.props.match.params.catId;
        
        if(!this.props.modules.modules.hasOwnProperty(currMID)) return <PageNotExists/>
        const { image, modules, name, ...rest } = this.props.modules.modules[currMID];
        const { falseQuestions, questionCount, seenQuestions: rightQuestions, successRate } = this.state.currentSubmodule ? this.la.calcCurrentLearningStatsForModule(this.state.currentSubmodule) : rest;
        return (
            <header style={appHeader}>

                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1em', fontWeight: 'bold', marginTop: '3%' }}>
                        {this.props.modules.modules[currMID].name}
                    </h1>

                    <CategoryButton
                        buttonText="Bereichsansicht"
                        image={iconBereiche} />

                    <div align="right" style={{ marginRight: '11%' }}>
                        <ImageButton
                            mouseOver={() => { this.setState({ mouseOver1: true }) }}
                            mouseLeave={() => { this.setState({ mouseOver1: false }) }}
                            mouseOverBtn={this.state.mouseOver1}
                            onPress={this.startLearning}
                            buttonText="Übungsmodus"
                            image={iconContinue} />
                        <ImageButton
                            mouseOver={() => { this.setState({ mouseOver2: true }) }}
                            mouseLeave={() => { this.setState({ mouseOver2: false }) }}
                            mouseOverBtn={this.state.mouseOver2}
                            onPress={() => {
                                if (this.state.currentSubmodule && falseQuestions == 0)
                                    this.toogleModal();
                                else
                                    this.props.dispatchLearnFalseQuestions(this.state.currentSubmodule);
                            }}
                            buttonText="Falsche Fragen üben"
                            image={iconWrongQuestions} />
                        <ImageButton
                            link={`/questionView/${this.state.currentSubmodule}`}
                            mouseOver={() => { this.setState({ mouseOver3: true }) }}
                            mouseLeave={() => { this.setState({ mouseOver3: false }) }}
                            mouseOverBtn={this.state.mouseOver3}
                            buttonText="Fragen durchblättern"
                            image={iconBook} />
                    </div>

                    <p style={statisticsText}>
                        Statistik Gesamt
                    </p>

                    <ProgressSection
                        progressColor="#58D980"
                        progressText="Fortschritt"
                        progress={rightQuestions / questionCount} />

                    <ProgressSection
                        progressColor="#58ACD9"
                        progressText="Erfolgschance"
                        progress={successRate} />

                    <p style={questionBackText}>
                        {rightQuestions} / {questionCount} Fragen richtig
                    </p>

                    <p style={{ fontSize: 18 }}>{falseQuestions} Fragen falsch beantwortet</p>
                </div>

                <div style={{ width: '0.25em', backgroundColor: "#58ACD9" }} />

                <div style={displaySection}>
                    <h1 style={titleStyle}>{this.props.modules.modules[currMID].name}</h1>
                    <div style={{ scrollBehavior: "smooth" }}>
                        {this.mapModules()}
                    </div>
                </div>
                <Options />
                <FinishedPopup ref={'popupInfo'} />
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

const titleStyle = {
    color: '#003A65',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.2em',
    margin: '1.5em'
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
    marginRight: '10%'
}

// export default SubCategoryScene;
const mapDispatchToProps = {
    dispatchSelectSubmodule: SelectSubmoduleAction,
    dispatchSelectLearningMode: setLearningModeAction,
    dispatchContinueSectionLearning: continueSectionLearningAction,
    dispatchContinueModuleLearning: continueModuleLearningAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScene);