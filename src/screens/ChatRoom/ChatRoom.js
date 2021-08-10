import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ChatRoom.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ChatBubble from 'react-chat-bubble';
import { chats } from '../../messages';
import { ReactComponent as BackButton } from '../../assets/icons/back-button.svg';
import { ReactComponent as Microphone } from '../../assets/icons/microphone.svg';

export default function ChatRoom () {
    const [ messages, setMessages ] = useState(chats);
    const [ listening, setListening ] = useState(false);
    const [ activeMessage, setActiveMessage ] = useState([]);

    const startListening = () => {
        setListening(true)
    }

    const stopListening = () => {
        setListening(false)

        const payload = {
            type: 0,
            image: "https://avatars.githubusercontent.com/u/20152051?v=4",
            text: activeMessage
        }

        // if the message input is empty append null to the bubble
        if(activeMessage<1){
            return null
        } else {
            setMessages([...messages, payload])
        }
    }

    const createMessage = () => null; // avoiding default props error
    return (
        <div className="chat-room">
            <Header>
                <div className="top">
                    <Link to='/'><BackButton className="back-button"/></Link>
                    <span className="title"><b>Yara S</b></span>
                    <img src="https://www.stylevore.com/wp-content/uploads/2019/04/avatar-155445160702l46-150x150.jpg" alt="" height="40" className="avatar"/>
                </div>
            </Header>
            <ChatBubble messages={messages} onNewMessage={createMessage}/>
            <Footer>
                <input
                    type="text"
                    placeholder="Speak your message, listening..."
                    className="voice-input"
                    style={listening ? {display:'block'} : {display:'none'}}
                    onChange={(e)=> setActiveMessage(e.target.value)}
                />
                {listening ? 
                    <Microphone 
                        className="microphone"
                        style={{ background: 'red' }}
                        onClick={stopListening}
                    /> :
                    <Microphone 
                        className="microphone"
                        style={{ background: '#0e7fff' }}
                        onClick={startListening}
                    />
                }
            </Footer>
        </div>
    )
}