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
                        fontSize: "1em",
                        height: '2em',
                        minWidth: '10em',
                        borderWidth: 2,
                        borderColor: this.state.hover ? '#fff9' : '#fff',
                        border: "solid",
                        textAlign: "center",
                        color: this.state.hover ? '#fff9' : '#fff',
                        paddingLeft: '1em',
                        paddingRight: '1em',
                        marginBottom: 14,
                    }}>
                    <Center>
                        <img src={image} style={{ height: '1.6em', marginRight: 24, opacity: this.state.hover ? 0.8 : 1 }} alt="User Icon" />
                        {buttonText}
                    </Center>
                </button>
        );
    }
}

export { CategoryButton };