"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { db } from '@/utils/db';
function RecordAnswerSection({mockQuestions,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer]=useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>(
          setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
          stopSpeechToText()
          if(userAnswer?.length<10)
            {
            setLoading(false);
            toast('Error while saving your answer, Please record again')
            return;
          }
          
        else{
          startSpeechToText()
        }
      }
    }
      const UpdateUserAnswer=async()=>{
        console.log(userAnswer);
        setLoading(true);
        const feedbackPrompt="Question:"+mockQuestions[activeQuestionIndex]?.question+", User Answer:"+userAnswer+", Depending on the interview question and user's answer given here please give us rating for answer and feedback as area of improvement or what they could have added to their answer to make it efficient if any .give in just 3 to 5 lines in json format with rating field and feedback field" 
          const result=await chatSession.sendMessage(feedbackPrompt);
          const mockFeedbackResp=(result.response.text()).replace('```json','').replace('```','');
          console.log(mockFeedbackResp);
          const JsonFeedbackResp=JSON.parse(mockFeedbackResp);
          console.log("Extracted Feedback:", JsonFeedbackResp.feedback);
console.log("Type of Feedback:", typeof JsonFeedbackResp.feedback);
console.log("Feedback Length:", JsonFeedbackResp.feedback?.length);

          const resp=await db.insert(UserAnswer)
          .values({
            mockIdRef:interviewData?.mockId,
            question:mockQuestions[activeQuestionIndex]?.question,
            correctAns:mockQuestions[activeQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:String(JsonFeedbackResp.feedback),
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress,
            createdAt:moment().format('DD-MM-yyyy')
          })
          if(resp){
            
            toast('User Answer Recorded Successfully!');
            setUserAnswer('');
            setResults([]);
          }
          setResults([]);
          setLoading(false);
        }
      

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col justify-center items-center mt-20 p-5 bg-gray-400 rounded-lg'>
        <Image src={'/webcam.png'} width={150} height={150} className='absolute' alt='record'/>
        <Webcam mirrored={true} style={{height:250,width:'100%',zIndex:10}}/>
    </div>
    <Button
    disabled={loading}
    variant='outline' className='mt-10' 
    onClick={isRecording?stopSpeechToText:startSpeechToText} >
      {isRecording?<h2 className='text-red-600 animate-pulse flex gap-2 items-center'><StopCircle/>Stop Recording</h2>:
      <h2 className='text-blue-500 flex gap-2 items-center'>Record Answer</h2>}</Button>
    
      <Button className='mt-5' onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
    </div>
  )
}

export default RecordAnswerSection