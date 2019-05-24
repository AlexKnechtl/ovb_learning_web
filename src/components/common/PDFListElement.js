import React from 'react';
import { Link } from 'react-router-dom'

const PdfListElement = ({ pdfSource, pdfName /*mouseOver, mouseLeave, mouseState */ }) => {
    //onMouseOver={mouseOver}
    //onMouseLeave={mouseLeave}
    return (
        <div>
            <Link
                style={linkStyle}
                to={pdfSource}>
                <p style={{
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
                    backgroundColor: '#fff2' //mouseState ? '#fff2' : '#fff1'
                }}>
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

}

export { PdfListElement };
