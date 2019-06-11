import React, { Component } from 'react';
import { } from 'react';
import { StageSpinner } from "react-spinners-kit";

import icon from '../../img/logo_ovb_white.png'

import Modal from 'react-awesome-modal';
import '../styles.css';

class LoadingPopup extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
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
                style={customStyles}
                contentLabel="Example Modal"
                isOpen={!!this.props.show} >

                <div style={{ display: 'flex', alignItems:'center', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#003A65', textAlign: 'center' }}>
                    <img src={icon} style={ovbIcon} alt="ovb_logo" />

                    <h1 style={{
                        fontFamily: 'Roboto Slab',
                        color: '#fff',
                        marginRight: '0.8em',
                        marginLeft: '0.8em',
                        fontSize: '1.2em'
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
                        fontSize: '0.8em'
                    }}>
                        Lade Daten...
                    </p>
                </div>
            </Modal>
        );
    }
}

const ovbIcon = {
    width: '3em',
    marginTop: '0.8em'
}

const customStyles = {
    display: 'flex',
    alignItems: "center",
    backgroundColor: '#003A65',
    fontFamily: 'Roboto Slab',
    textAlign: 'center',
    justifyContent: "center",
    content: {
        top: '50%',
        left: '50%',
        backgroundColor: '#003A65',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export { LoadingPopup };
