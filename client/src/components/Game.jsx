import React, {useState} from "react";
import './Chat.css';
import Board from "./Board";
import {Window, MessageList, MessageInput} from "stream-chat-react";

function Game({channel, setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner: "none", state: "none"})

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2)
    })
    if(!playersJoined){
        return (
            <div className="waiting">
                <label>Waiting for the other player to join</label>
            </div>
        );
    }

    return (
        <div className="gameContainerWrapper">
            {result.state === "won" && <div className="winnerMessage">{result.winner} Won The Game!</div>}
            {result.state === "tied" && <div className="winnerMessage">The Game is Tied!</div>}
            <div className="gameContainer">
                <Board result={result} setResult={setResult}/>
                <Window>
                    <MessageList 
                    disableDateSeparator 
                    closeReactionSelectorOnClick
                    messageActions={"react"}/>
                    <MessageInput noFiles/>
                </Window>
            </div>
            <button onClick={async () => {
                await channel.stopWatching()
                setChannel(null)
            }}>Leave Game</button>
        </div>
    );
}

export default Game;