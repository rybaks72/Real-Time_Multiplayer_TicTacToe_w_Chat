import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

function JoinGame() {
    const [rivalUsername, setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const {client} = useChatContext();
    const createChannel = async () => {
        const response = await client.queryUsers({name: { $eq: rivalUsername }}); //"i wanna query the user with the username equal to rivalUsername"
        if(response.users.length === 0) {
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {members: [client.user?.id, response.users[0].id]}) //check out the types of channels
        await newChannel.watch(); //when you want to listen to data from a channel
        setChannel(newChannel);
    }
    return(
        <>
            {channel ? (
                <div>
                    <Channel channel={channel}>
                        <Game channel={channel} setChannel={setChannel}/>
                    </Channel>
                </div>
            ) : (
                <div className="joinGame">
                    <label>Create or Join a Game</label>
                    <input placeholder="Username of your rival..." onChange={e => setRivalUsername(e.target.value)}/>
                    <button onClick={createChannel}>Join/Start Game</button>
                </div>
            )}
        </>
    );
}

export default JoinGame;