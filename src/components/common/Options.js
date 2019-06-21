import React from "react";

class Options extends React.Component {
  state = {
    hover1: false,
    hover2: false,
    hover3: false,
    hover4: false
  };

  render() {
    const { onPressDatenschutz, onPressImpressum, onPressLogout, onPressAdmin, canAccessAdmin } = this.props;

    return (
      <div style={optionsStyle}>
        <button
          onClick={onPressDatenschutz}
          onMouseOver={() => this.setState({ hover1: true })}
          onMouseLeave={() => this.setState({ hover1: false })}
          style={{
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: "0.2em",
            padding: 0,
            border: "none",
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: "0.7em",
            color: "#003A65",
            textAlign: "center",
            opacity: this.state.hover1 ? 0.7 : 1
          }}
        >
          Datenschutz |
        </button>
        <button
          onClick={onPressImpressum}
          onMouseOver={() => this.setState({ hover2: true })}
          onMouseLeave={() => this.setState({ hover2: false })}
          style={{
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: "0.2em",
            padding: 0,
            border: "none",
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: "0.7em",
            color: "#003A65",
            textAlign: "center",
            opacity: this.state.hover2 ? 0.7 : 1
          }}
        >
          Impressum |
        </button>
        <button
          onClick={onPressLogout}
          onMouseOver={() => this.setState({ hover3: true })}
          onMouseLeave={() => this.setState({ hover3: false })}
          style={{
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: "0.2em",
            padding: 0,
            border: "none",
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: "0.7em",
            color: "#003A65",
            textAlign: "center",
            opacity: this.state.hover3 ? 0.7 : 1
          }}
        >
          Logout
        </button>
        {canAccessAdmin && <button
                    onClick={onPressAdmin}
                    onMouseOver={() => this.setState({ hover4: true })}
                    onMouseLeave={() => this.setState({ hover4: false })}
                    style={{
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: '0.2em',
                        padding: 0,
                        border: "none",
                        backgroundColor: "#fff",
                        fontWeight: 'bold',
                        fontSize: "0.7em",
                        color: "#003A65",
                        textAlign: "center",
                        opacity: this.state.hover4 ? 0.7 : 1
                    }}>
                    | Admin
            </button>}
      </div>
    );
  }
}

const optionsStyle = {
  borderWidth: 1,
  backgroundColor: "#fff",
  border: "solid",
  borderColor: "#003A65",
  paddingBottom: "0.2em",
  paddingRight: "0.7em",
  paddingLeft: "0.7em",
  marginLeft: "1.5em",
  marginBottom: "1em"
};

export { Options };
