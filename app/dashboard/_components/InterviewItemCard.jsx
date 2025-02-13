import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter();
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-blue-600'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview.createdAt}</h2>
        <div className='flex justify-around mt-3 gap-5'>
            <Button onClick={()=>router.push('/dashboard/interview/'+interview?.mockId+'/feedback')} size='sm' variant='outline' className='w-full'>
               Feedback 
            </Button>
            <Button onClick={()=>router.push('/dashboard/interview/'+interview?.mockId)} size='sm' className='w-full'>
               Restart
            </Button>
        </div>
    </div>
  )
}

export default InterviewItemCard