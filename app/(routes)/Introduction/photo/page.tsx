'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Photo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setIsUploaded(false)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = async () => {
      const base64String = reader.result as string

      try {
        const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ file: base64String })
        })
        
        if (response.ok) {
          setIsUploaded(true)
          setError('')
        } else {
          const errorData = await response.json()
          console.error('Error uploading file:', errorData)
          setError('Error uploading file')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        setError('Error uploading file')
      }
    }
    reader.onerror = () => {
      setError('Error reading file')
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='pl-[32px] font-semibold text-[16px]'>
        TO START ANALYSIS
      </div>
      <div className='h-[100%] flex items-center justify-around bg-white text-black'>
        <div className='relative box-container h-[400px] w-[400px] flex items-center justify-center'>
          <div className='box box-3 flex items-center justify-center'>
            <div className='box box-2 flex items-center justify-center'>
              <div className='box box-1 flex items-center justify-center'></div>
            </div>
          </div>
          <input type='file' onChange={handleFileChange} className='absolute opacity-0 w-full h-full cursor-pointer' />
          <img
            className='absolute h-[120px] w-[120px] object-contain'
            src='/assets/camera-icon.png'
            alt='Camera Icon'
          />
          <div className='absolute' style={{ top: '17%', left: '57%' }}>
            <div
              className='flex flex-row-reverse'
              style={{ transform: 'rotate(-45deg)' }}
            >
              <div
                className='w-[150px] mt-[35px] ml-[-20px]'
                style={{ transform: 'rotate(45deg)' }}
              >
                ALLOW A.I. <br /> TO SCAN YOUR FACE
              </div>
              <div className='h-[1px] w-[100px] bg-black'></div>
            </div>
          </div>
        </div>
        <div className='relative box-container h-[400px] w-[400px] flex items-center justify-center'>
          <div className='box box-3 flex items-center justify-center'>
            <div className='box box-2 flex items-center justify-center'>
              <div className='box box-1 flex items-center justify-center'></div>
            </div>
          </div>
          <input type='file' onChange={handleFileChange} className='absolute opacity-0 w-full h-full cursor-pointer' />
          <img
            className='absolute h-[120px] w-[120px] object-contain'
            src='/assets/gallery.png'
            alt='Gallery Icon'
          />
          <div className='absolute' style={{ bottom: '34%', right: '57%' }}>
            <div className='' style={{ transform: 'rotate(-45deg)' }}>
              <div className='h-[1px] w-[100px] bg-black'></div>
            </div>
          </div>
          <div
            className='absolute w-[150px] text-right'
            style={{ bottom: '16%', right: '81%' }}
          >
            ALLOW A.I.
            <br />
            ACCESS GALLERY
          </div>
        </div>
        <div className='left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/introduction'>
                <Button className='left-btn bg-transparent hover:bg-transparent -rotate-45'>
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                </Button>
              </Link>
            </div>
          </div>
          <div className='left-btn ml-7 text-sm tracking-wide'>BACK</div>
        </div>
        <div className='right-btn absolute right-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='right-btn mr-7 text-sm tracking-wide'>PROCEED</div>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Button
                className='right-btn bg-transparent hover:bg-transparent rotate-135'
                onClick={handleUpload}
                disabled={!selectedFile || isUploaded}
              >
                <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
      {isUploaded && (
        <div className='absolute right-[32px] bottom-[40px] flex items-center justify-center'>
          <Link href='/analysis'>
            <Button className='right-btn bg-transparent hover:bg-transparent rotate-135'>
              <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Photo