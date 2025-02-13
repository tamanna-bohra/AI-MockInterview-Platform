"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import { use } from "react";
import Link from 'next/link'
function Interview({params}) {
const [interviewData,setInterviewData]=useState();
const [webCamEnabled,setWebCamEnabled]=useState(false);
const { interviewId } = use(params);
    useEffect(()=>{
        console.log(params);
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,interviewId ))
       
        setInterviewData(result[0]);
       
    }
  return (
    <div className='my-10 '>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 mt-20 gap-5 '>
        <div className='flex flex-col gap-5 p-5 rounded-lg border'>
        {interviewData ? (
                    <>
                        <h2 className="text-lg"><strong>Job Role: </strong>{interviewData.jobPosition}</h2>
                        <h2 className="text-lg"><strong>Job Description/Tech Stack: </strong>{interviewData.jobDesc}</h2>
                        <h2 className="text-lg"><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
                    </>
                ) : (
                    <p>Loading interview details...</p>
                )}</div>
                <div className='p-5 border rounded-lg border-blue-500 bg-blue-200'>
                <h2 className='flex gap-2 items-center text-blue-800'><Lightbulb /><strong>Information</strong></h2>
                <h2 className='mt-3 text-blue-600'> Enable your webcam and microphone before starting the interview to get the best experience.The interview comprises of 5 question an you'll get 3 minutes to answer each question.NOTE: We will not keep your recorded video.</h2>
                </div>
        </div>
        <div>
            {webCamEnabled?<Webcam onUserMedia={()=>setWebCamEnabled(true)} onUserMediaError={()=>setWebCamEnabled(false)} mirrored={true} style={{
                height:300,
                weight:300,
                
            }}/>:
            <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
            <Button variant='ghost' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
}   
        </div>
        </div>
        
        <div className='flex justify-end items-end'><Link href={'/dashboard/interview/'+interviewId+'/start'}><Button disabled={!webCamEnabled}>Start Interview</Button></Link></div>
        
        
    </div>
  )
}

export default Interview