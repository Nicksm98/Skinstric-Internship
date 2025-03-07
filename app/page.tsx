'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import UploadModal from '@/components/modal/uploadmodal'

const Photo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setIsUploaded(false)
    setError('')
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first')
      return
    }

    setIsLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
        {
          method: 'POST',
          body: formData
        }
      )

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='h-16 pt-[16px] flex flex-col gap-8 px-8'>
        <div className='flex items-center gap-4'>
          <Link href='/introduction'>
            <p className='font-semibold text-[14px] tracking-wide'>SKINSTRIC</p>
          </Link>
          <div className='flex items-center text-[17px] tracking-widest'>
            [<p className='px-2 text-sm tracking-tighter'>INTRO</p>]
          </div>
        </div>
      </header>
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
          <Link className='absolute hover:scale-90 cursor-pointer transition-transform duration-300' href='/analysis/aicamera'>
            <img
              className='h-[120px] w-[120px] object-contain cursor-pointer'
              src='/assets/camera-icon.png'
              alt='Camera Icon'
            />
          </Link>
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
          <button
            className='absolute cursor-pointer z-1000 transition-transform duration-300 hover:scale-90'
            onClick={() => setIsModalOpen(true)}
          >
            <img
              className='h-[120px] w-[120px] object-contain z-10 cursor-pointer'
              src='/assets/gallery.png'
              alt='Gallery Icon'
            />
          </button>
          <div className='absolute' style={{ bottom: '34%', right: '57%' }}>
            <div style={{ transform: 'rotate(-45deg)' }}>
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
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center transition-transform duration-300 hover:scale-90'>
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
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center transition-transform duration-300 hover:scale-90'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Button
                className='right-btn bg-transparent hover:bg-transparent rotate-135'
                onClick={handleUpload}
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? (
                  <div className='spinner'></div> // Add a loading spinner component
                ) : (
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                )}
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
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}

export default Photo