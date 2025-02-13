import { Lightbulb, LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({mockQuestions,activeQuestionIndex}) {
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry your browser does not support text to speech!')
    }
  }
  return mockQuestions&&(
    <div className='p-5 border rounded-lg my-10'>
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> {mockQuestions&&mockQuestions.map((question,index)=>(
            <h2  key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-xs font-semibold text-center cursor pointer ${activeQuestionIndex==index&& 'bg-blue-600 text-white'}`}>Question {index+1}</h2>
            
        ))}
        
        </div>
        <h2 className='my-5 text-md md:text-md font-semibold'>{mockQuestions[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer mb-3' onClick={()=>textToSpeech(mockQuestions[activeQuestionIndex]?.question)}/>
        <div className='border rounded-lg p-5 bg-blue-300 mt-15'>
            <h2 className='flex gap-2 items-center text-blue-800'>
                <LightbulbIcon/>
                <strong>Note:</strong> 
            </h2>
            <h2 className='text-sm text-blue-700 my-2'> Click on record when you are ready to answer the question.At the end of the interview you will receive feedback on your answers along with expected answers for each question for your performance analysis.</h2>
        </div>
    </div>
  )
}

export default QuestionSection