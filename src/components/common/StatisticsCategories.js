//@ts-check

import React from 'react'
import { StatisticsCategory } from './StatisticsCategory';

export function StatisticsCategories({ modules, finishedStats, onStatPress}) {
  return (
    <div style={{
      display: "flex",
      flexFlow: "wrap",
      marginRight: "1.5em"
    }}>
    {Object.keys(finishedStats).map(key => {
                        var currModResult = finishedStats[key];
                        var moduleName = modules[key].name;
                        var imageUri = modules[key].image;
                        return <StatisticsCategory
                            onPress={()=>onStatPress(key)}
                            titleText={moduleName}
                            questionsRight={currModResult.rightQuestions}
                            questionsFalse={currModResult.falseQuestions}
                            learningState={currModResult.percentageRight}
                            imageUri={imageUri}
                            success={currModResult.percentageRight >= 0.6}
                            style={{flexBasis: "13em", flex: "1", minWidth: "13em", marginLeft: '1.5em', marginBottom: '1.5em' }}
                            key={key} >
                        </StatisticsCategory>;

                })}
      {Object.keys(finishedStats).map((v) => <div key={v} style={{ flexBasis: "13em", flex: "1", minWidth: "13em", marginLeft: '1.5em' }} />)}
    </div>
  )
}

