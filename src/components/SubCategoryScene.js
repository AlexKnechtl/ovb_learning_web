//@ts-check
import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, Options, CategoryButton, FinishedPopup, InteractSection, DisplaySection, Statistics } from './common';
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconWrongQuestions from '../img/ic_wrong_questions.png'
import iconBereiche from '../img/icon_bereiche.png'
import { SelectSubmoduleAction, setLearningModeAction, continueSectionLearningAction, LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, learnFalseQuestionsFromModuleAction, signOutAction } from '../coreFork';
import { connect } from 'react-redux';
import Loading from './Loading';
import PageNotExists from './PageNotExists';
import { Link } from "react-router-dom";
import SubModules from './common/SubModules';
import AppHeader from './common/AppHeader';

class SubCategoryScene extends Component {

    state = {
        currentSubmodule: null
    }

    la = new LearningAlgorithm(new QuestionService(), LearningService);

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
        if(!this.state.currentSubmodule) this.setState({currentSubmodule: Object.keys(modules)[0]})
        const { falseQuestions, questionCount, seenQuestions, successRate } = this.state.currentSubmodule ? this.la.calcCurrentLearningStatsForModule(this.state.currentSubmodule) : rest;
        return (
            <AppHeader>

                <InteractSection title={this.props.modules.modules[currMID].name}>
                    <div align="right" style={{ margin: '0 1em 0 3em', alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
                        <Link to="/">
                            <CategoryButton
                                buttonText="Bereichsansicht"
                                onPress={() => { }}
                                image={iconBereiche} />
                        </Link>

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
                    </div>
                    <Statistics currentModuleInfo={{ seenQuestions, questionCount, successRate, falseQuestions }} />
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: "#58ACD9" }} />

                <DisplaySection title={this.props.modules.modules[currMID].name}>
                    <SubModules onCatPress={(k) => this.setState({ currentSubmodule: k })}
                        currMID={this.props.match.params.catId}
                        la={this.la}
                        modules={this.props.modules.modules[currMID].modules}
                    />
                </DisplaySection>

                <footer style={{position: "fixed", bottom:"0", left: "0"}}>
                    <Options 
                        onPressDatenschutz={() => window.open("https://www.seekinnovation.at/ovb-datenschutz")}
                        onPressImpressum={() => window.open("https://www.seekinnovation.at")}
                        onPressLogout={() => this.props.dispatchLogOut()}
                        />
                </footer>
                <FinishedPopup ref={'popupInfo'} />
            </AppHeader>
        );
    }
}

// export default SubCategoryScene;
const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
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