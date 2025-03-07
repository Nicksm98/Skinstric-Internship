import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      router.push('/analysis/demographics') // Navigate to the demographics page
    }
  }

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedFile) {
      setError('Please select a file first')
      fileInputRef.current?.click()
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string
      console.log('Base64 String:', base64String) // Log the base64 string

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

        console.log('Response:', response) // Log the response

        if (response.ok) {
          const responseData = await response.json()
          console.log('Response Data:', responseData) // Log the response data
          onFileSelect(selectedFile)
          console.log('Results:', responseData) // Print the results to the console
          router.push('/analysis/demographics') // Navigate to the demographics page
        } else {
          const errorData = await response.json()
          console.error('Error uploading file:', errorData)
          setError(`Error uploading file: ${errorData.message || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        setError(`Error uploading file: ${(error as any).message || 'Unknown error'}`)
      }
    }

    reader.onerror = () => {
      console.error('Error reading file')
      setError('Error reading file')
    }

    reader.readAsDataURL(selectedFile)
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay fixed inset-0 flex items-center justify-center z-1000'>
      <div className='modal-container bg-white rounded-lg shadow-lg w-[450px]'>
        <div className='modal-header bg-black text-white px-6 py-2'>
          <p className='text-sm font-semibold'>
            PLEASE ENSURE YOUR SELFIE HAS:
          </p>
        </div>
        <div className='modal-body px-5 py-6 bg-black text-white border-t-2 border-b-2 text-sm'>
          <div>
            <div className='flex items-center mb-1'>
              <img src='/assets/box.png' alt='' />
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
              <img src='/assets/box.png' alt='' />
              <p className='ml-2'>FRONTAL POSE</p>
            </div>
            <div className='flex items-center mb-6'>
              <div className='text-black'></div>
              <div className='text-[#6E6E6E] text-[14px] ml-5'>
                take the image from an arm's <br />
                length away at eye level
              </div>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <img src='/assets/box.png' alt='' />
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
        <form onSubmit={handleUpload}>
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
              type='submit'
            >
              UPLOAD IMAGE RECIEVED, FACE DETECTED
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal