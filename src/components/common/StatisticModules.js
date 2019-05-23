//@ts-check

import React from 'react'
import { StatisticsCategory } from '.';

export function StatisticModules({ modules, categoryPress, chosenCategories, testMode }) {
    return (
        <div style={{
            display: "flex",
            flexFlow: "wrap",
            marginRight: "1.5em"
        }}>
            {Object.keys(modules).map((sectionID) =>

                <StatisticsCategory
                    key={sectionID}
                    onPress={() => categoryPress(sectionID)}
                    imageUri={modules[sectionID].image || ""}
                    titleText={modules[sectionID].name || ""}
                    questionsRight={modules[sectionID].seenQuestions || 0}
                    questionsFalse={modules[sectionID].falseQuestions || 0}
                    learningState={(modules[sectionID].seenQuestions || 0) / (modules[sectionID].questionCount || 1)}
                    successRate={modules[sectionID].successRate || 0}
                    style={{ flexBasis: "13em", flex: "1", minWidth: "13em", marginLeft: '1.5em', marginBottom: '1.5em' }}
                />
            )}
            {Object.keys(modules).map((v) => <div style={{ flexBasis: "13em", flex: "1", minWidth: "13em", marginLeft: '1.5em' }} />)}
        </div>
    )
}

