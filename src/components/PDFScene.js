//@ts-check
import React, { Component } from 'react'
import { Document, Page } from "react-pdf";
// import pdf from "../1.pdf";

// setOptions({workerSrc: '../pdf.worker.js', });
// pdfjs.GlobalWorkerOptions.workerSrc = '../pdf.worker.js';
export default class PDFScene extends Component {

    constructor(props){
      super(props);
      
      let params = new URLSearchParams(props.location.search);
      let pageNum = params.get('page')||1;
      let url = atob(params.get('url'));
      console.log(url)
      this.state={url, pageNumber: parseInt(pageNum), numPages: null};
    }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages, url } = this.state;
    
    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file={url}
            // file="https://firebasestorage.googleapis.com/v0/b/wko-lernplattform.appspot.com/o/courses%2Fpdfs%2FVersicherungsagent%2F3.%20Sachversicherung%20Juni%202018.pdf?alt=media&token=ea039961-f804-4a97-8652-1d04fd0f517f"
            // file="https://schueler.bulme.at/~fabio.moretti/SeekINnovation/2ad%20adfas%20awef%20awef%20waef.pdf"
            onLoadError={(error)=> console.log(error)}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onSourceSuccess={()=>console.log('Document received')}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
