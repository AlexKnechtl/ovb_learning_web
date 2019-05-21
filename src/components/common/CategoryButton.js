//@ts-check

import React from 'react';
import Center from 'react-center'

class CategoryButton extends React.Component{

    state = {hover:false}
    render(){
        const {onPress, buttonText, image} = this.props;
        return (
                <button onClick={onPress}
                    onMouseOver={()=> this.setState({hover:true})}
                    onMouseLeave={()=> this.setState({hover:false})}
                    style={{
                        flex: 1,
                        fontWeight: "bold",
                        backgroundColor: "#003A65",
                        fontSize: "0.9em",
                        height: '2em',
                        borderWidth: '0.1em',
                        borderColor: this.state.hover ? '#fff9' : '#fff',
                        border: "solid",
                        textAlign: "center",
                        color: this.state.hover ? '#fff9' : '#fff',
                        paddingLeft: '0.9em',
                        paddingRight: '0.9em',
                        marginBottom: '0.6em',
                    }}>
                    <Center>
                        <img src={image} style={{ height: '1.5em', marginRight: '0.8em', opacity: this.state.hover ? 0.8 : 1 }} alt="User Icon" />
                        {buttonText}
                    </Center>
                </button>
        );
    }
}

export { CategoryButton };