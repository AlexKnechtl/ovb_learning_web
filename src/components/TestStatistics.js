//@ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { Button } from './common';

class TestStatistics extends Component {
    state = {
        icon: null,
    }

    navigateHome = () => {
        this.props.navigation.navigate('main');
    }

    render() {
        const bestandenp = this.props.exam.percentageRight >= 0.6 ? 'Bestanden!' : 'Nicht bestanden.';
        const infop = this.props.exam.percentageRight >= 0.6 ? 'Weiter so! :)' : 'Nächstes mal schaffst du es!';
        const percentageRight = this.props.exam.percentageRight * 100;
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
                <div/>
                <div style={{"borderColor": "black", "border": "solid", "borderWidth": "2px" }}>
                        {Object.keys(this.props.exam.finishedStats).map(key => {
                            var currModResult = this.props.exam.finishedStats[key];
                            var moduleName = this.props.modules.modules[key].name;
                            var imageUri = this.props.modules.modules[key].image;
                            return <div style={{borderWidth: "1px", margin: "3%", border: 'solid' }}>
                                <p>key={key} </p>
                                <p>titlep={moduleName} </p>
                                <p>questionsFalse={currModResult.falseQuestions}</p>
                                <p>questionsRight={currModResult.rightQuestions}</p>
                                <p>success={currModResult.percentageRight >= 0.6}</p>
                                <p>learningState={currModResult.percentageRight}</p>
                                <p>imageUri={imageUri}</p>
                                <Button onPress={() => this.props.dispatchInitStatsForModule(key)} buttonText="open viewDetails"/>
                            </div>;
                        })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    dispatchInitStatsForModule: getExamResultStatsForModuleAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatistics);