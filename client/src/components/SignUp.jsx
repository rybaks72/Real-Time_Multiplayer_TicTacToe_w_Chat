import React, {useState} from "react";
import '../App.css'
import Axios from "axios";
import Cookies from "universal-cookie"

function SignUp({setIsAuth}) {
    const cookies = new Cookies;
    const [user, SetUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "" });

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then(res => {
            const {token, userId, firstName, lastName, email, username, hashedPassword} = res.data;
            const options = {path: '/'};
            cookies.set("token", token, options);
            cookies.set("userId", userId, options);
            cookies.set("firstName", firstName, options);
            cookies.set("lastName", lastName, options);
            cookies.set("email", email, options);
            cookies.set("username", username, options);
            cookies.set("hashedPassword", hashedPassword, options);
            setIsAuth(true);
        })
        // }).then(() => {
        //     console.log("Signup successful");
        //     window.location.reload();
        // })
    }
    return (
        <div className="signup">
            <label>Sign Up</label>
            <input placeholder="First Name" onChange={e => SetUser({...user, firstName: e.target.value})}/>
            <input placeholder="Last Name" onChange={e => SetUser({...user, lastName: e.target.value})}/>
            <input placeholder="E-mail Address" onChange={e => SetUser({...user, email: e.target.value})}/>
            <input placeholder="Username" onChange={e => SetUser({...user, username: e.target.value})}/>
            <input placeholder="Password" type="password" onChange={e => SetUser({...user, password: e.target.value})}/>
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;