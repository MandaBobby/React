import React, { useState } from 'react';

function Calc() {
  const [inputValue, setInputValue] = useState('');
  const [Result, setResult] = useState(0);

  const handleInput = (e) => {
    setInputValue(Number(e.target.value));
  };

  const Addition = () => {
    if (inputValue !== '') {
      setResult(Result + inputValue);
      setInputValue('');
    }
  };

  const Subtraction = () => {
    if (inputValue !== '') {
      setResult( Result - inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      <input  type="number" value={inputValue} onChange={handleInput}  placeholder="Enter a number"/>
      <br/>
      <button onClick={Addition}>Addition</button>
      <button onClick={Subtraction}>Subtraction</button>
      <br />
      <p> Result: {Result}</p>
    </>
  );
}

export default Calc;