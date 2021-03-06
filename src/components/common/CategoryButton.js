//@ts-check

import React from 'react';
import Center from 'react-center'

class CategoryButton extends React.Component {

    state = { hover: false }
    render() {
        const { onPress, buttonText, image, testMode } = this.props;
        return (
            <button onClick={onPress}
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
                style={{
                    fontWeight: "bold",
                    backgroundColor: "#003A65",
                    fontSize: "0.9em",
                    height: '2em',
                    borderWidth: '0.1em',
                    borderColor: this.state.hover ? '#fff9' : '#fff',
                    border: "solid",
                    textAlign: "center",
                    width: '12.5em',
                    color: this.state.hover ? '#fff9' : '#fff',
                    paddingLeft: '0.8em',
                    paddingRight: '0.8em',
                    marginBottom: '0.6em',
                }}>
                <Center>
                    <img
                        src={image}
                        style={{
                            height: '1.5em',
                            marginRight: '0.8em',
                            transform: testMode ? "rotate(180deg)" : "",
                            opacity: this.state.hover ? 0.8 : 1
                        }}
                        alt="User Icon" />
                    {buttonText}
                </Center>
            </button>
        );
    }
}

export { CategoryButton };