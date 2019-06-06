//@ts-check
import React, { Component } from 'react'
import { Document, Page } from "react-pdf";
import { LoadingPopup } from './common';
import './styles.css';

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

    this.state = { url, pageNumber: parseInt(pageNum), numPages: null, pageHeight: 1000 };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.closeModal();
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber > 1 ? state.pageNumber - 1 : 1 }));

  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber < state.numPages ? state.pageNumber + 1 : state.numPages }));

  goToFirstPage = () =>
    this.setState(state => ({ pageNumber: 1 }));

  goToLastPage = () =>
    this.setState(state => ({ pageNumber: state.numPages }));

  toogleModal = () => {
    this.refs.popupLoading.openModal();
  }

  closeModal() {
    this.refs.popupLoading.closeModal();
  }

  render() {
    const { pageNumber, numPages, url } = this.state;

    let params = new URLSearchParams(this.props.location.search);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center', backgroundColor: '#003A65', minHeight: '100vh', height: `${this.state.pageHeight + 500}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: "5em", textAlign: 'center', paddingBottom: "2em" }}>
          <Document
            file={url}
            loading={(props) => { this.toogleModal.bind(this); return <p></p> }}
//console.log(error)}
            onLoadSuccess={this.onDocumentLoadSuccess}
//console.log('Document received')}
          >
            <Page height={this.state.pageHeight} pageNumber={pageNumber} />
          </Document>
        </div>
        <div style={{ width: '100%', height: '3.5em', backgroundColor: '#032C4A', position: 'fixed', textAlign: 'left' }}>
          <p style={{
            color: '#fff',
            fontSize: 18,
            maxWidth: '25%',
            maxHeight: '1.5em',
            overflow: 'hidden',
            fontWeight: 'bold',
            marginLeft: 24
          }}>
            {decodeURI(params.get('pdfname')) || "Skriptum über irgendwas"}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '0em', transform: 'translateX(-50%)' }}>
            <img
              onClick={this.goToFirstPage}
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
              onClick={this.goToLastPage}
              src={arrowPage}
              style={{ width: 30, height: 20, marginLeft: 42, marginTop: 0, marginBottom: 0, marginRight: 0 }}
              alt="Error" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: '10%', top: "0.5em" }}>
            <img
              onClick={() => this.state.pageHeight < 2800 ? this.setState(state => ({ pageHeight: state.pageHeight + 200 })) : ""}
              src={zoomIn}
              style={{ width: 40, height: 40, marginLeft: 0, marginTop: 0, marginBottom: 0 }}
              alt="Error" />
            <img
               onClick={() => this.state.pageHeight > 600 ? this.setState(state => ({ pageHeight: state.pageHeight - 200 })) : ""}
              src={zoomOut}
              style={{ width: 40, height: 40, marginTop: 0, marginBottom: 0, marginRight: 0 }}
              alt="Error" />
          </div>
        </div>
        <LoadingPopup ref={'popupLoading'} />
      </div>
    );
  }
}
