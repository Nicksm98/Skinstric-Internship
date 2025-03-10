import Image from 'next/image'
import { useState, useRef } from 'react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onFileSelect: (file: File) => void
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFileSelect
}) => {
  const [, setSelectedFile] = useState<File | null>(null)
  const [, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('File size must be less than 4MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Invalid file type. Please select an image.')
        return
      }
      setSelectedFile(file)
      setError('')
      onFileSelect(file)
      await handleUpload(file)
    }
  }

  const handleUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string

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
          const responseData = await response.json()
          onFileSelect(file)
          console.log('Results:', responseData)

          localStorage.setItem('apiResponse', JSON.stringify(responseData))
          console.log('Stored in localStorage:', localStorage.getItem('apiResponse'))

        } else {
          const errorData = await response.json()
          console.error('Error uploading file:', errorData)
          setError(`Error uploading file: ${errorData.message || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        setError(`Error uploading file: ${(error as Error).message || 'Unknown error'}`)
      }
    }

    reader.onerror = () => {
      console.error('Error reading file')
      setError('Error reading file')
    }

    reader.readAsDataURL(file)
  }

  if (!isOpen) return null

  return (
    <div className='modal2 modal-overlay fixed inset-0 flex items-center justify-center z-1000'>
      <div className='modal-container bg-white rounded-lg shadow-lg w-[450px]'>
        <div className='modal-header bg-black text-white px-6 py-2'>
          <p className='text-sm font-semibold'>
            PLEASE ENSURE YOUR SELFIE HAS:
          </p>
        </div>
        <div className='modal-body px-5 py-6 bg-black text-white border-t-2 border-b-2 text-sm'>
          <div>
            <div className='flex items-center mb-1'>
              <Image
               src='/assets/box.png' 
               alt='' 
               height={12}
               width={12}
               />
              <p className='ml-2'>NEUTRAL EXPRESSION</p>
            </div>
            <div className='flex items-center mb-6'>
              <div className='text-black'></div>
              <div className='text-[#6E6E6E] text-[14px] ml-5'>
                smiling may distort wrinkles
              </div>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Image
               src='/assets/box.png' 
               alt='' 
               height={12}
               width={12}
               />
              <p className='ml-2'>FRONTAL POSE</p>
            </div>
            <div className='flex items-center mb-6'>
              <div className='text-black'></div>
              <div className='text-[#6E6E6E] text-[14px] ml-5'>
                take the image from an arm&apos;s <br />
                length away at eye level
              </div>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Image
               src='/assets/box.png' 
               alt=''
               height={12}
               width={12}
               />
              <p className='ml-2'>ADEQUATE LIGHTING</p>
            </div>
            <div className='flex items-center mb-6'>
              <div className='text-black'></div>
              <div className='text-[#6E6E6E] text-[14px] ml-5'>
                avoid harsh downlighting and <br />
                aim for natural or soft light
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
          />
          <div className='modal-footer flex justify-end gap-4 px-6 py-1 bg-black text-white'>
            <button
              className='text-gray-400 px-4 text-[14px] rounded'
              onClick={onClose}
              type='button'
            >
              CANCEL
            </button>
            <button
              className=' text-white px-4 text-[14px] rounded'
              onClick={() => fileInputRef.current?.click()}
              type='button'
            >
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal