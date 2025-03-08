'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AiCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
            console.log('Camera feed started')
            setTimeout(() => setLoading(false), 3000) // Simulate loading for 3 seconds
          }
        }
      } catch (err) {
        console.error('Error accessing camera: ', err)
        setLoading(false)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className='min-h-screen w-screen flex flex-col'>
      <main className='flex-grow flex flex-col items-center justify-center bg-white text-black relative'>
        {loading ? (
          <div className='box-container h-[550px] w-[550px] flex items-center justify-center'>
            <div className='absolute font-semibold text-[16px]' style={{ bottom: '34%' }}>SETTING UP CAMERA ...</div>
          </div>
        ) : (
          <video ref={videoRef} className='w-full h-full object-cover' autoPlay playsInline />
        )}
        <div className='left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/introduction/photo'>
                <Button className='left-btn bg-transparent hover:bg-transparent -rotate-45'>
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                </Button>
              </Link>
            </div>
          </div>
          <div className='left-btn ml-7 text-sm tracking-wide'>BACK</div>
        </div>
      </main>
    </div>
  )
}

export default AiCamera