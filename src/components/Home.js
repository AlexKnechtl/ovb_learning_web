//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { Category, ImageButton, Options, CategoryButton, ProgressSection } from './common';
import icon from '../img/logo_ovb_white.png'
import './styles.css';

import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconPdf from '../img/ic_pdf.png'
import imageCategory from '../img/bg_category.png'
import { signOutAction, SetCurrentModuleAction, initExamAction, GotModulesAction } from '../coreFork';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class Home extends Component {
    state = {
        currentModule: null,
        testMode: false,
        // icon: icOptions,
        categories: []
    };
    initialized = false;
    constructor(props) {
        super(props);
        console.log(this.state);
    }
    testButtonPress = ()=> {
        this.initialized = true;
        if (this.state.testMode == false) {
            this.setState({
                testMode: !this.state.testMode,
                // icon: icBack TODO: implement
            });
        } else if (this.state.testMode == true) {
            // this.props.navigation.navigate('test');
            var mids = []
            Object.keys(this.state.categories).forEach(key => { if (this.state.categories[key].isPressed) mids.push(key); });
            console.log(mids);
            if (mids.length == 0)
                return;
            this.props.dispatchStartExam(mids);
        }
    }

    // optionsPress() {
    //     this.initialized = true;
    //     if (this.state.testMode == false) {
    //         //No Test Mode
    //         this.refs.popupCenter.showAddModal();
    //     } else if (this.state.testMode == true) {
    //         //Test Mode activated
    //         var cats = this.state.categories;
    //         Object.keys(cats).forEach(key => cats[key].isPressed = false);
    //         this.setState({
    //             categories: {
    //                 ...cats
    //             }
    //         });
    //         this.setState({
    //             testMode: !this.state.testMode,
    //             icon: icOptions
    //         });
    //     }
    // }

    categoryPress(sectionID) {
        this.initialized = true;
        if (this.state.testMode == false) {
            this.props.dispatchSelectCategory(sectionID);
        } else {
            var cat = this.state.categories[sectionID] || {};
            cat.isPressed = !cat || !cat.isPressed;
            this.setState({
                categories: {
                    ...this.state.categories, [sectionID]: cat
                }
            });
        }
    }

    render() {
        if(Object.keys(this.props.modules).length == 0) return null;
        var currMid = this.state.currentModule ? this.state.currentModule : Object.keys(this.props.modules)[0];
        const  { falseQuestions, questionCount, seenQuestions: rightQuestions, successRate, name } = this.props.modules[currMid]
        return (
            <header style={appHeader}>
                <div style={{ height: '100vh', width: '69.5%' }}>
                    <h1 style={titleStyle}>Übungsbereiche</h1>
                    {Object.keys(this.props.modules).map((sectionID) =>
                            <Category
                                key={sectionID}
                                onMouseEnter={()=>this.setState({currentModule: sectionID})}
                                // ref={(thisItem) => this[sectionID] = thisItem}
                                onPress={this.categoryPress.bind(this, sectionID)}
                                isPressed={(this.state.categories[sectionID] || {}).isPressed}
                                testMode={this.state.testMode}
                                imageUri={this.props.modules[sectionID].image||"" }
                                titleText={this.props.modules[sectionID].name||""}
                                questionsRight={this.props.modules[sectionID].seenQuestions||0}
                                questionsFalse={this.props.modules[sectionID].falseQuestions||0}
                                learningState={(this.props.modules[sectionID].seenQuestions||0) / (this.props.modules[sectionID].questionCount||1)}
                                successRate={this.props.modules[sectionID].successRate || 0}
                            />
                        )}
                </div>
                <div style={{ width: '0.5%', backgroundColor: "#94C231" }} />

                <div style={interactSection} >
                    <img src={icon} style={{ marginTop: '5vh', width: '17%' }} alt="OVB-Logo" />
                    <h1 style={{ fontSize: '1em', fontWeight: 'bold', marginTop: '3%' }}>
                        {name}
                    </h1>

                    <CategoryButton
                        buttonText="Kategorieansicht"
                        image={iconContinue} />

                    <div align="right" style={{ marginRight: '11%' }}>
                        <ImageButton
                            //link="/test"
                            buttonText={!this.state.testMode ? "Prüfung auswählen" : "Prüfungs starten"}
                            onPress={this.testButtonPress}
                            image={iconContinue} />
                        <ImageButton
                            buttonText="Lernunterlagen"
                            image={iconPdf} />
                        <ImageButton
                            buttonText="Übungsmodus"
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
const setCurrentModuleAction = (catId) => push(`/category/${catId}`);

const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
    dispatchSelectCategory: setCurrentModuleAction,
    dispatchStartExam: initExamAction,
    dispatchUpdateModules: GotModulesAction
};

const mapStateToProps = state => ({
    modules: state.modules.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;