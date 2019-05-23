//@ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { Button, StatisticsCategories, InteractSection, AppHeader  } from './common';

class TestStatistics extends Component {
    state = {
        icon: null,
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

        return (
            <AppHeader>
                <InteractSection title="Statistiken">
                    <div >
                        <p style={wrongAnswers}>
                            {this.props.exam.falseQuestions} Antworten falsch
                        </p>

                        <p style={questionBackText}>
                            {this.props.exam.rightQuestions} Antworten richtig
                        </p>
                    </div>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <div style={displaySection}>
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
                    <div />
                    <StatisticsCategories
                        modules={this.props.modules.modules}
                        finishedStats={this.props.exam.finishedStats} />
                </div>
            </AppHeader>
        );
    }
}

/*
return (
    <div >
        <div>
            <div >
                <p >
                    {percentageRight.toFixed(0)}%
                </p>
                <div>
                    <p >
                        {bestandenp}
                    </p>
                    <p >
                        {infop}
                    </p>
                </div>
            </div>
            <div >
                <Button onPress={() => this.navigateHome()} buttonText="Weiter Lernen" />
            </div>
        </div>
        <div />
        <div style={{ "borderColor": "black", "border": "solid", "borderWidth": "2px" }}>
            <StatisticModules
                modules={this.props.modules}
                categoryPress={this.categoryPress}
                chosenCategories={this.state.categories}
                testMode={this.state.testMode} />
            })}
        </div>
    </div>
);*/

const displaySection = {
    width: '100%',
    height: '100%'
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