'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UploadModal from '@/components/modal/uploadmodal'

const Photo = () => {
  const [, setSelectedFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    console.log('Selected file:', file)

    // Send the photo to the endpoint
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        // Store the results in localStorage
        localStorage.setItem('demographicsData', JSON.stringify(result))
        // Redirect to the demographics page
        router.push('/demographics')
      } else {
        console.error('Failed to upload the photo')
      }
    } catch (error) {
      console.error('Error uploading the photo:', error)
    }
  }

  useEffect(() => {
    console.log('Modal state:', isModalOpen)
  }, [isModalOpen])

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
          <Link
            className='absolute hover:scale-90 cursor-pointer transition-transform duration-300'
            href='/analysis/aicamera'
          >
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

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}

export default Phot