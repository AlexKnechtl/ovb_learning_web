import React from 'react';
import Center from 'react-center'

class ImageButton extends React.Component {
    state = { hover: false }
    render() {
        const { image, onPress, buttonText, pdfButton } = this.props;
        return (
            <button
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
                onClick={onPress}
                style={{
                    // flex: 1,
                    fontWeight: "bold",
                    backgroundColor: this.state.hover ? "#fff9" : "#fff",
                    fontSize: "0.8em",
                    height: '2em',
                    border: "none",
                    textAlign: "center",
                    color: pdfButton ? "#663399" : "#003A65",
                    paddingLeft: '0.7em',
                    paddingRight: '0.7em',
                    marginBottom: '0.5em',
                }}>
                <Center>
                    <img
                        src={image}
                        style={{ maxHeight: '1.3em', maxWidth: '1.3em', marginRight: 12 }}
                        alt="User Icon" />
                    {buttonText}
                </Center>
            </button>
        );
    }
}

export { ImageButton };
