import React, { Component } from 'react';
import { } from 'react';
import Modal from 'react-awesome-modal';
import Center from 'react-center'
import '../styles.css';

class SurePopup extends Component {
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
                onClickAway={() => this.closeModal()}
                style={customStyles}
                contentLabel="Example Modal" >

                <div style={{ backgroundColor: "#fff", height: 4, width: '100%' }} />

                <div style={floatingActionButton}>
                    <img style={{ height: '2.5em', width: '2.5em' }} src={require('../../img/sure_icon.png')} alt="Error" />
                </div>

                <p style={{ fontSize: '0.8em', textAlign: "center", fontWeight: 'bold', color: "#003A65", marginTop: 8, marginBottom: 14, marginRight: '2em', marginLeft: '2em' }}>
                    Prüfung beenden?
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
                        onClick={() => { this.closeModal(); this.props.onPressEnd(); }}
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
    marginBottom: '0.7em',
    justifyContent: "center",
    alignItems: "center",
};

const lineColor = {
    backgroundColor: "#DE7010",
    height: 6,
    width: '100%'
};

const buttonStyle = {
    display: 'flex',
    flexGrow: 4,
    border: "none",
    height: 56,
    backgroundColor: '#003A65',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 6
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

export { SurePopup };
