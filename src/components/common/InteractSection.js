//@ts-check

import React from 'react';

import { ImageButton, Options, CategoryButton, ProgressSection, DisplaySection } from './';
import icon from '../../img/logo_ovb_white.png'
import iconContinue from '../../img/ic_continue.png'
import iconBook from '../../img/ic_look_through.png'
import iconPdf from '../../img/ic_pdf.png'
import iconBereiche from '../../img/icon_bereiche.png'
// const { falseQuestions, questionCount, seenQuestions: rightQuestions, successRate, name } =
const InteractSection = ({title, openCategory, currentModuleInfo, children}) => {
    return (
        <div style={interactSection} >
            <img
                src={icon}
                style={iconStyle}
                alt="OVB-Logo" />

            <h1 style={titleStyle}>
                {title}
            </h1>

            <CategoryButton
                        buttonText="Kategorieansicht"
                        onPress={openCategory}
                        image={iconBereiche} />

                    <div align="right" style={{ marginRight: '11%' }}>
                        {children}
                    </div>

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

                    <p style={{ fontSize: 18 }}>{currentModuleInfo.falseQuestions} Fragen falsch beantwortet</p>
        </div>
    )
}
const statisticsText = {
    fontSize: 32,
    textAlign: "right",
    marginRight: '11%',
    marginBottom: 0
}

const questionBackText = {
    backgroundColor: '#fff',
    padding: 12,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#003A65',
    width: '75%',
    marginLeft: '10%',
    marginRight: '10%'
}

const interactSection = {
    backgroundColor: "#003A65",
    width: '21em',
    maxWidth: '30%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const titleStyle = {
    fontSize: '1em',
    marginBottom: '1.5em',
    fontWeight: 'bold',
    marginTop: '3%'
}

const iconStyle = {
    marginTop: '5vh',
    width: '17%'
}

export { InteractSection };
