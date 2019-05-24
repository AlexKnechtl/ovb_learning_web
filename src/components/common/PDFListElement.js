import React from 'react';
import { Link } from 'react-router-dom'

const PdfListElement = ({ pdfSource, pdfName }) => {
    return (
        <div>
            <Link
                style={linkStyle}
                to={pdfSource}>
                <p style={pdfElementStyle}>
                    {pdfName}
                </p>
            </Link>
        </div>
    )
}

const linkStyle = {
    textDecoration: 'none'
}


const pdfElementStyle = {
    fontSize: '0.7em',
    color: '#fff',
    fontWeight: 'bold',
    maxWidth: '40ch',
    marginLeft: 18,
    marginRight: 18,
    textAlign: 'center',
    marginTop: '0.6em',
    marginBottom: '0.6em',
    padding: 8,
    backgroundColor: '#fff2'
}

export { PdfListElement };
