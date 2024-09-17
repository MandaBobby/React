import React from 'react'

const Map = () => {
    // const arr = ["kakinada",'rajamundry','vijayawada','vizag','guntur']
    const areas = [
        {
            id:1,
            place:"kakinada"
        },
        {
            id:2,
            place:"rajamundry"
        },
        {
            id:3,
            place:"vijayawada"
        },
        {
            id:4,
            place:"vizag"
        },
        {
            id:5,
            place:"guntur"
        }
    ]
  return (
    <>
    {areas.map(values => <li index={values.id}>{values.id} {values.place}</li>)}
    </>
  )
}

export default Map