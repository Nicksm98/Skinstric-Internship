'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const AiCamera = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [responseData, setResponseData] = useState(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const photoRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
          }
        })
        .catch(err => {
          console.error('Error accessing camera: ', err)
        })
    }
  }, [isLoading])

  const takePhoto = () => {
    if (videoRef.current && photoRef.current) {
      const width = videoRef.current.videoWidth
      const height = videoRef.current.videoHeight
      photoRef.current.width = width
      photoRef.current.height = height
      const ctx = photoRef.current.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        setHasPhoto(true)
        sendPhoto()
      }
    }
  }

  const sendPhoto = async () => {
    if (photoRef.current) {
      const base64String = photoRef.current.toDataURL('image/png')

      try {
        const response = await fetch(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64String })
          }
        )

        if (response.ok) {
          const data = await response.json()
          console.log('Results:', data)

          localStorage.setItem('apiResponse', JSON.stringify(data))
          console.log('Stored in localStorage:', localStorage.getItem('apiResponse'))

          setResponseData(data)
        } else {
          const errorData = await response.json()
          console.error('Error uploading file:', errorData)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleProceed = () => {
    if (responseData) {
      const queryString = `?race=${JSON.stringify(responseData.race)}&age=${JSON.stringify(responseData.age)}&sex=${JSON.stringify(responseData.sex)}`
      router.push(`/analysis/demographics${queryString}`)
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen w-screen flex flex-col'>
        <main className='flex-grow flex items-center justify-center text-black'>
          <div className='relative box-container h-[500px] w-[500px] flex items-center justify-center'>
            <div className='absolute box box-3 flex items-center justify-center'>
              <div className='absolute box box-2 flex items-center justify-center'>
                <div className='absolute box box-1 flex items-center justify-center'>
                  <img src='/assets/camera-icon.png' alt='' />
                </div>
              </div>
            </div>
            <div className='absolute bottom-[25%] font-semibold text-[16px]'>
              SETTING UP CAMERA ...
            </div>
          </div>
          <div className='absolute flex flex-col items-center text-center bottom-[15%] text-black w-screen'>
            <div className='mb-4'>TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
            <div className='flex'>
              <div className='flex items-center text-black'>
                <img className='h-3 w-3 mr-2' src='/assets/blkbox.png' alt='' />
                <div className=''>NEUTRAL EXPRESSION</div>
              </div>
              <div className='flex ml-6 mr-6 items-center text-black'>
                <img className='h-3 w-3 mr-2' src='/assets/blkbox.png' alt='' />
                <div className=''>FRONTAL POSE</div>
              </div>
              <div className='flex items-center text-black'>
                <img className='h-3 w-3 mr-2' src='/assets/blkbox.png' alt='' />
                <div className=''>ADEQUATE LIGHTNING</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      <div className='absolute flex items-center right-[24px] bottom-[50%] z-10'>
        <div className='text-white mr-5 font-semibold'>TAKE PICTURE</div>
        <button
          onClick={takePhoto}
          className='mr-4px text-white cursor-pointer'
        >
          <img src='/assets/camera.png' alt='' />
        </button>
      </div>
      <div className='absolute flex flex-col items-center text-center bottom-[5%] text-[#FCFCFC] w-screen z-10'>
        <div className='mb-4'>TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
        <div className='flex'>
          <div className='flex items-center text-white'>
            <img className='h-3 w-3 mr-2' src='/assets/box.png' alt='' />
            <div className=''>NEUTRAL EXPRESSION</div>
          </div>
          <div className='flex ml-6 mr-6 items-center text-white'>
            <img className='h-3 w-3 mr-2' src='/assets/box.png' alt='' />
            <div className=''>FRONTAL POSE</div>
          </div>
          <div className='flex items-center text-white'>
            <img className='h-3 w-3 mr-2' src='/assets/box.png' alt='' />
            <div className=''>ADEQUATE LIGHTNING</div>
          </div>
        </div>
      </div>
      <video
        ref={videoRef}
        className={`w-screen h-screen object-cover ${hasPhoto ? 'hidden' : ''}`}
        autoPlay
        playsInline
      />
      <canvas
        ref={photoRef}
        className={`w-screen h-screen object-cover ${hasPhoto ? '' : 'hidden'}`}
      />
      <div className='left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center z-10'>
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
      {hasPhoto && (
        <div className='right-btn absolute right-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='right-btn mr-7 text-sm tracking-wide'>PROCEED</div>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/analysis/demographics'>
                <Button className='right-btn bg-transparent hover:bg-transparent rotate-135' onClick={handleProceed}>
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiCamera