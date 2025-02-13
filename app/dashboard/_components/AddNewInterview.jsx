"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChatSession } from '@google/generative-ai';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog,setDialog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExp,setJobExp]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();
    const router=useRouter();
    const onSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true);
        console.log(jobPosition,jobDesc,jobExp);
        
        const InputPrompt="Job role:"+jobPosition+", Job Description:"+jobDesc+" ,Years of Experience:"+jobExp+" , depending on this job information generate 5 interview questions with answers in the json format . Give the question and answer as json fields"
       
        const result=await chatSession.sendMessage(InputPrompt);
        const JsonMockResponse=result.response.text().replace('```json','').replace('```','')
        // console.log(JSON.parse(JsonMockResponse));
        setJsonResponse(JsonMockResponse)

        if(JsonMockResponse){
        const resp=await db.insert(MockInterview).values({
          mockId:uuidv4(),
          jsonMockResp:JsonMockResponse,
          jobDesc:jobDesc,
          jobPosition:jobPosition,
          jobExperience:jobExp,
          createdBy:user?.primaryEmailAddress.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})
        console.log("Inserted ID: ",resp);
        if(resp){
          setDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
      }
      else{
        console.log('ERROR');
      }
        setLoading(false);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=> setDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
  
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
      
      <DialogDescription>
      <div>
      <p>Add details about your job position/role,job description and years of experience </p>
        <form onSubmit={onSubmit}>
       
            <div className='mt-7 my-3'>
                <label className='font-semibold'>Job Role</label>
                <Input placeholder="Ex. Full Stack Developer" required onChange={(e)=>setJobPosition(e.target.value)}/>
            </div>
            <div className=' my-3'>
                <label className='font-semibold'>Job Description/Tech Stack</label>
                <Textarea placeholder="Type your description here." required onChange={(e)=>setJobDesc(e.target.value)}/>
            </div>
            <div className=' my-3'>
                <label className='font-semibold'>Years of Experience</label>
                <Input type='number' placeholder="Ex. 5" max="45" required onChange={(e)=>setJobExp(e.target.value)}/>
            </div>
        
        <div className='flex gap-5 justify-end mt-5'>
            <Button type="button" variant='ghost' onClick={()=>setDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading?<><LoaderCircle className='animate-spin'/>Generating Interview</>:'Start Interview'}
             </Button>
        </div>
        </form>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview