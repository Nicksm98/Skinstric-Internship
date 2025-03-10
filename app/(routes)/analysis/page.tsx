import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Analysis = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='h-16 pt-[16px] flex flex-col gap-8 px-8'>
        <div className='flex items-center gap-4'>
          <Link href='/'>
            <p className='font-semibold text-[14px] tracking-wide'>SKINSTRIC</p>
          </Link>
          <div className='flex items-center text-[17px] tracking-widest'>
            [<p className='px-2 text-sm tracking-tighter'>ANALYSIS</p>]
          </div>
        </div>
      </header>
      <div className='pl-[32px] font-semibold text-[16px]'>A.I. ANALYSIS</div>
      <div className='pl-[32px] font-normal text-[14px]'>
        A.I. HAS ESTIMATED THE FOLLOWING.
      </div>
      <div className='pl-[32px] font-normal text-[14px]'>
        FIX ESTIMATED INFORMATION IF NEEDED.
      </div>
      <main className='h-[100%] flex flex-col items-center justify-center bg-white text-black'>
        <div className=''></div>
        <div className='box-container h-[600px] w-[600px] flex items-center justify-center relative rotate-45'>
          <div className='info flex items-center absolute h-[55%] w-[55%]'>
            <Link
              className='absolute h-[50%] w-[50%] border-[4px] border-white flex items-center justify-center cursor-not-allowed' href='/analysis/demographics' style={{ top: 0, left: 0 }}>
              <div className='z-3 info h-full w-full bg-[#F3F3F4] flex justify-center items-center text-black font-semibold text-[14px]'>
                <div className='-rotate-45 text-center'>DEMOGRAPHICS</div>
              </div>
            </Link>
            <Link
              className='absolute h-[50%] w-[50%] border-[4px] border-white flex items-center justify-center cursor-not-allowed' href='' style={{ top: 0, right: 0 }}>
              <div className='z-3 info h-full w-full bg-[#F3F3F4] flex justify-center items-center text-black font-semibold text-[14px]'>
                <div className='-rotate-45 text-center'>COSMETIC <br/>CONCERNS</div>
              </div>
            </Link>
            <Link
              className='absolute h-[50%] w-[50%] border-[4px] border-white flex items-center justify-center cursor-not-allowed' href='' style={{ bottom: 0, left: 0 }}>
              <div className='z-3 info h-full w-full bg-[#F3F3F4] flex justify-center items-center text-black font-semibold text-[14px]'>
                <div className='-rotate-45 text-center'>WEATHER</div>
              </div>
            </Link>
            <Link
              className='absolute h-[50%] w-[50%] border-[4px] border-white flex items-center justify-center cursor-not-allowed' href='' style={{ bottom: 0, right: 0 }}>
              <div className='z-3 info h-full w-full bg-[#F3F3F4] flex justify-center items-center text-black font-semibold text-[14px]'>
                <div className='-rotate-45 text-center'>SKIN TYPE <br />DETAILS</div>
              </div>
            </Link>
            
          </div>
          <div className='z-0 box box-3 flex items-center justify-center'>
            <div className='z-1 box box-2 flex items-center justify-center'>
              <div className='z-2 relative box box-1 flex items-center justify-center'></div>
            </div>
          </div>
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

export default Analysis