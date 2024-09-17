import React,{useEffect, useState} from 'react'


const Storage = () => {

    const form = {
        firstname:"",
        lastname:"",
        phoneNumber:"",
        email:"",
        password:"",
        confirmpassword:""
    }

  const [data,setData]=useState(form);
  
    console.log(data)

    const {firstname,lastname,phoneNumber,email,password,confirmpassword} = data

    const[submitData,setSubmitData] = useState([]);

    const ChangeHandler = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }
   
    useEffect(()=>{
      const stored=((JSON.parse(sessionStorage.getItem("records")))||[])
      setSubmitData(stored)
    },[])

  const addentry=(Entry)=>{
    const newEntries=[...submitData,Entry];
    setSubmitData(newEntries);
    sessionStorage.setItem("records",JSON.stringify(newEntries));
    
}

    const SubmitHandler = (e) =>{
        e.preventDefault();
        if(password==confirmpassword){  
          addentry({firstname,lastname,phoneNumber,email,password});
          setData(form);
           }
        
        else{
            alert("passwords not matched");
        } 
      }

  return (
    <>
    <form onSubmit={SubmitHandler}>
        <label>Firstname: </label>
        <input type="text" placeholder='firstname' name='firstname' value={firstname} onChange={ChangeHandler}/><br />

        <label>lastname: </label>
        <input type="text" placeholder='lastname' name='lastname' value={lastname} onChange={ChangeHandler}/><br />

        <label>Phone Number: </label>
        <input type="number" placeholder='phone number' name='phoneNumber' value={phoneNumber} onChange={ChangeHandler}/><br />

        <label>Email: </label>
        <input type="email" placeholder='email' name='email' value={email} onChange={ChangeHandler}/><br />

        <label>Password: </label>
        <input type="password" placeholder='password' name='password' value={password} onChange={ChangeHandler} required/><br />

        <label>confirm-password: </label>
        <input type="password" placeholder='confirm password' name="confirmpassword" value={confirmpassword} onChange={ChangeHandler} required/><br />

        <input type="submit" name='submit'/>
    </form>
    {submitData.length>0 &&
   <div>
   <table border={1}>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>lastname</th>
          <th>phoneNumber</th>
          <th>email</th>
          <th>password</th>
        </tr>
      </thead>
      <tbody>
        {submitData.map((entry,index) => (
          <tr key={index}>
            <td>{entry.firstname}</td>
            <td>{entry.lastname}</td>
            <td>{entry.phoneNumber}</td>
            <td>{entry.email}</td>
            <td>{entry.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
}
    </>
  )

}

export default Storage;