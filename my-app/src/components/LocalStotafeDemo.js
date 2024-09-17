import React, { useState, useEffect } from 'react';

const LocalStorageDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedData, setStoredData] = useState([]);
  const [edit,setEdit]=useState(null)
  const [check,setCheck]=useState(true)

    const handleSubmit = (e) => {
      e.preventDefault();
      let Data;
      if (edit!== null) {
        Data= storedData.map((item,index) => index === edit ? inputValue : item)
        setEdit(null);
      }
      else{
        Data=[...storedData,inputValue]
      }
    
    localStorage.setItem('storedData', JSON.stringify(Data));
    setStoredData(Data);
    setInputValue('');
  };

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('storedData')) || [];
    setStoredData(dataFromLocalStorage);
  }, []);

  const handleDelete = (i) => {
    const updatedData = storedData.filter((_,index) => index !== i);
    localStorage.setItem('storedData', JSON.stringify(updatedData));
    setStoredData(updatedData);
  };

  const handelEdit=(i)=>{
      setInputValue(storedData[i]);
      setEdit(i);
  }

  const checkitem=(i)=>{
    setCheck({...check,[i]:!check[i]})
    localStorage.setItem("check",JSON.stringify(check))
  }

  return (
    <div>
      <h2>Stored Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"   value={inputValue}  onChange={(e) => setInputValue(e.target.value)} placeholder="Enter data" required />
        <button id='submit' type="submit">{edit!==null? "update":"submit"}</button>
      </form>

      {storedData.length === 0 ? (
        <p>No data stored yet.</p>
      ) : (
        <ul style={{listStyle:"none"}}>
          {storedData.map((data,index) => (
            <li key={index} style={{textDecoration:check[index] ? "line-through":"none"}}>
              <input type='checkbox' onChange={()=>checkitem(index)}/>
              {data}
              <button onClick={()=>handelEdit(index)}>Edit</button>
              <button onClick={()=>handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocalStorageDemo;