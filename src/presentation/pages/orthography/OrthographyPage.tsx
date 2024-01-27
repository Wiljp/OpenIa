import { useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage';
import { MyMessage, TextMessageBox, TypingLoader } from '../../components';
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMessages( (previus) => [...previus, { text: text, isGpt: false }] );

    const { ok, errors, messagge, userScore } = await orthographyUseCase(text);
    
    if ( !ok ) {
        setMessages( (prev) => [...prev, { text: 'No se pudo realizar la correción', isGpt: true }] );
    }else{
      setMessages( (prev) => [...prev, { text: messagge, isGpt: true }] );
    }

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

        {/* <TextMessageBoxFile
          onSendMessage={ handlePost }
          placeholder='Escribe aquí el texto'
        /> */}

        {/* <TextMessageBoxSelect 
          onSendMessage={ console.log }
          options={ [ {id:"1", text:"Hola"}, {id:"1", text:"Mundo"}] } 
        /> */}
    </div>
  )
}
