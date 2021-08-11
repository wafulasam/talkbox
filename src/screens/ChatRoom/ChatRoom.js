import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ChatRoom.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ChatBubble from 'react-chat-bubble';
import { chats } from '../../messages';
import { ReactComponent as BackButton } from '../../assets/icons/back-button.svg';
import { ReactComponent as Microphone } from '../../assets/icons/microphone.svg';
import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';

// integration
import { getTokenOrRefresh } from '../../utils/token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

export default function ChatRoom () {
    const [ messages, setMessages ] = useState(chats);
    const [ listening, setListening ] = useState(false);
    const [ showTextBox, setShowTextBox ] = useState(false);
    const [ displayText, setDisplayText ] = useState('');
    const [ uneditedText, setUneditedText ] = useState('');

    // =========== azure integration  logic ===============
    useEffect(()=> {

        // check for valid speech key/region
        async function tokenValidation () {
            const tokenRes = await getTokenOrRefresh();
            if (tokenRes.authToken === null) {
                setDisplayText('FATAL_ERROR: ' + tokenRes.error);
            }
        }
        tokenValidation();
    })

    async function getVoiceFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setDisplayText('Speak into your microphone...');

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `✅ ${result.text}`
            } else {
                displayText = '🛑 Speech not recognized. Ensure your microphone is working properly.';
            }

            setDisplayText(displayText);
        });
    }

    async function fileChange (event) {
        const audioFile = event.target.files[0];
        console.log(audioFile);
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;
        setDisplayText(fileInfo)

        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech not recognized. Ensure your microphone is working properly.';
            }

            setDisplayText(fileInfo + displayText)
        });
    }

    // ============ end azure integration logic =============

    const startListening = () => {
        setListening(true)
        getVoiceFromMic()
    }

    const stopListening = () => {
        setListening(false)
        setUneditedText(displayText);
        setShowTextBox(true)
    }

    const sendMessage = () => {
        const payload = {
            type: 0,
            image: "https://avatars.githubusercontent.com/u/20152051?v=4",
            text: uneditedText.substring(1) // .substring is used to remove the ✅ or 🛑 from the sent message, since they area just used as indictators
        }

        // if the message input is empty append null to the bubble
        if(uneditedText<1 || uneditedText === "🛑 Speech not recognized. Ensure your microphone is working properly."){
            setShowTextBox(false);
        } else {
            setMessages([...messages, payload])
            setDisplayText('')
            setShowTextBox(false)
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
                <textarea
                    type="text"
                    className="voice-input"
                    style={listening ||  showTextBox ? {display:'block'} : {display:'none'}}
                    onChange={(e)=> {setDisplayText(e.target.value); setUneditedText(e.target.value)}} // we are updating both display text and unedited text
                    value={displayText}
                />

                {listening || showTextBox ? 
                    <SendIcon 
                        className="send"
                        onClick={sendMessage}
                        disabled
                    /> :
                    null
                }

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

                <input 
                    type="file" 
                    id="audio-file" 
                    onChange={fileChange} 
                    style={{display: "none"}} 
                />
            </Footer>
        </div>
    )
}