import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Typography, TextField, Button} from '@mui/material';

export default function LoginComponent () {

    const[username, setUsername] =React.useState('')
    const[password, setPassword] =React.useState('')
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            var response = await axios.post('http://localhost:3002/', {
                username: username,
                password: password
            })
            if(response.data) {
                await localStorage.setItem("token", response.data)
                navigate('/product');
            }
        }catch(err) {
            console.log(err)
        }
    }
    return(
        <div style={{margin:'5%'}}>
            <Typography variant="h4" component="div"> Login  </Typography> <br/> <br/>
            <form onSubmit={handleSubmit}>
                <div>
                    < TextField type="text" name="Username" label="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                </div> <br/>
                <div>
                    <TextField label="Password" type="password" name="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div> <br/>
                <Button variant="contained" type="submit" > Submit </Button>
            </form>
        </div>
    )
}