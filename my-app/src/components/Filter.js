import React from 'react'

const Filter = () => {
    const values = [10,20,30,40,50,60,70,80,90]
    const arr = values.filter(val => val>40)
  return (
    <>
    {
        arr.map(value=><li>{value}</li>)
    }
    </>
  )
}

export default Filter

// import React from 'react'

// const Filter = () => {
//     const arr = ["kakinada",'rajamundry','vijayawada','vizag','guntur']

//     const arrFilter = arr.filter(value => value.includes('j'))
//   return (
//     <div>
//         {
//             arrFilter.map(name=> <li>{name}</li>)
//         }
//     </div>
//   )
// }

// export default Filter