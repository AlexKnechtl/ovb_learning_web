//@ts-check

import React from 'react'
import { SubCategory } from '.';

export default function SubModules({currMID, modules, la, onCatPress}) {
  return (
    <div style={{
        display: "flex",
        flexFlow: "wrap",
        marginRight: "1.5em"}}>
        {Object.keys(modules).map(key => {
            var stats = la.calcCurrentLearningStatsForModule(key);
            return (<SubCategory key={key}
                // onMouseEnter={() => this.setState({ currentSubmodule: key })}
                onPress={()=> onCatPress(key)}
                titleText={`${key.replace('_', '.')} ${modules[key].name}`}
                learningState={stats.seenQuestions / stats.questionCount}
                successRate={stats.successRate}
                style={{marginLeft: '1.5em',
                    marginBottom: '1.5em',
                    flex: "1",
                    flexBasis: "13em"}}
            />);
        })}
        {Object.keys(modules).map((v) => <div style={{marginLeft: '1.5em', marginBottom: '1.5em', flex: "1", flexBasis: "13em"}}/>)}
    </div>
  )
}
