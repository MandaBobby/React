import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';


const Quiz = () => {

    const [Questions,setQuestions]=useState([])
    const [marks,setMarks]=useState(0);
    const [Timer,setTimer]=useState(10)
    const name=JSON.parse(localStorage.getItem("name"))||[];

    useEffect(() => {
        setQuestions(JSON.parse(localStorage.getItem("Quiz")));

        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);


    const submitHandler=(e)=>{
        e.preventDefault();
        clearTimeout(count);
         handlesubmit();

    }

    const handlesubmit=()=>{
           document.getElementById("demo").innerHTML=`
        ${name} you got Marks:${marks}/${Questions.length}`
    }

    const count=  setTimeout(handlesubmit,10000)

    const check=(a,i)=>{
        const correct=Questions[i].A
        if(correct===a){
            setMarks(marks+1);
        }
    }

  return (
    <>
    <div className='container'>
        
        <form onSubmit={submitHandler}>
       <h1 align="center"> Quiz paper</h1>
       <p align="right">
       {Timer>1 ? <h1>Remaining time:{Timer} Seconds</h1>:<h1 style={{color:"red"}}>time up</h1>}
       </p>
     {Questions.map((q,index)=>(
        <div>
     
        <ul key={index} style={{listStyle:'none'}}>
            <h3>{index+1}.{q.Q} ?</h3>
            <li><input type="radio" value="1"  name={`Answer ${index}`} onChange={(e)=>check(e.target.value,index)}/>{q.Option1}</li>
            <li><input type="radio" value='2'  name={`Answer ${index}`}  onChange={(e)=>check(e.target.value,index)}/>{q.Option2}</li>
            <li><input type="radio" value='3'  name={`Answer ${index}`} onChange={(e)=>check(e.target.value,index)}/>{q.Option3}</li>
            <li><input type="radio" value='4'  name={`Answer ${index}`} onChange={(e)=>check(e.target.value,index)}/>{q.Option4}</li>
        </ul>
        
</div>
    ))}
    <center><Button variant='primary' type='submit'>submit</Button></center>
    </form>
   <h1 id='demo'></h1>
    </div>
    </>
  )
}

export default Quiz