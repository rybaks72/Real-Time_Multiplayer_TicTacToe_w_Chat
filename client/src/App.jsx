import { useState, useEffect } from 'react'
import 'stream-chat-react/dist/css/v2/index.css';
import './App.css'
import './components/Chat.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {StreamChat} from "stream-chat"
import Cookies from "universal-cookie"
import {Chat} from "stream-chat-react"
import JoinGame from "./components/JoinGame"

function App() {
  const api_key = import.meta.env.VITE_STREAM_API_KEY;
  const cookies = new Cookies;
  //const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(!!cookies.get('token'));

  const logOut = async () => {
    try {
      client.disconnectUser();
    } catch(error) {

    }
    const options = {path: '/'};
    ["token", "userId", "firstName", "lastName", "email", "username", "hashedPassword"].forEach(name => cookies.remove(name, options));
    // cookies.remove("token");
    // cookies.remove("userId");
    // cookies.remove("firstName");
    // cookies.remove("lastName");
    // cookies.remove("email");
    // cookies.remove("username");
    // cookies.remove("channelName") // ????
    setIsAuth(false);
  }

  useEffect(() => {
    if (!isAuth) return;

    const connect = async () => {
      await client.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          email: cookies.get("email"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        cookies.get("token")
      );
      console.log("Connected to Stream");
    };
    connect();
    return () => client.disconnectUser();
  }, [isAuth]);

  const [isLogin, SetIsLogin] = useState(true);

  return (
    <div className="main_body">
      {isAuth ? (
        <div className='main_body_joinGame'>
          <Chat client={client}/*allows us to grab the client directly, when we are in the component that's wrapped by 'Chat'*/>
            <JoinGame/>
            <button onClick={logOut}>Log Out</button>
          </Chat>
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
