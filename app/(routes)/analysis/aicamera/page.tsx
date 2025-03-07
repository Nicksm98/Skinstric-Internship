import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AiCamera = () => {
  return (
    <div className='min-h-screen w-screen flex flex-col'>
      <main className='flex-grow flex flex-col items-center justify-center bg-white text-black relative'>
        <div className='box-container h-[550px] w-[550px] flex items-center justify-center'>
          <div className='absolute h-[50%] w-[30%] flex flex-col items-center justify-center text-center'>
            <h2 className='text-[14px] absolute top-40 pb-8'></h2>
            <Link href='/introduction/photo' id='proceed-link' />
          </div>
          <div className='box box-3 flex items-center justify-center'>
            <div className='box box-2 flex items-center justify-center'>
              <div className='relative box box-1 flex items-center justify-center'>
                <img
                  className='h-[120px] w-[120px] object-contain cursor-pointer text-tight'
                  src='/assets/camera-icon.png'
                  alt='Camera Icon'
                />
              </div>
            </div>
          </div>
          <div className='absolute font-semibold text-[16px]' style={{ bottom: '34%' }}>SETTING UP CAMERA ...</div>
        </div>
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