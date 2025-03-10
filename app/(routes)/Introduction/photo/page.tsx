'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import UploadModal from '@/components/modal/uploadmodal'
import CameraModal from '@/components/modal/cameramodal'
import { Button } from '@/components/ui/button'

const Photo = () => {
  const [, setSelectedFile] = useState<File | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false)
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
  const router = useRouter()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setIsPhotoUploaded(true)
    setIsUploadModalOpen(false)
    console.log('Selected file:', file)
  }

  const handleProceed = () => {
    router.push('/analysis/demographics')
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='h-16 pt-[16px] flex flex-col gap-8 px-8'>
        <div className='flex items-center gap-4'>
          <Link href='/'>
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
          <button
           className='absolute hover:scale-90 cursor-pointer transition-transform duration-300'
           onClick={() => setIsCameraModalOpen(true)}
           >
            <img
              className='h-[120px] w-[120px] object-contain cursor-pointer'
              src='/assets/camera-icon.png'
              alt='Camera Icon'
            />
          </button>
          <div className='absolute' style={{ top: '17%', left: '57%' }}>
            <div
              className='flex flex-row-reverse'
              style={{ transform: 'rotate(-45deg)' }}
            >
              <div
                className='w-[150px] mt-[35px] ml-[-20px]'
                style={{ transform: 'rotate(45deg)' }}
              >
                ALLOW A.I. <br /> TO SCAN <br /> YOUR FACE
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
            onClick={() => setIsUploadModalOpen(true)}
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
            style={{ bottom: '12%', right: '81%' }}
          >
            ALLOW A.I.
            <br />
            ACCESS TO
            <br />
            GALLERY
          </div>
        </div>
      </div>
      <CameraModal 
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
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
        {isPhotoUploaded && (
          <div className='right-btn absolute right-[32px] bottom-[40px] flex items-center justify-center'>
            <div className='right-btn mr-7 text-sm tracking-wide'>PROCEED</div>
            <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
              <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
                  <Button className='right-btn bg-transparent hover:bg-transparent rotate-135' onClick={handleProceed}>
                    <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                  </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Photo