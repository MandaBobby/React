import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const Login=()=>{
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const navigate=useNavigate()


const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('Users')) || [];
    const admins= JSON.parse(localStorage.getItem('Admins')) || [];

    
    let admin = admins.find(Admin=> Admin.email === email && Admin.password === password);
    let user =users.find(user=>user.email===email&& user.password===password)
   
    if(admin){
        navigate('/Admin') 
    }
    else  if(user){
        navigate('/User')
    }
    
       
    


    setEmail("")
    setPassword("")

   
};

return (
    <>
        <form onSubmit={handleLogin}>
           <h1 align='center'>Login Form</h1>
        <table align='center'>
                <br/>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
                </tr>
                 <tr>
                    <td>Password</td>
                    <td>:</td>
                    <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></td>
                </tr>
            
            
              </table>
              <br/>
              <center>  <Button  variant='primary' type="submit">Login</Button></center>
        </form>
        
    </>
);
};

export default Login;