import React, { useEffect, useState } from 'react';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("question")) || [];
    setQuestions(storedQuestions);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // Calculate marks or perform any necessary actions upon submission
    // In this example, we are displaying the marks
    document.getElementById('demo').innerHTML =` You scored ${marks} out of ${questions.length}`;
  };

  const checkAnswer = (selectedAnswer, questionIndex) => {
    const correctAnswer = questions[questionIndex].Answer;
    if (selectedAnswer === correctAnswer) {
      setMarks(marks + 1);
    }
  };

  return (
    <div className='container'>
      <h1 align="center">Quiz Paper</h1>
      <form onSubmit={submitHandler}>
        {questions.map((q, index) => (
          <div key={index}>
            <h3>{index + 1}. {q.Question}</h3>
            <ul style={{ listStyle: 'none' }}>
              <li>
                <label>
                  <input type="radio" name={`answer${index}`} value="1" onChange={() => checkAnswer('1', index)} /> {q.Option1}
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name={`answer${index}`} value="2" onChange={() => checkAnswer('2', index)} /> {q.Option2}
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name={`answer${index}`} value="3" onChange={() => checkAnswer('3', index)} /> {q.Option3}
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name={`answer${index}`} value="4" onChange={() => checkAnswer('4', index)} /> {q.Option4}
                </label>
              </li>
            </ul>
          </div>
        ))}
        <center><button type='submit'>Submit</button></center>
      </form>
      <h1 id='demo' align="center"></h1>
    </div>
  );
};

export default Exam;