import React, { Component } from 'react';
import { } from 'react';
import Modal from 'react-awesome-modal';
import Center from 'react-center'
import '../styles.css';

class FinishedPopup extends Component {
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
                    <img style={{ height: '1.8em', width: '2.5em' }} src={require('../../img/ic_check.png')} alt="Error" />
                </div>

                <p style={{ fontSize: '0.8em', textAlign: "center", fontWeight: 'bold', color: "#003A65", margin: 8 }}>
                    Alle Fragen
                </p>
                <p style={{ fontSize: '0.9em', textAlign: "center", fontWeight: 'bold', color: "#003A65", marginTop: 8, marginBottom: 8, marginRight: 32, marginLeft: 32 }}>
                    Richtig beantwortet
                </p>

                <div style={lineColor} />

                <button
                    onClick={() => { this.closeModal() }}
                    style={buttonStyle}>
                    <Center style={buttonText}>
                        Weiter
                    <img
                            src={require('../../img/arrow.png')}
                            style={{ height: '1.5em', width: '1.8em', marginLeft: 18 }}
                            alt="User Icon" />
                    </Center>
                </button>

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
    width: '3.6em',
    height: '3.6em',
    marginTop: '1em',
    marginBottom: '0.7em',
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2EEF6A'
};

const lineColor = {
    backgroundColor: "#2EEF6A",
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

const buttonText = {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20
}

export { FinishedPopup };
