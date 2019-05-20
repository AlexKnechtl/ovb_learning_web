//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, Options, Modules, InteractSection, DisplaySection } from './common';
import './styles.css';
import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconPdf from '../img/ic_pdf.png'
import iconBereiche from '../img/icon_bereiche.png'

import { signOutAction, SetCurrentModuleAction, initExamAction, GotModulesAction } from '../coreFork';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class Home extends Component {
    state = {
        currentModule: null,
        testMode: false,
        mouseOver1: false,
        mouseOver2: false,
        mouseOver3: false,
        mouseOverCategory: false,
        categories: []
    };
    initialized = false;

    constructor(props) {
        super(props);
        console.log(this.state);
    }

    testButtonPress = () => {
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

    categoryPress = (sectionID) => {
        this.initialized = true;
        if (this.state.testMode == false) {
            this.setState({ currentModule: sectionID })
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
        if (Object.keys(this.props.modules).length == 0) return null;
        var currMid = this.state.currentModule ? this.state.currentModule : Object.keys(this.props.modules)[0]; 
        return (
            <header style={appHeader}>

                <InteractSection title={name}
                    openCategory={() => this.props.dispatchSelectCategory(this.state.currentModule)}
                    currentModuleInfo={this.props.modules[currMid]}
                    >
                    <ImageButton
                            buttonText={!this.state.testMode ? "Prüfung auswählen" : "Prüfungs starten"}
                            onPress={this.testButtonPress}
                            image={iconContinue} />
                        <ImageButton
                            buttonText="Lernunterlagen"
                            image={iconPdf} />
                        <ImageButton
                            buttonText="Übungsmodus"
                            image={iconBook} />
                    
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: "#94C231" }} />

                <DisplaySection title="Übungsbereiche" >
                        <Modules modules={this.props.modules} 
                                categoryPress={this.categoryPress} 
                                chosenCategories={this.state.categories} 
                                testMode={this.state.testMode}/>
                    </DisplaySection>
                <Options />
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
