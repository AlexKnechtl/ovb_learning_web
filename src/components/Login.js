//@ts-check

import React, { Component } from 'react';
import { } from 'react'
import { Button, TextInput } from './common';

//Images
import icon from '../img/logo_ovb_white.png'
import userIcon from '../img/ic_user.png'
import seekInnoIcon from '../img/seek_innovation_logo.png'
import passwordIcon from '../img/ic_password.png'
import background from '../img/bg_web_ovb.jpg'
import { signInAction } from '../coreFork';
import {connect} from "react-redux";

class Login extends Component {

    state = {
        hovered: false,
        email: "",
        password: ""
    }
    constructor(props) {
        super(props);
    }

    //setHover = () => this.setState({ hovered: true });
    //cancelHover = () => this.setState({ hovered: false });

    render() {
        return (
            <header style={appHeader}>
                <div style={imageSection}>
                    <div style={headWhiteBackground}>
                        <p style={head}>Dein Weg zum Prüfungserfolg<br /> mit OVB Learning</p>
                    </div>
                    <div style={row}>
                        <p style={{ marginRight: 10 }}>Powered by SeekInnovation</p>
                        <img src={seekInnoIcon} style={{ height: '1.2em' }} alt="seek_logo" ></img>
                    </div>
                </div>
                <div style={loginSection}>
                    <img src={icon} style={ovbIcon} alt="ovb_logo" />
                    <p style={{ marginTop: '3vh', fontSize: '48px' }}>Learning Suite</p>

                    <TextInput
                        type="email"
                        onChange={(event)=> this.setState({email: event.target.value})}
                        hint="E-Mail"
                        icon={userIcon}
                        name="email" />

                    <TextInput
                        type="password"
                        onChange={(event)=> this.setState({password: event.target.value})}
                        hint="Passwort"
                        icon={passwordIcon}
                        name="password" />

                    <Button
                        link="/home"
                        onPress={()=> this.props.loginUser(this.state)}
                        buttonText="Anmelden">
                        Anmelden
                    </Button>
                </div>
            </header>
        );
    }
}

const head = {
    color: '#003A65',
    textAlign: 'end',
    fontSize: '1.6em',
    fontWeight: 'bold',
    margin: 8
}

const headWhiteBackground = {
    background: '#fff',
    verticalAlign: 'middle',
    alignItems: 'flex-end',
    padding: 10,
    marginTop: '6%',
    width: '90%',
}

const row = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '-0.2em',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBlockEnd: '20%',
}

const loginSection = {
    backgroundColor: "#003A65",
    width: '30%',
    textAlign: "center"
}

const ovbIcon = {
    marginTop: '5vh',
    width: '35%'
}

const imageSection = {
    backgroundImage: `url(${background})`,
    backgroundSize: '125%',
    height: '100vh',
    width: '70%',
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'Roboto Slab',
    flexDirection: 'row',
    fontSize: `calc(10px + 2vmin)`,
    color: 'white'
}

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    loginUser: signInAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); 