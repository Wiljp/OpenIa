import { useState } from 'react'
import { MyMessage, TypingLoader, TextMessageBox } from '../components';
import GptMessage from '../components/chat-bubbles/GptMessage';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [mesages, setMesages] = useState<Message[]>([])

  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMesages( (previus) => [...previus, { text: text, isGpt: false }] );

    setIsLoading(false);

  }

  return (
    <div className='chat-container'>
        <div className='chat-messages'>
            <div className='grid grid-cols-12 gap-y-2'>
                {/* Bienvenida */}
                <GptMessage text='Bienvenido :)' />

                {/* <MyMessage text='Hola Mundo' /> */}

                {
                  mesages.map( (message, index) => (
                    message.isGpt
                      ? <GptMessage key={ index } text='Esto es de OpenAI' />
                      : <MyMessage key={ index } text={ message.text } />
                  ))
                }

                {
                  isLoading && (
                    <div className='col-start-1 col-end-12 fade-in'>
                        <TypingLoader/>
                    </div>
                  ) 
                }

            </div>
        </div>

        <TextMessageBox
          onSendMessage={ handlePost }
          placeholder='Escribe aquí el texto'
          disableCorrections
        />
    </div>
  )
}
