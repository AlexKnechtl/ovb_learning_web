import React, { Component } from 'react';
import { } from 'react';
import Modal from 'react-awesome-modal';
import Center from 'react-center'
import '../styles.css';

class PDFPopup extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <Modal
                ref={"myModal"}
                visible={this.state.modalIsOpen}
                onClickAway={() => this.closeModal()}
                style={customStyles}
                contentLabel="Example Modal" >

                <div style={{ backgroundColor: "#fff", height: 4, width: '100%' }} />

                <div style={floatingActionButton}>
                    <img style={{ height: '3em', width: '3em' }} src={require('../../img/pdf_icon.png')} alt="Error" />
                </div>

                <p style={{ fontSize: '0.9em', textAlign: "center", fontWeight: 'bold', color: "#003A65", marginTop: 0, marginBottom: 14, marginRight: '2em', marginLeft: '2em' }}>
                    Skripten
                </p>

                <div style={lineColor} />

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button
                        onClick={() => { this.closeModal() }}
                        style={backButtonStyle}>
                        <Center style={buttonText}>
                            Zurück
                        </Center>
                    </button>
                    <button
                        onClick={() => { this.closeModal() }}
                        style={buttonStyle}>
                        <Center style={buttonText}>
                            Beenden
                            <img
                                src={require('../../img/arrow.png')}
                                style={{ height: '1.4em', width: '1.7em', marginLeft: '0.6em' }}
                                alt="User Icon" />
                        </Center>
                    </button>
                </div>
            </Modal>
        );
    }
}

const customStyles = {
    display: 'flex',
    alignItems: "center",
    fontFamily: 'Roboto Slab',
    textAlign: 'center',
    justifyContent: "center",
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const floatingActionButton = {
    display: 'flex',
    alignSelf: 'center',
    margin: "0 auto",
    marginTop: '1em',
    marginBottom: '0.5em',
    justifyContent: "center",
    alignItems: "center",
};

const lineColor = {
    backgroundColor: "#CB0606",
    height: 6,
    width: '100%'
};

const buttonStyle = {
    display: 'flex',
    width: '100%',
    border: "none",
    height: 56,
    backgroundColor: '#003A65',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8
};

const backButtonStyle = {
    display: 'flex',
    border: "none",
    height: 56,
    flexGrow: 3,
    backgroundColor: '#002F53',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 6
};

const buttonText = {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17
}

export { PDFPopup };
