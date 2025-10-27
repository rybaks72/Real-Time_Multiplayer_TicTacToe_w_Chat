import express from "express"
import cors from "cors"
import { StreamChat } from "stream-chat"
import {v4 as uuidv4} from "uuid"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config();

const app = express()

app.use(cors());
app.use(express.json()); // i need to see the explanation of this
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
//before you push make both api_key and _secret environment variables so you dont post my keys!!!
const serverClient = StreamChat.getInstance(api_key,api_secret)

app.post("/signup", async (req,res) => {
    try {
    const {firstName, lastName, email, username, password} = req.body
    const userId = uuidv4(); //generates a random, unique ID
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);

    await serverClient.upsertUser({
        id: userId,
        name: username,
        email,
        firstName,
        lastName,
        hashedPassword
    })
    res.json({token, userId, firstName, lastName, email, username, hashedPassword});
    }
    catch(error) {
        res.json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const {users} = await serverClient.queryUsers({name: username});
        if(users.length === 0) return res.json({message: "User not found"});

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

        if(passwordMatch) {
            res.json({
                token, 
                firstName: users[0].firstName, 
                lastName: users[0].lastName, 
                email: users[0].email, 
                username, 
                userId: users[0].id})
        }
    } catch(error) {
        res.json(error);
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

