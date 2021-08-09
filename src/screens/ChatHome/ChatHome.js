import React from 'react'
import { Link } from 'react-router-dom'
import './ChatHome.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'; 
import { messages } from '../../messages';
import Logo from '../../assets/images/logo.png';
import { ReactComponent as Phone } from '../../assets/icons/telephone.svg';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Bell } from '../../assets/icons/bell.svg';

const ChatBox = ({ image, name, message, time }) => {
    return (
        <Link to='/chat-room' className="link">
            <div className="chat-box">
                <div className="image-holder">
                    <img src={image} alt="" height="40"/>
                </div>
                <div className="content">
                    <span>{time}</span>
                    <b>{name}</b>
                    <p>{message}</p>
                </div>
            </div>
        </Link>
    )
}

export default function ChatHome () {
    return (
        <div className="chat-home">
            <Header>
                <img src={Logo} alt="" height="50" className="logo"/>
                <span className="title"><b>Talkbox</b></span>
                <img src="https://avatars.githubusercontent.com/u/20152051?v=4" alt="" height="40" className="avatar"/>
            </Header>
            {messages.map(message => (
                <div  key={message.id}>
                    <ChatBox
                        image={message.image}
                        name={message.name}
                        message={message.text}
                        time={message.time}
                    />
                </div>
            ))}
            <Footer>
                <Phone className="phone"/>
                <Home className="home"/>
                <Bell className="bell"/>
            </Footer>
        </div>
    )
}