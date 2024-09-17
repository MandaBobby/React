import React, { useEffect, useState } from 'react';
import  Button  from 'react-bootstrap/Button';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [marks, setMarks] = useState(0);
    const [timer, setTimer] = useState(5);
    const [selectedOption, setSelectedOption] = useState('');
    const [quizComplete, setQuizComplete] = useState(false);
    const name = JSON.parse(localStorage.getItem("name")) || [];

    useEffect(() => {
           setQuestions( JSON.parse(localStorage.getItem("Quiz")) || []);
    }, []);

    useEffect(() => {
        if (timer <= 0) {
            NextQuestion();
        }
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    NextQuestion();
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    const NextQuestion = () => {
        if (questions[currentIndex].A === selectedOption) {
            setMarks(prevMarks => prevMarks + 1);
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setTimer(5);
            setSelectedOption('');
        } else {
            setQuizComplete(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!quizComplete) {
            NextQuestion();
         }
    
    };

    return (
        <>
        <div className='container'>
            {quizComplete ? (
                <>
               <br/> <h2 align='center' style={{color:"green"}}>Quiz complete! </h2><br/><h2 align='center'>{name} You scored: {marks} Marks out of {questions.length}</h2>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1 align="center">-:Quiz Paper:-</h1>
                    {questions.length > 0 && (
                        <>
                            <h2 align='right'>Time remaining: {timer} seconds</h2>
                            <div>
                                <ul style={{ listStyle: 'none' }}>
                                    <h3>{currentIndex + 1}. {questions[currentIndex].Q} ?</h3>
                                    <li>
                                        <input type="radio"  value="1" name={`Answer ${currentIndex}`} checked={selectedOption=='1'}  onChange={(e) => setSelectedOption(e.target.value)} />
                                        {questions[currentIndex].Option1}
                                    </li>
                                    <li>
                                        <input type="radio"  value="2" name={`Answer ${currentIndex}`} checked={selectedOption=='2'} onChange={(e) => setSelectedOption(e.target.value)} />
                                        {questions[currentIndex].Option2}
                                    </li>
                                    <li>
                                        <input type="radio"  value="3" name={`Answer ${currentIndex}`} checked={selectedOption=='3'} onChange={(e) => setSelectedOption(e.target.value)} />
                                        {questions[currentIndex].Option3}
                                    </li>
                                    <li>
                                        <input type="radio"  value="4" name={`Answer ${currentIndex}`} checked={selectedOption=='4'} onChange={(e) => setSelectedOption(e.target.value)} />
                                        {questions[currentIndex].Option4}
                                    </li>
                                </ul>
                            </div>
                            <center>
                                {currentIndex < questions.length - 1 ? (
                                    <Button variant='secondary' type='button' onClick={NextQuestion}>Skip</Button>
                                ) : (
                                    <Button variant='primary' type='submit'>Submit</Button>
                                )}
                            </center>
                        </>
                    )}
                </form>
            )}
        </div>
        </>
    );
};

export default Quiz;
