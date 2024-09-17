import React from 'react'

const Username = () => {
const msg=JSON.parse(localStorage.getItem("msg"));

  return (
    <div><h1>{msg}</h1></div>
  )
}

export default Username