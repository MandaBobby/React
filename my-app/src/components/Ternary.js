import React, { useState } from 'react'

const Ternary = () => {
    const [data,setData] = useState(10)

  return (
    <div>
        {
            data == 11 ? <h1>this is true</h1>:<h1>This is flase</h1>
        }

       
    </div>
  )
}

export default Ternary