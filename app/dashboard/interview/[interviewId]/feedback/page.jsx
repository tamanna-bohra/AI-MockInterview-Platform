"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useParams } from 'next/navigation'
import React, { use,useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({params}) {
    const {interviewId}=use(params);
    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
      GetFeedback();
    },[])
    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,interviewId))
        .orderBy(UserAnswer.id)
        console.log(result);
        setFeedbackList(result)
    }
  return (
    <div className='p-10'>

{feedbackList?.length==0?
<h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>:
<><h2 className='text-2xl font-bold text-green-500'>Congratulations!</h2>
<h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
<h2 className='text-primary-foreground text-lg my-3'>Your overall Interview Rating:<strong></strong></h2>
<h2 className='text-sm text-gray-500'>Find below interview question with correct answer,review it for improvement</h2>
    {feedbackList&& feedbackList.map((item,index)=>(
      <Collapsible key={index} className='mt-7'>
      <CollapsibleTrigger className='p-2 bg-gray-200 flex justify-between rounded-lg my-2 text-left gap-10 w-full'>
      {item.question}<ChevronsUpDown className='h-10 w-10'/>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='flex flex-col gap-2'>
          <h2 className='text-red-500 p-2 border rounded-lg'>
            <strong>Rating : </strong>{item.rating}
          </h2>
          <h2 className='bg-red-200 text-sm p-2 border rounded-lg'>
            <strong>Your Answer : </strong>{item.userAns}
          </h2>
          <h2 className='bg-green-200 text-sm p-2 border rounded-lg'>
            <strong>Appropriate Answer : </strong>{item.correctAns}
          </h2>
          <h2 className='bg-blue-200 text-sm p-2 border rounded-lg'>
            <strong>Feedback : </strong>{item.feedback}
          </h2>
        </div>
      </CollapsibleContent>
    </Collapsible>
    
    ))}</>
  }
   <Button className="bg-blue-600 mt-8" onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback