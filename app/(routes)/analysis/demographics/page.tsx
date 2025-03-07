import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Demographics = () => {
  return (
    <div>
      <main className='h-screen p-8'>
        <div className='font-semibold text-[16px]'>A.I. ANALYSIS</div>
        <div className='font-normal text-[72px]'>DEMOGRAPHICS</div>
        <div className='font-normal text-[14px]'>PREDICTED RACE & AGE</div>

        <div className='flex flex-col mt-25 w-[12%] h-[60%]'>
          <div className='w-[100%] h-[17%] bg-[#E1E1E2] flex flex-col justify-between border-t-2 border-black border-box mt-1 p-3 hover:bg-black hover:text-white'>
            <div className='text-[16px] font-semibold'>ASDFASDFA</div>
            <div className='text-[16px] font-semibold'>RACE</div>
          </div>
          <div className='w-[100%] h-[17%] bg-[#E1E1E2] flex flex-col justify-between border-t-2 border-black border-box mt-1 p-3 hover:bg-black hover:text-white'>
            <div className='text-[16px] font-semibold'>1241</div>
            <div className='text-[16px] font-semibold'>AGE</div>
          </div>
          <div className='w-[100%] h-[17%] bg-[#E1E1E2] flex flex-col justify-between border-t-2 border-black border-box mt-1 p-3 hover:bg-black hover:text-white'>
            <div className='text-[16px] font-semibold'>ASDFA</div>
            <div className='text-[16px] font-semibold'>GENDER</div>
          </div>
        </div>
        <div></div>
        <div></div>


        <div className='left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/analysis'>
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

export default Demographics