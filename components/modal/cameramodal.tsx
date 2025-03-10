import Link from 'next/link'

interface CameraModalProps {
  isOpen: boolean  
    onClose: () => void
}

const CameraModal: React.FC<CameraModalProps> = ({
    isOpen,
    onClose
}) => {

    if (!isOpen) return null

  return (
    <div className='modal1 modal-overlay fixed inset-0 top-30 right-25 flex items-center justify-center z-1000'>
      <div className='modal-container h-[125px] bg-white rounded-lg shadow-lg w-[350px]'>
        <div className='modal-body bg-black h-[100%] text-white px-4 py-2'>ALLOW A.I. TO ACCESS YOUR CAMERA</div>
        <div className='modal-footer flex justify-end border-t-2 border-solid border-white gap-8 px-6 py-1 bg-black text-white'>
        <button
              className='text-gray-400 px-4 text-[14px] rounded'
              onClick={onClose}
              type='button'
            >
              DENY
            </button>
            <Link href='/analysis/aicamera'>
            <button
              className='text-white'
              >
              ALLOW
            </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default CameraModal
