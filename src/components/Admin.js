//@ts-check
import React, { Component } from "react";
import {} from "react";
import {
  ImageButton,
  Options,
  Modules,
  InteractSection,
  DisplaySection,
  CategoryButton,
  Statistics,
  PDFPopup,
  AppHeader
} from "./common";
import "./styles.css";
import { connect } from "react-redux";

import firebase from "@firebase/app";
import "firebase/auth";
import generatePassword from "password-generator";
import { sendMail } from "../services/MailService";

import "./Admin.css";

class Home extends Component {
  state = {
    email: "",
    password: "password",
    error: "",
    loading: false,
    /** @type {{email: string, password: string, error: string}[]} */
    users: []
  };
  constructor(props) {
    super(props);
  }

  addUser = async () => {
    this.setState({ error: "", loading: true });
    var pw = generatePassword(8, true, /[\w\W\d]/, "2xA");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, pw);
      this.setState({ password: pw });
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  addUsers = async () => {
    var users = [];
    this.setState({ error: "", loading: true });
    for (const user of this.state.users) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      await sendMail(user.email, user.password)
      users.push({...user, error: "success, Email sent!"});
    } catch (error) {
      users.push({...user, error: error.message});
    }
    }
    this.setState({loading: false, users});
  };

  checkUsers = (emails) => {
    var users = emails.split('\n')
    .map(s=> s.trim())
    .filter(s=> s.length>0)
    .map(s=> ({email: s, password: generatePassword(8, true, /[\w\W\d]/, "2xA"), error: ""}));
    this.setState({users});
  }

  render() {
    const { email, password, loading, error, users } = this.state;
    return (
      <AppHeader>
        <DisplaySection title="Admin">
          <div className="container-admin">
            <h1>Benutzer hinzufügen</h1>
            <p>Einzelnen Benutzer hinzufügen</p>
            <p>{loading&&"Arbeitet..."}</p>
            <div className="container-add-user">
              <p>Email: <input style={{height: "2em"}}
                  onChange={e =>
                    this.setState({ email: e.target.value.trim() })
                  }
                  type="email"
                  placeholder="email"
                /></p>
              {password!="password"&&<p>Password: {password}</p>}
              <button onClick={this.addUser}>User hinzufügen</button>
            </div>
            <p>{error}</p>
            <h2>Mehrere Benutzer hinzufügen</h2>
            <p>{loading&&"Arbeitet..."}</p>
            <div className="container-add-user">
              <p>Emails: </p>
              <textarea style={{height: "6em", marginBottom: "1em"}}
                  onChange={e =>
                    this.checkUsers(e.target.value.trim())
                  }
                  placeholder="email1\nemail2\nemail3"
                />
              <table style={{width: "100%"}}>
                <tr>
                  <th>Email</th>
                  <th>Passwort</th>
                  <th>Errors</th>
                </tr>
                {users.map(user=> <tr><td>{user.email}</td><td>{user.password}</td><td>{user.error}</td></tr>)}
              </table>
              {users.length>0&& <button onClick={this.addUsers}>User hinzufügen und Emails versenden</button>}
            </div>
            <p>{error}</p>
          </div>
        </DisplaySection>
      </AppHeader>
    );
  }
}
const mapDispatchToProps = {};

const mapStateToProps = state => ({
  modules: state.modules.modules,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
