import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Quizexam = () => {

    const [Question,setQuestion]=useState('');
    const [Answer,setAnswer]=useState('None');
    
    const [Option1,setOption1]=useState('')
    const [Option2,setOption2]=useState('')
    const [Option3,setOption3]=useState('')
    const [Option4,setOption4]=useState('')

    const [storedQuestion,setStoredQuestion]=useState([])

     const Navigate=useNavigate();

    useEffect(()=>{
          setStoredQuestion(JSON.parse(localStorage.getItem("question"))||[])
    },[])

    const submitHandler = (e) => {
      e.preventDefault();
  
      const newQuestion = { Question, Answer, Option1, Option2, Option3, Option4 };
      const updatedQuestions = [...storedQuestion, newQuestion];
      localStorage.setItem("question", JSON.stringify(updatedQuestions));
  
      setStoredQuestion(updatedQuestions);
      setQuestion("");
      setAnswer("None");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
  
      if (updatedQuestions.length === 10) {
          Navigate('/Exam'); 
      }
  };
  

  return (
    <>
    <form onSubmit={submitHandler}>
        <h1>Add Questions</h1>
        <table>
            <tr>
                <td>Quesion</td>
                <td>:</td>
                <td><input type='text' value={Question} onChange={(e)=>setQuestion(e.target.value)} required/></td>
            </tr>
            <tr>
                <td>Answer</td>
                <td>:</td>
                <td>
                    <select  value={Answer} onChange={(e)=>setAnswer(e.target.value)}>
                        <option value=''>options select chesko bhayya</option>
                        <option value="1">option 1</option>
                        <option value="2">option 2</option>
                        <option value="3">option 3</option>
                        <option value="4">option 4</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Options</td>
                <td>:</td>
                <td>
                   <input type="text" placeholder='option 1' value={Option1} onChange={(e)=>setOption1(e.target.value)} required/><br/>
                   <input type="text"  placeholder='option 2' value={Option2} onChange={(e)=>setOption2(e.target.value)}  required/><br/>
                   <input type="text" placeholder='option 3'  value={Option3} onChange={(e)=>setOption3(e.target.value)} required/><br/>
                   <input type="text" placeholder='option 4'  value={Option4} onChange={(e)=>setOption4(e.target.value)} required/><br/>
                </td>
            </tr>

        </table>
        <button type='submit'>submit</button>
    </form>
   
    {
        storedQuestion.length === 0 ? <h1> Questions lev bhayya 
        edhoka Questiontype chey bhayya</h1> :

          <div>
            <h1>Available Products</h1>

            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Question</th>
                  <th>Annswer</th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                  <th>Option 4</th>
                </tr>
              </thead>
              <tbody>
                {storedQuestion.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.Question}</td>
                    <td>{entry.A}</td>
                    <td>{entry.Option1}</td>
                    <td>{entry.Option2}</td>
                    <td>{entry.Option3}</td>
                    <td>{entry.Option4}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
}
    </>
  )
}

export default Quizexam;