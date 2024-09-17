import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [storeddata,setstoreddata]=useState([])

    // const navgate=useNavigate();

    
    useEffect(()=>{
        setstoreddata(JSON.parse(localStorage.getItem("users")))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const match=storeddata.find(user => user.email === email)

        if (match) {
            alert('Email already exists');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const newUser = { username, email, password };
        storeddata.push(newUser);
        localStorage.setItem('users', JSON.stringify(storeddata));

        alert('Registration successful');

        
        setUsername("");
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        // navgate('/login');
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br/>
            
            
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
            

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
           

                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><br/>
         
            <button type="submit">Register</button>
        </form>
        </>  
    );
};

export default Registration;