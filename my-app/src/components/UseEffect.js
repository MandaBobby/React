import React,{useState, useEffect}from 'react'

const UseEffect = () => {
    const [count, setCount] = useState(0)

    console.log(count,"count")

    useEffect(()=>{
        console.log(count,"use Effect count")
    },[count])
    
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={()=>setCount(count+1)}>Increment</button>
    </div>
  )
}

export default UseEffect