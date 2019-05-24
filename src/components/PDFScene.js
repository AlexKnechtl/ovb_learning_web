//@ts-check
import React, { Component } from 'react'
import { Document, Page } from "react-pdf";
import { LoadingPopup } from './common';

export default class PDFScene extends Component {

  constructor(props) {
    super(props);

    let params = new URLSearchParams(props.location.search);
    let pageNum = params.get('page') || 1;
    let url = atob(params.get('url'));

    this.state = { url, pageNumber: parseInt(pageNum), numPages: null };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.closeModal();
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  toogleModal() {
    this.refs.popupLoading.openModal();
  }

  closeModal() {
    this.refs.popupLoading.closeModal();
  }
  /*
    <p>
    Page {pageNumber} of {numPages}
  </p>
  <nav>
    <button onClick={this.goToPrevPage}>Prev</button>
    <button onClick={this.goToNextPage}>Next</button>
  </nav> */

  render() {
    const { pageNumber, numPages, url } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center', backgroundColor: '#003A65' }}>
        <div style={{ width: '100%', height: '3.5em', backgroundColor: '#032C4A', position: 'relative', textAlign: 'left' }}>
          <p style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 24
          }}>
            Skriptum über irgendwas
          </p>
          <p style={{ position: 'absolute', left: '50%', color: '#fff', fontSize: 18 }}>
            {pageNumber / numPages}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', textAlign: 'center' }}>
          <Document
            file={url}
            loading={() => this.toogleModal()}
            onLoadError={(error) => console.log(error)}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onSourceSuccess={() => console.log('Document received')}
          >
            <Page height={1000} pageNumber={pageNumber} />
          </Document>
        </div>
        <LoadingPopup ref={'popupLoading'} />
      </div>
    );
  }
}
