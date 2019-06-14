//@ts-check
import React from 'react'
import { ProgressSection } from '.';

export function Statistics({ currentModuleInfo }) {
    return (
        <div>
            <div style={statisticsText}>
                <p style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 8 }}>
                    Statistik 
                </p>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                    Allgemein
                </p>
            </div>

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

            <p style={{ fontSize: '0.5em', marginTop: 8 }}>{currentModuleInfo.falseQuestions} Fragen falsch beantwortet</p>
        </div>
    )
}

const statisticsText = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1em',
    textAlign: "left",
    marginLeft: '10%',
    marginTop: '1em',
    marginBottom: 0
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: '0.8em',
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%'
}
