//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { SubCategory, ImageButton, Options, CategoryButton, ProgressSection } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconWrongQuestions from '../img/ic_wrong_questions.png'
import imageCategory from '../img/bg_category.png'
import { SelectSubmoduleAction, setLearningModeAction, continueSectionLearningAction, LearningAlgorithm, QuestionService, LearningService } from '../coreFork';
import { connect } from 'react-redux';

class SubCategoryScene extends Component {

    mapModules() {
        var currMID = this.props.modules.currentModuleID;
        if (!currMID) return undefined;
        var currMods = this.props.modules.modules[currMID].modules;
        var la = new LearningAlgorithm(new QuestionService(), LearningService);
        return Object.keys(currMods).map(key => {
            var stats = la.calcCurrentLearningStatsForModule(key);
            return (<SubCategory key={key}
                onPress={() => this.props.dispatchSelectSubmodule(key, currMods[key].name)}
                titleText={`${key.replace('_', '.')} ${currMods[key].name}`}
                learningState={stats.seenQuestions / stats.questionCount}
                successRate={stats.successRate}
            />);
        });
    }

    render() {
        if(!this.props.modules.modules) return undefined;
        var currMID = this.props.modules.currentModuleID;
        const { falseQuestions, image, modules, name, questionCount, seenQuestions: rightQuestions, successRate }= this.props.modules.modules[currMID];


        return (
            <header style={appHeader}>
                <div style={{ height: '100vh', width: '69.5%' }}>
                    <h1 style={titleStyle}>{this.props.modules.modules[this.props.modules.currentModuleID].name}</h1>
                    <div style={{scrollBehavior: "smooth"}}>
                        {this.mapModules()}
                    </div>
                </div>
                <div style={{ width: '0.5%', backgroundColor: "#58ACD9" }} />

                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1em', fontWeight: 'bold', marginTop: '3%' }}>
                        {this.props.modules.modules[this.props.modules.currentModuleID].name}
                    </h1>

                    <CategoryButton
                        buttonText="Kategorieansicht"
                        image={iconContinue} />

                    <div align="right" style={{ marginRight: '11%' }}>
                        <ImageButton
                            link="/question"
                            buttonText="Übungsmodus"
                            image={iconContinue} />
                        <ImageButton
                            buttonText="Falsche Fragen üben"
                            image={iconWrongQuestions} />
                        <ImageButton
                            link="/questionView"
                            buttonText="Fragen durchblättern"
                            image={iconBook} />
                    </div>

                    <p style={statisticsText}>
                        Statistik Gesamt
                    </p>

                    <ProgressSection
                        progressColor="#58D980"
                        progressText="Fortschritt"
                        progress={rightQuestions/questionCount} />

                    <ProgressSection
                        progressColor="#58ACD9"
                        progressText="Erfolgschance"
                        progress={successRate} />

                    <p style={questionBackText}>
                        {rightQuestions} / {questionCount} Fragen richtig
                    </p>

                    <p style={{ fontSize: 18 }}>{falseQuestions} Fragen falsch beantwortet</p>
                </div>
                <Options />
            </header>
        );
    }
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
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
    marginRight: '10%'
}

// export default SubCategoryScene;
const mapDispatchToProps = {
    dispatchSelectSubmodule: SelectSubmoduleAction,
    dispatchSelectLearningMode: setLearningModeAction,
    dispatchContinueSectionLearning: continueSectionLearningAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScene);