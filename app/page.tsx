import { Button } from '@/components/ui/button'

export default function Home () {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='h-16 flex items-center justify-between px-8 '>
        <div className='flex items-center gap-4'>
          <p className='font-bold text-lg tracking-wide'>SKINSTRIC</p>
          <span className='text-sm tracking-widest'>[ INTRO ]</span>
        </div>
        <Button className='bg-black text-white rounded-none hover:bg-gray-800'>
          ENTER CODE
        </Button>
      </header>
      <main className='h-[100%] flex flex-col items-center justify-center bg-white text-black relative'>
        <h1 className='text-[88px] tracking-tighter leading-none font-300 text-center mb-12'>
          Sophisticated <br /> skincare
        </h1>
        <div className='absolute left-[10%] top-1/2 transform -translate-y-1/2 flex items-center justify-center'>
          <div className='w-14 h-14 border-[2px] border-black transform rotate-45 flex items-center justify-center'>
          <button className='-rotate-45 text-lg font-bold'>
              <div className='w-0 h-0 border-l-8 border-r-8 border-b-12 transform rotate-270 border-transparent border-b-black'></div>
            </button>
          </div>
          <div className='ml-7 text-sm tracking-wide'>DISCOVER A.I.</div>
        </div>
        <div className='absolute right-[10%] top-1/2 transform -translate-y-1/2 flex items-center'>
          <p className='mr-7 text-sm tracking-wide'>TAKE TEST</p>
          <div className='w-14 h-14 border-[2px] border-black transform rotate-45 flex items-center justify-center'>
          <button className='-rotate-45 text-lg font-bold'>
              <div className='w-0 h-0 border-l-8 border-r-8 border-b-12 transform rotate-90 border-transparent border-b-black'></div>
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center opacity-50'>
          <div className='relative w-[80px] h-[80px] flex items-center justify-center opacity-30 pb-2'>
            <div className='absolute w-full h-full transform rotate-45 border border-[#1A1B1C] bg-white z-10'></div>
            <div className='absolute w-[70%] h-[70%] transform rotate-45 border border-[#1A1B1C] bg-white z-20'></div>
            <div className='absolute w-2 h-2 bg-[#1A1B1C] transform rotate-45 pb-[] z-30'></div>
            <div className='absolute w-[100px] h-[1px] bg-[#1A1B1C] transform rotate-45 z-0'></div>
            <div className='absolute w-[100px] h-[1px] bg-[#1A1B1C] transform -rotate-45 z-0'></div>
          </div>
          <p className='mt-4 text-sm text-gray-600 text-center'>
            TAP AND HOLD <br /> TO PROCEED TO SECTION
          </p>
        </div>
        <p className='absolute bottom-8 left-8 text-[12px] text-[#1A1B1C] max-w-xl'>
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES 
          <br />A HIGHLY-PERSONALISED ROUTINE TAILORED TO
          <br /> WHAT YOUR SKIN NEEDS.
        </p>
      </main>
    </div>
  )
}

