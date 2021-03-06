//@ts-check
import React, { Component } from 'react';
import { } from 'react'
import { ImageButton, Options, Modules, InteractSection, DisplaySection, CategoryButton, Statistics, PDFPopup, AppHeader } from './common';
import './styles.css';
// Images
import iconContinue from '../img/ic_continue.png'
import iconBook from '../img/ic_look_through.png'
import iconPdf from '../img/ic_pdf.png'
import iconBereiche from '../img/icon_bereiche.png'
import backButton from '../img/arrow.png'

import { signOutAction, initExamAction, GotModulesAction, continueSectionLearningAction } from '../coreFork';
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
    }

    testButtonPress = () => {
        this.initialized = true;
        if (!this.state.testMode) {
            this.setState({
                testMode: !this.state.testMode,
            });
        } else {
            var mids = []
            Object.keys(this.state.categories).forEach(key => { if (this.state.categories[key].isPressed) mids.push(key); });

            if (mids.length === 0)
                return;
            this.props.dispatchStartExam(mids);
        }
    }

    categoryPress = (sectionID) => {
        this.initialized = true;
        if (!this.state.testMode) {
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

    categoryButtonPress = () => {
        if (!this.state.testMode)
            this.props.dispatchSelectCategory(this.state.currentModule)
        else
            this.setState({ testMode: !this.state.testMode });
    }

    toogleModal() {
        this.refs.popupPDF.openModal();
    }

    closeModal() {
        this.refs.popupPDF.closeModal();
    }

    render() {
        if (Object.keys(this.props.modules).length === 0) return null;
        if (!this.state.currentModule) this.setState({ currentModule: Object.keys(this.props.modules)[0] });
        var currMid = this.state.currentModule ? this.state.currentModule : Object.keys(this.props.modules)[0];
        return (
            <AppHeader>
                <InteractSection title={this.props.modules[currMid].name}>
                    <div align="right" style={{ margin: '0 1em 0 3em', alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
                        <CategoryButton
                            buttonText={this.state.testMode ? "Abbrechen" : "Kategorieansicht"}
                            testMode={this.state.testMode}
                            onPress={this.categoryButtonPress}
                            image={this.state.testMode ? backButton : iconBereiche} />
                        <ImageButton
                            buttonText={!this.state.testMode ? "Prüfung auswählen" : "Prüfungs starten"}
                            onPress={this.testButtonPress}
                            image={iconContinue} />
                        <ImageButton
                            buttonText="Lernunterlagen"
                            onPress={() => this.toogleModal()}
                            image={iconPdf} />
                        <ImageButton
                            buttonText="Übungsmodus"
                            onPress={() => this.props.dispatchContinueSectionLearning(this.state.currentModule)}
                            image={iconBook} />
                    </div>
                    <Statistics currentModuleInfo={this.props.modules[currMid]} />
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: "#94C231" }} />

                <DisplaySection title="Übungsbereiche" >
                    <Modules modules={this.props.modules}
                        categoryPress={this.categoryPress}
                        chosenCategories={this.state.categories}
                        testMode={this.state.testMode} />

                </DisplaySection>
                <footer style={{ position: "fixed", bottom: "0", left: "0" }}>
                    <Options
                        onPressDatenschutz={() => window.open("https://www.seekinnovation.at/ovb-datenschutz")}
                        onPressImpressum={() => window.open("https://www.seekinnovation.at")}
                        onPressLogout={() => this.props.dispatchLogOut()}
                        onPressAdmin={() => this.props.navigateAdmin()}
                        canAccessAdmin={this.props.auth.user.isAdmin}
                    />
                </footer>
                <PDFPopup ref={'popupPDF'} modules={(this.props.modules[this.state.currentModule]||{}).modules}/>
            </AppHeader>
        );
    }
}

const setCurrentModuleAction = (catId) => push(`/category/${catId}`);
const navigateAdmin = () => push(`/admin`);

const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
    dispatchSelectCategory: setCurrentModuleAction,
    dispatchContinueSectionLearning: continueSectionLearningAction,
    dispatchStartExam: initExamAction,
    dispatchUpdateModules: GotModulesAction,
    navigateAdmin
};

const mapStateToProps = state => ({
    modules: state.modules.modules,
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
