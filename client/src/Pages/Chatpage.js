import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Chatpage = () => {

    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        let { data } = await axios.get('/api/chat')
        data = await JSON.stringify(data)
        data = await JSON.parse(data)
        setChats(data)
    }

    //useEffect hook
    useEffect(() => {
        fetchChats()
    }, [])

    return <div> {chats.map((chat) => {
        return <div key={chat._id}>{chat.chatName}</div>
    })}</div>

}

export default Chatpage