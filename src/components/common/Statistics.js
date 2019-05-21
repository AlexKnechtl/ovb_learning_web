//@ts-check
import React from 'react'
import { ProgressSection } from '.';

export function Statistics({ currentModuleInfo }) {
    return (
        <div>
            <p style={statisticsText}>
                Statistik Gesamt
            </p>

            <ProgressSection
                progressColor="#58D980"
                progressText="Fortschritt"
                progress={currentModuleInfo.seenQuestions / currentModuleInfo.questionCount} />

            <ProgressSection
                progressColor="#58ACD9"
                progressText="Erfolgschance"
                progress={currentModuleInfo.successRate} />

            <p style={questionBackText}>
                {currentModuleInfo.seenQuestions} / {currentModuleInfo.questionCount} Fragen richtig
            </p>

            <p style={{ fontSize: '0.5em' }}>{currentModuleInfo.falseQuestions} Fragen falsch beantwortet</p>
        </div>
    )
}

const statisticsText = {
    fontSize: '1em',
    textAlign: "right",
    marginRight: '11%',
    marginBottom: 0
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: 12,
    fontWeight: 'bold',
    fontSize: '0.8em',
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%'
}
