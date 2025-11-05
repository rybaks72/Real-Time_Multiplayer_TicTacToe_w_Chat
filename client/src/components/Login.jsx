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
            const options = {path: '/'};
            cookies.set("token", token, options);
            cookies.set("userId", userId, options);
            cookies.set("firstName", firstName, options);
            cookies.set("lastName", lastName, options);
            cookies.set("email", email, options);
            cookies.set("username", username, options);
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