//@ts-check
import React, { Component } from 'react'
import { Document, Page } from "react-pdf";
import { LoadingPopup } from './common';

import arrow from '../img/arrow.png';
import arrowPage from '../img/page_icon.png';
import zoomIn from '../img/zoom_in_icon.png';
import zoomOut from '../img/zoom_out_icon.png';

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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '0em', transform: 'translateX(-50%)' }}>
            <img
              onClick={this.goToPrevPage}
              src={arrowPage}
              style={{ width: 30, height: 20, marginRight: 42, marginLeft: 0, marginTop: 0, marginBottom: 0, transform: "rotate(180deg)" }}
              alt="Error" />
            <img
              onClick={this.goToPrevPage}
              src={arrow}
              style={{ width: 36, height: 30, marginRight: 36, marginLeft: 0, marginTop: 0, marginBottom: 0, transform: "rotate(180deg)" }}
              alt="Error" />
            <p style={{ fontSize: 18, color: '#fff' }}>
              {pageNumber + "/" + numPages}
            </p>
            <img
              onClick={this.goToNextPage}
              src={arrow}
              style={{ width: 36, height: 30, marginLeft: 36, marginTop: 0, marginBottom: 0, marginRight: 0 }}
              alt="Error" />
            <img
              onClick={this.goToNextPage}
              src={arrowPage}
              style={{ width: 30, height: 20, marginLeft: 42, marginTop: 0, marginBottom: 0, marginRight: 0 }}
              alt="Error" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: '10%'}}>
            <img
              onClick={this.goToPrevPage}
              src={zoomIn}
              style={{ width: 40, height: 40, marginLeft: 0, marginTop: 0, marginBottom: 0}}
              alt="Error" />
            <img
              onClick={this.goToNextPage}
              src={zoomOut}
              style={{ width: 40, height: 40, marginTop: 0, marginBottom: 0, marginRight: 0 }}
              alt="Error" />
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', textAlign: 'center', marginTop: 6 }}>
          <Document
            file={url}
            loading={(props) => {this.toogleModal(); return <p></p>}}
            on
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
