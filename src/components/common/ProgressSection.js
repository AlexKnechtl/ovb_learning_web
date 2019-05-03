//@ts-check

import React from 'react';
import Progress from 'react-progressbar';
import '../styles.css';

const ProgressSection = ({progressText, progressColor, progress}) => {
    return (
        <div>
            <p style={fortschrittText}>
                {progressText}
            </p>
            <div style={row}>
                <Progress style={progressBar} color={progressColor} height={22} completed={progress*100} />
                <p style={percentageText}>
                    {(progress*100).toFixed(0)}%
                </p>
            </div>
        </div>

    )
}

const fortschrittText = {
    fontSize: 24,
    textAlign: "left",
    marginLeft: '11%',
    marginBottom: 5,
    marginTop: 16,
    fontWeight: "bold"
}

const progressBar = {
    backgroundColor: "#fff3",
    marginTop: 0,
    marginBottom: 0,
    width: '80%',
    height: 22
}

const percentageText = {
    fontSize: 22,
    textAlign: "right",
    marginLeft: 5,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "bold"
}

const row = {
    display: "flex",
    flexDirection: "row",
    marginLeft: '10%',
    marginRight: '10%'
}

export { ProgressSection };
