import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

var Message;

const navigate=useNavigate()

const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("login successful")
        Message=`Welcome ${user.username}`
    } 
    else {
        Message='Invalid email or password';
    }
    setEmail("")
    setPassword("")

    localStorage.setItem("msg",JSON.stringify(Message))


    navigate('/Username')
   
};

return (
    <>
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
        
    </>
);
};

export default Login;