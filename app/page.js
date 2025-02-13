
"use client"
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export default function Home() {
  const router = useRouter();

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center min-h-screen bg-purple-400 text-center p-6">
      
      <main className="max-w-2xl bg-white shadow-lg rounded-2xl p-8 mt-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to AI Mock Interview Platform</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your one stop destination for all your interview preparation
        </p>
        <Button className="px-6 py-3 text-lg" onClick={() => router.push('/dashboard')}>
          Sign Up Now
        </Button>
      </main>
    </div>
    </>
  );
}
