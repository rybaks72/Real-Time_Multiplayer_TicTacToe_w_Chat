import React, {useState} from "react";
import '../App.css'
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({setIsAuth}) {
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');


    const cookies = new Cookies;
    const login = () => {
        Axios.post("http://localhost:3001/login", {username, password}).then(res => {
            const {firstName, lastName, email, username, token, userId} = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("email", email);
            cookies.set("username", username);
            setIsAuth(true);
        });
    };
    return (
        <div className="login">
            <label>Login</label>
            <input placeholder="Username" onChange={e => SetUsername(e.target.value)}/>
            <input placeholder="Password" type="password" onChange={e => SetPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;