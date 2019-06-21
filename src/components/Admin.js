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

import "./Admin.css";

class Home extends Component {
  state = {
    email: "",
    password: "password",
    error: "",
    loading: false
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

  render() {
    const { email, password, loading, error } = this.state;
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
              <p>Password: {password}</p>
              <button onClick={this.addUser}>User hinzufügen</button>
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
