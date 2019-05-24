
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { Button, StatisticsCategories, InteractSection, AppHeader } from './common';
import Center from 'react-center'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
        const infoText = this.props.exam.percentageRight >= 0.6 ? 'Weiter so! :)' : 'Nächstes mal schaffst du es!';

        const percentageRight = this.props.exam.percentageRight * 100;

        let { selectedModule } = this.state;
        if (!selectedModule) selectedModule = Object.keys(this.props.exam.finishedStats)[0];

        const { falseQuestions, rightQuestions, percentageRight: currModPercentageRight, count } = this.props.exam.finishedStats[selectedModule];
        const { name: currModuleName } = this.props.modules.modules[selectedModule];

        return (
            <AppHeader>
                <InteractSection title="Statistiken">
                    <div >
                        <div align="left" style={{ marginLeft: '10%', marginBottom: -4, marginTop: '12%' }}>
                            <p style={{ textALign: 'left', color: '#fff', margin: 0 }}>
                                Statistik Aktuell
                        </p>
                        </div>
                        <p style={wrongAnswers}>
                            {falseQuestions} Antworten falsch
                        </p>

                        <p style={questionBackText}>
                            {rightQuestions} Antworten richtig
                        </p>
                    </div>
                </InteractSection>

                <div style={{ width: '0.25em', backgroundColor: '#663399' }} />

                <div style={displaySection}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '30vh', width: '100%', backgroundColor: '#003A65', position: 'relative' }}>
                        <div style={{ height: '20vh', width: '20vh', marginLeft: '2.5em' }}>
                            <CircularProgressbar
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `rgba(46, 239, 106, ${percentageRight.toFixed(0)})`,
                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',
                                    },
                                    // Customize the circle behind the path, i.e. the "total progress"
                                    trail: {
                                        // Trail color
                                        stroke: '#fff',
                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',
                                    },
                                    // Customize the text
                                    text: {
                                        // Text color
                                        fill: '#fff',
                                        // Text size
                                        fontSize: '18px',
                                    },
                                }}
                                value={percentageRight.toFixed(0)}
                                text={`${percentageRight.toFixed(0)}%`} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2.5em' }}>
                            <p style={{ marginBottom: '0.1em', fontSize: '1.7em' }}>
                                {bestandenp}
                            </p>
                            <p style={{ marginTop: '0.1em', fontSize: '1em' }}>
                                {infoText}
                            </p>
                        </div>
                        <button
                            onPress={() => this.props.onPressEnd()}
                            style={backButtonStyle}>
                            <Center>
                                <img
                                    src={require('../img/arrow.png')}
                                    style={backImgStyle}
                                    alt="User Icon" />
                                Zurück zu den Kategorien
                            </Center>
                        </button>
                    </div>
                    <StatisticsCategories modules={this.props.modules.modules} finishedStats={this.props.exam.finishedStats} onStatPress={(k) => this.setState({ selectedModule: k })} />
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
                </div>
            </AppHeader >
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

const backButtonStyle = {
    backgroundColor: "#663399",
    border: 'none',
    color: '#fff',
    fontSize: '0.7em',
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontWeight: 'bold',
    padding: '0.6em'
}

const backImgStyle = {
    maxHeight: '1.3em',
    maxWidth: '1.3em',
    marginRight: '0.4em',
    transform: "rotate(180deg)"
}

const displaySection = {
    width: '100%',
    height: '100%'
}

const mapDispatchToProps = {
    dispatchInitStatsForModule: getExamResultStatsForModuleAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatistics);