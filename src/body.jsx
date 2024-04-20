import React, { useState, useRef, useEffect } from 'react'
import OpenAI from '/openai'
import english from './imgs/america.png'
import spanish from './imgs/spain.png'
import french from './imgs/france.png'
import korean from './imgs/korea.png'
import chinese from './imgs/china.png'
import japanese from './imgs/japan.png'
import arrow from './imgs/arrow-right-solid.svg'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true
});

const generatePrompt = (text, language) => {
  switch (language) {
    case 'English':
      return `Translate the following text to English: ${text}`
    case 'Spanish':
      return `Translate the following text to Spanish: ${text}`
    case 'French':
      return `Translate the following text to French: ${text}`
    case 'Korean':
        return `Translate the following text to Korean and romanize it and nothing else: ${text}`
    case 'Chinese':
      return `Translate the following text to Chinese (Mandarin) and show pinyin and nothing else: ${text}`
    case 'Japanese':
      return `Translate the following text to Japanese and show Romaji and nothing else: ${text}`;
    default:
      return text;
  }
};

export default function Body() {
  const [inputText, setInputText] = useState('')
  const [conversation, setConversation] = useState([])
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const handleTranslation = async (language) => {
    if (!inputText.trim()) return;

    try {
      const prompt = generatePrompt(inputText, language);

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-2024-04-09",
        messages: [
          {
            "role": "system",
            "content": prompt
          },
          {
            "role": "user",
            "content": inputText
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const translation = response.choices[0].message.content.trim();
      const translatedMessage = { text: translation, sender: 'bot' };

      setConversation(prev => [...prev, translatedMessage]);
    } catch (error) {
      console.error('Error translating message:', error);
    }

    setInputText('');
};
  
  const handleLanguageSelection = (language) => {
    setCurrentLanguage(language);
  };

  const handleButtonClick = (language) => {
    handleLanguageSelection(language);
  };

  const getButtonClass = (language) => {
    return `language-btn ${currentLanguage === language ? 'selected' : ''}`;
  };

  const handleInput = (event) => {
      setInputText(event.target.value)
    }

  const handleSend = () => {
    if (inputText.trim() && currentLanguage) {
      const newMessage = { text: inputText, sender: 'user' };
      setConversation([...conversation, newMessage]);
      handleTranslation(currentLanguage);
      setInputText('');
    }
  };

  return (
    <div className="body">
      <p className="chat-bubbles bot-text">Select the language you want me to translate below, type your text and hit send!</p>
      <div className="conversation">
            {conversation.map((message, index) => (
                <div key={index} className={`message ${message.sender === 'user' ? 'user-text' : 'bot-text'} chat-bubbles`}>
                    <p className= "message-text">{message.text}</p>
                </div>
            ))}
      <div ref={endOfMessagesRef}></div>
      </div>

      <div className="input-field-container">
        <input
            type="text"
            className="input"
            value={inputText}
            onChange={handleInput}
            onKeyPress={event => {
                if (event.key === 'Enter') {
                    handleSend();
                }
            }}
        />
        <img
            src={arrow}
            alt="Send Button"
            className="arrow"
            onClick={handleSend}
        />
      </div>

      <div className="buttons">
          <button className = {getButtonClass('English')} onClick={() => handleLanguageSelection('English')}>
            <img src={english} alt="American Flag" className="language-img"/>
          </button>
          <button className =  {getButtonClass('Spanish')} onClick={() => handleLanguageSelection('Spanish')}>
            <img src={spanish} alt="Spanish Flag" className="language-img"/>
          </button>
          <button className =  {getButtonClass('French')} onClick={() => handleLanguageSelection('French')}>
            <img src={french} alt="French Flag" className="language-img"/>
          </button>
          <button className = {getButtonClass('Korean')} onClick={() => handleLanguageSelection('Korean')}>
            <img src={korean} alt="Korean Flag" className="language-img"/>
          </button>
          <button className =  {getButtonClass('Chinese')} onClick={() => handleLanguageSelection('Chinese')}>
            <img src={chinese} alt="Chinese Flag" className="language-img"/>
          </button>
          <button className =  {getButtonClass('Japanese')} onClick={() => handleLanguageSelection('Japanese')}>
            <img src={japanese} alt="Japanese Flag" className="language-img"/>
          </button>
      </div>
      {currentLanguage && <p className="translation-notice">Currently translating to: {currentLanguage}</p>}
  </div>
  )
}
