import React,{useEffect, useState} from 'react'

const Form = () => {
    const [data,setData] = useState({
        firstname:"",
        lastname:"",
        phoneNumber:"",
        email:"",
        password:"",
        confirmpassword:""
    })
  
    console.log(data)

    const {firstname,lastname,phoneNumber,email,password,confirmpassword} = data

    const[submitData, setSubmitData] = useState([])

    const ChangeHandler = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
       setSubmitData((JSON.parse(sessionStorage.getItem("data")))||[]);    
    },[submitData])
  
    const SubmitHandler = (e) =>{
        e.preventDefault();
        if(password==confirmpassword){

          //set data in local storage
          sessionStorage.setItem('data',JSON.stringify({firstname,lastname,email,phoneNumber,password}))
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

    <div id='demo'>
        <h1> First name:{submitData.firstname}</h1>
        <h1> Last name:{submitData.lastname}</h1>
        <h1>Phone number{submitData.phoneNumber}</h1>
        <h1>Email:{submitData.email}</h1>
        <h1>Password:{submitData.password}</h1>
    </div>
    </>
  )
}

export default Form