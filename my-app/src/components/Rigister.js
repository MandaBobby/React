import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Button from 'react-bootstrap/Button';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Admins, setAdmins] = useState([]);
    const [Users, setUsers] = useState([]);
    const [panel, setPanel] = useState('None');
    const navigate=useNavigate();

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem("Users")) || []);
        setAdmins(JSON.parse(localStorage.getItem("Admins")) || []);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let match;
        if (panel === 'Admin') {
            match = Admins.find(admin => admin.email === email);
            if(Users.find(user=>user.email==email)){
                alert("already email existed as a user")
                return
            }
        } 
        else if (panel === 'User') {
            match = Users.find(user => user.email === email);
            if(Admins.find(admin => admin.email === email)){
                alert("already email existed as a admin")
                return
            }
        }

        if (match) {
            alert('Email already exists');
            return;
        }

        
        if(panel=='None'){
            alert("pleace select panel correctly")
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

       

        const newUser = { username, email, password };

        if (panel === 'User') {
            Users.push(newUser)
            localStorage.setItem('Users', JSON.stringify(Users));
            navigate('/login')
       
        } else if (panel === 'Admin') {
            Admins.push(newUser)
            localStorage.setItem('Admins', JSON.stringify(Admins));
            navigate('/login')
        }
     
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 align='center'>Rigister form</h1>
              <table align='center'>
                <br/>
                <tr>
                    <td>Username</td>
                    <td>:</td>
                    <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></td>
                </tr>
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
                <tr>
                    <td>Confirm Password</td>
                    <td>:</td>
                    <td> <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></td>
                </tr>
                <tr>
                    <td>Panel</td>
                    <td>:</td>
                    <td>
                    <select value={panel} onChange={(e) => setPanel(e.target.value)}>
                    <option value=''>None</option>   
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    </select>
                    </td>
                </tr>
     
              </table>
              <br/>
              <center>  <Button  variant='primary' type="submit">Register</Button></center>
            </form>
        </>
    );
};

export default Register;
