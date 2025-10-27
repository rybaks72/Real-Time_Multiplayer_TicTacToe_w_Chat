import { useState, useEffect } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {StreamChat} from "stream-chat"
import Cookies from "universal-cookie"

function App() {
  const api_key = import.meta.env.VITE_STREAM_API_KEY;
  const cookies = new Cookies;
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("email");
    cookies.remove("username");
    cookies.remove("channelName") // ????
    client.disconnectUser();
    setIsAuth(false);
  }

  useEffect(() => {
    if (!token) return;

    const connect = async () => {
      await client.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstname"),
          lastName: cookies.get("lastname"),
          email: cookies.get("email"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      ).then((user) => {
        setIsAuth(true);
      })
      console.log("Connected to Stream");
    };
    connect();
    return () => client.disconnectUser();
  }, [token]);

  const [isLogin, SetIsLogin] = useState(true);

  return (
    <div className="main_body">
      {isAuth ? (
        <div>
          <h1>GAME</h1>
          <button onClick={logOut}>Log Out</button>
        </div>
      ):(
        isLogin ? (
          <div className='main_body_login'>
            <Login setIsAuth={setIsAuth}/>
            <button onClick={() => SetIsLogin(false)}>I don't have an account</button>
          </div>
        ):(
          <div className='main_body_signup'>
            <SignUp setIsAuth={setIsAuth}/>
            <button onClick={() => SetIsLogin(true)}>I have an account</button>
          </div>
        )
      )}
    </div>
  );
}

export default App
