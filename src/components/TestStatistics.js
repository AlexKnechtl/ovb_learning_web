//@ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { Button, StatisticsCategories, InteractSection, AppHeader, DisplaySection  } from './common';

class TestStatistics extends Component {
    state = {
        icon: null,
        selectedModule: null
    }

    navigateHome = () => {
        this.props.navigation.navigate('main');
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

    render() {
        const bestandenp = this.props.exam.percentageRight >= 0.6 ? 'Bestanden!' : 'Nicht bestanden.';
        const infop = this.props.exam.percentageRight >= 0.6 ? 'Weiter so! :)' : 'Nächstes mal schaffst du es!';
        const percentageRight = this.props.exam.percentageRight * 100;
        let {selectedModule} = this.state;
        if(!selectedModule) selectedModule = Object.keys(this.props.exam.finishedStats)[0];
        const {falseQuestions, rightQuestions, percentageRight: currModPercentageRight, count} = this.props.exam.finishedStats[selectedModule];
        const {name: currModuleName} = this.props.modules.modules[selectedModule];
        return (
            <AppHeader>
                <InteractSection title="Statistiken">
                    <div >
                        <p style={wrongAnswers}>
                            {falseQuestions} Antworten falsch
                        </p>

                        <p style={questionBackText}>
                            {rightQuestions} Antworten richtig
                        </p>
                    </div>
                </InteractSection>
                
                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <DisplaySection title={bestandenp}>
                    <StatisticsCategories modules={this.props.modules.modules} finishedStats={this.props.exam.finishedStats} onStatPress={(k)=>this.setState({selectedModule: k})}/>
                    <div style={{ color: "#000" }}>
                        <div >
                            <p >
                                {percentageRight.toFixed(0)}%
                            </p>

                            <p style={questionBackText}>
                                {this.props.exam.falseQuestions} Antworten richtig
                            </p>
                        </div>
                        <div >
                            <Button onPress={() => this.navigateHome()} buttonText="Weiter Lernen" />
                        </div>
                    </div>
                </DisplaySection>
            </AppHeader>
        );
    }
}

const wrongAnswers = {
    padding: '0.5em',
    fontWeight: 'bold',
    fontSize: '0.7em',
    color: '#fff',
    border: 'solid',
    borderWidth: '0.1em',
    borderColor: '#fff',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '0.5em',
    marginBottom: '0.5em'
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: '0.5em',
    fontWeight: 'bold',
    fontSize: '0.7em',
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '0.5em',
    marginBottom: '0.5em'
}

const mapDispatchToProps = {
    dispatchInitStatsForModule: getExamResultStatsForModuleAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatistics);