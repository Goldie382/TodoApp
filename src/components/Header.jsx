import React from 'react'

const Header = () => {

    const headerStyle = {
        backgroundColor: "mediumsegreen",
        padding: "8px",
        color: "white",
        fontSize: "12px"
    }
  return (
    <header style={headerStyle}>
        <h1>Groceries List</h1>
      
    </header>
  )
}

export default Header
