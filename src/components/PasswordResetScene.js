//@ts-check
import React, { useState } from 'react'
import { TextInput, Button } from './common';

//Core
import { AuthInteractor, AuthService } from '../coreFork';

//Images
import icon from '../img/logo_ovb_white.png'
import userIcon from '../img/ic_email.png'
import background from '../img/bg_web_ovb.jpg'
import seekInnoIcon from '../img/seek_innovation_logo.png'

export default function PasswordResetScene() {
    var [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState("")

    const authenticator = new AuthInteractor(new AuthService());
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
                <p style={{ marginTop: '3vh', fontSize: '1.3em', minWidth: "10.5em", marginBottom: '1.8vh' }}>Passwort zurücksetzen</p>
                <p style={{ marginTop: '0.2vh', fontSize: '0.5em', marginBottom: '5vh', marginLeft: '10%', marginRight: '10%' }}>Tippe hier deine E-Mail Adresse ein um dein Learning Suite{"\n"}Passwort zu ändern</p>
                {!emailSent && <TextInput type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    hint="E-Mail"
                    icon={userIcon}
                    name="email"
                    autofocus={true} />}
                {emailSent && <h2>Email wurde gesendet.</h2>}
                {!emailSent && <Button
                    onPress={() => authenticator.resetPassword(email.trim()).then(ev => { setEmailSent(ev.emailSent); setError(ev.error); })}
                    buttonText="E-Mail anfordern"
                    backgroundColor="#fff">
                    E-Mail anfordern
                </Button>}
                {!emailSent && <p>{error}</p>}
            </div>
        </header>
    )
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
    width: 'max-content',
    minWidth: '30%',
    textAlign: "center"
}

const ovbIcon = {
    marginTop: '5vh',
    width: '35%'
}