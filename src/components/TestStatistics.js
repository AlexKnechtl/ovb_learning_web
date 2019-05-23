//@ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { StatisticModules, InteractSection, DisplaySection } from './common';
import AppHeader from './common/AppHeader';
import { Button, StatisticsCategories } from './common';

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
                    <div align="right" style={{ margin: '0 1em 0 3em', alignItems: "flex-end", display: "flex", flexDirection: "column" }}>

                        <p style={wrongAnswers}>
                            {this.props.exam.currentModule.falseQuestions} Antworten falsch
                        </p>

                        <p style={questionBackText}>
                            {this.props.exam.falseQuestions} Antworten richtig
                        </p>
                    </div>
                </InteractSection>

                <DisplaySection title={this.props.exam.title}>
                    <StatisticsCategories modules={this.props.modules.modules} finishedStats={this.props.exam.finishedStats}/>
                </DisplaySection>

                })}
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

// onPress={() => this.props.dispatchInitStatsForModule(key)} buttonText="open viewDetails" 
const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    // flexDirection: 'row-reverse',
    fontFamily: 'Roboto Slab',
    fontSize: `calc(10px + 2vmin)`,
    color: 'white'
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