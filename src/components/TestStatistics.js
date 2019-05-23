//@ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from '../coreFork';
import { Button, StatisticsCategories } from './common';
import AppHeader from './common/AppHeader';

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
            <AppHeader>
            <div >
                <div style={{color: "#000"}}>
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
                <StatisticsCategories modules={this.props.modules.modules} finishedStats={this.props.exam.finishedStats}/>
            </div>
            </AppHeader>
        );
    }
}

// onPress={() => this.props.dispatchInitStatsForModule(key)} buttonText="open viewDetails" 

const mapDispatchToProps = {
    dispatchInitStatsForModule: getExamResultStatsForModuleAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatistics);