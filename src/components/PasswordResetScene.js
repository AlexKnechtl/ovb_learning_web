//@ts-check

import React, {useState} from 'react'
import { TextInput, AppHeader, Button } from './common';

import userIcon from '../img/ic_user.png'
import { AuthInteractor, AuthService } from '../coreFork';
export default function PasswordResetScene() {
    var [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState("")

    const authenticator = new AuthInteractor(new AuthService());
    return (
        <AppHeader>
            <div style={{background: "#003A65", flex: 1, padding: "1em"}}>
                <h1>Passwort zurücksetzen</h1>
                {!emailSent&& <TextInput type="email" 
                onChange={(event)=> setEmail(event.target.value)}
                hint="E-Mail"
                icon={userIcon}
                name="email"
                autofocus={true}/>}
                {emailSent&& <h2>Email wurde gesendet.</h2>}
                {!emailSent&& <Button
                        onPress={()=> authenticator.resetPassword(email.trim()).then(ev=> {setEmailSent(ev.emailSent); setError(ev.error); })}
                        buttonText="E-Mail anfordern"
                        backgroundColor="#fff">
                        E-Mail anfordern
                </Button>}
                {!emailSent&& <p>{error}</p>}
            </div>
        </AppHeader>
    )
}
