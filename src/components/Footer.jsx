import React from 'react'

const Footer = () => {


    const today = new Date();

  return (
    <div>
      <p>copyright &copy; {today.getFullYear()}</p>
    </div>
  )
}

export default Footer
