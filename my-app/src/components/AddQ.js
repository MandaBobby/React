import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AddQ = () => {

    const [Q,setQ]=useState('');
    const [A,setA]=useState('None');
    
    const [Option1,setOption1]=useState('')
    const [Option2,setOption2]=useState('')
    const [Option3,setOption3]=useState('')
    const [Option4,setOption4]=useState('')

    const [storedQ,setStoredQ]=useState([])

    const navgate=useNavigate();

    useEffect(()=>{
          setStoredQ(JSON.parse(localStorage.getItem("Quiz"))||[])
    },[])

    const submitHandler=(e)=>{
        e.preventDefault();
        if(A=='None'){
            alert("select answer correctly")
            return;
        }

        
        const newQ={Q,A,Option1,Option2,Option3,Option4}

        storedQ.push(newQ);
        localStorage.setItem("Quiz",JSON.stringify(storedQ))

        setQ("")
        setA("None")
        setOption1("")
        setOption2("")
        setOption3("")
        setOption4("")

    }

    const deletehandler=(i)=>{
      const updatedData = storedQ.filter((_,index) => index !== i);
      localStorage.setItem('Quiz', JSON.stringify(updatedData));
      setStoredQ(updatedData);
    }

    const next=()=>{
      if(storedQ.length>=5&&storedQ.length<=10){
        alert("redirecting to Quiz form page")
        navgate('/name')
      }
      else if(storedQ.length<5){
        alert("add minimum 5 questions")
      }
      else if(storedQ.length>10){
        alert("Questions entered more then 10  pleace delete some questions")
      }

    }

  return (
    <>
    <form onSubmit={submitHandler} >
      <br/>
        <h1 align="center">-:ADD QUESTIONS:-</h1>
        <br/>
        <table align='center'>
            <tr>
                <td>Quesion</td>
                <td>:-</td>
                <td><input type='text' value={Q} onChange={(e)=>setQ(e.target.value)} required/></td>
            </tr>
            <tr>
                <td>Answer</td>
                <td>:-</td>
                <td>
                    <select  value={A} onChange={(e)=>setA(e.target.value)}>
                        <option value=''>None</option>
                        <option value="1">option 1</option>
                        <option value="2">option 2</option>
                        <option value="3">option 3</option>
                        <option value="4">option 4</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td style={{verticalAlign:"top"}}>Options</td>
                <td style={{verticalAlign:"top"}}>:-</td>
                <td>
                   <input type="text" placeholder='option 1' value={Option1} onChange={(e)=>setOption1(e.target.value)} required/><br/>
                   <input type="text"  placeholder='option 2' value={Option2} onChange={(e)=>setOption2(e.target.value)}  required/><br/>
                   <input type="text" placeholder='option 3'  value={Option3} onChange={(e)=>setOption3(e.target.value)} required/><br/>
                   <input type="text" placeholder='option 4'  value={Option4} onChange={(e)=>setOption4(e.target.value)} required/>
                </td>
            </tr>

        </table><br/>
        <center><Button variant='primary' type='submit'>submit</Button></center>
    </form>
    <br/>
   
    {
        storedQ.length === 0 ? <h1 style={{ textAlign: 'center' }}>NO Questions submited</h1> :

          <div className='container'>
            <h1 align='center'>Submitted Questions</h1><br/>

            <table className='table table-bordered  table-hover border-secondary' >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Question</th>
                  <th>Annswer</th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                  <th>Option 4</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {storedQ.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.Q}</td>
                    <td>{entry.A}</td>
                    <td>{entry.Option1}</td>
                    <td>{entry.Option2}</td>
                    <td>{entry.Option3}</td>
                    <td>{entry.Option4}</td>
                    <td><Button variant='danger' onClick={()=>deletehandler(index)}>delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
}
<p align='right' className='container'>
<Button variant='primary' onClick={next}>Next</Button>
</p>
    </>
  )
}

export default AddQ;