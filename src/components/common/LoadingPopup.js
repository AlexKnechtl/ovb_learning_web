import React, { Component } from 'react';
import { } from 'react';

import Modal from 'react-awesome-modal';
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

                <img src={icon} style={ovbIcon} alt="ovb_logo" />

                <h1 style={{
                    fontFamily: 'Roboto Slab',
                    color: '#fff',
                    fontSize: '1.8em'
                }}>
                    Learning Suite
                </h1>

                <StageSpinner
                    size={32}
                    color="#fff"
                />

                <p style={{
                    fontFamily: 'Roboto Slab',
                    color: '#fff',
                    fontSize: '1.3em'
                }}>
                    Lade Daten.
                </p>

                <div style={{ backgroundColor: "#fff", height: 4, width: '100%' }} />
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

export { FinishedPopup };
