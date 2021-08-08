import React from 'react'
import './ChatRoom.scss'
import ChatBubble from 'react-chat-bubble';

const messages = [
    {
        "type" : 1,
        "image": "https://assets.vogue.com/photos/5891552b23f9887c0e0e060d/master/pass/01-holding-yara-shahidi.jpg",
        "text": "Hello! Good Morning Sam!"
    }, 
    {
        "type": 0,
        "image": "https://avatars.githubusercontent.com/u/20152051?v=4",
        "text": "Hi Yara, Good morning!"
    }
];

export default function ChatRoom () {
    return (
        <div className="chat-room">
            <ChatBubble messages={messages}/>
        </div>
    )
}