
import React, { Component } from 'react';
import { } from 'react'
import { SubCategory, ImageButton, Options, CategoryButton, ProgressSection, FinishedPopup, InteractSection, DisplaySection } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconWrongQuestions from '../img/ic_wrong_questions.png'
import iconBereiche from '../img/icon_bereiche.png'
import { SelectSubmoduleAction, setLearningModeAction, continueSectionLearningAction, LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, learnFalseQuestionsFromModuleAction } from '../coreFork';
import { connect } from 'react-redux';
import Loading from './Loading';
import PageNotExists from './PageNotExists';
import { Link } from "react-router-dom";
import SubModules from './common/SubModules';

class SubCategoryScene extends Component {

    state = {
        currentSubmodule: null
    }

    la = new LearningAlgorithm(new QuestionService(), LearningService);

    // mapModules() {
    //     var currMID = this.props.match.params.catId;
    //     if (!currMID) return undefined;
    //     var currMods = this.props.modules.modules[currMID].modules;
    //     return Object.keys(currMods).map(key => {
    //         var stats = this.la.calcCurrentLearningStatsForModule(key);
    //         return (<SubCategory key={key}
    //             // onMouseEnter={() => this.setState({ currentSubmodule: key })}
    //             onPress={() => this.setState({ currentSubmodule: key })}
    //             titleText={`${key.replace('_', '.')} ${currMods[key].name}`}
    //             learningState={stats.seenQuestions / stats.questionCount}
    //             successRate={stats.successRate}
    //         />);
    //     });
    // }

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
        if (this.props.modules.modules.length === 0) return <Loading />;
        console.log(this.props.modules.modules);
        var currMID = this.props.match.params.catId;

        if (!this.props.modules.modules.hasOwnProperty(currMID)) return <PageNotExists />
        const { image, modules, name, ...rest } = this.props.modules.modules[currMID];
        const { falseQuestions, questionCount, seenQuestions, successRate } = this.state.currentSubmodule ? this.la.calcCurrentLearningStatsForModule(this.state.currentSubmodule) : rest;
        return (
            <header style={appHeader}>

                <InteractSection title={this.props.modules.modules[currMID].name}
                    openCategory={() => this.props.dispatchSelectCategory(this.state.currentModule)}
                    currentModuleInfo={{seenQuestions, questionCount,successRate,falseQuestions}}>
                        <ImageButton
                            onPress={this.startLearning}
                            buttonText="Übungsmodus"
                            image={iconContinue} />
                        <ImageButton
                            onPress={() => {
                                if (this.state.currentSubmodule && falseQuestions == 0)
                                    this.toogleModal();
                                else
                                    this.props.dispatchLearnFalseQuestions(this.state.currentSubmodule);
                            }}
                            buttonText="Falsche Fragen üben"
                            image={iconWrongQuestions} />
                        <Link style={{ textDecoration: "none" }} to={`/questionView/${this.state.currentSubmodule}`}>
                            <ImageButton
                                buttonText="Fragen durchblättern"
                                image={iconBook} />
                        </Link>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: "#58ACD9" }} />

                <DisplaySection title={this.props.modules.modules[currMID].name}>
                    <SubModules onCatPress={(k) => this.setState({ currentSubmodule: k })}
                        currMID={this.props.match.params.catId}
                        la={this.la}
                        modules={this.props.modules.modules[currMID].modules}
                    />
                </DisplaySection>

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
    width: '21em',
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