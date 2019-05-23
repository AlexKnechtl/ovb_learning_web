import React from 'react'

const AppHeader = ({ children }) => {
    return (
        <header className="appHeader" style={appHeader}>
            {children}
        </header>
    )
}

const appHeader = {
    minHeight: '100vh',
    display: 'flex',
    // flexDirection: 'row-reverse',
    fontFamily: 'Roboto Slab',
    fontSize: `calc(10px + 2vmin)`,
    color: 'white'
}

export { AppHeader };