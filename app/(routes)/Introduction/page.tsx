'use client'

import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import Link from 'next/link'

const Introduction = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true)

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setPlaceholderVisible(false)
    }
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
      <div className='pl-[32px] font-semibold text-[16px]'>TO START ANALYSIS</div>
      <main className='h-[100%] flex flex-col items-center justify-center bg-white text-black relative'>
        <div className='relative box-container h-[600px] w-[600px] flex items-center justify-center'>
          <div className='box box-3 rotate-45 flex items-center justify-center'>
            <div className='box box-2 flex items-center justify-center'>
              <div
                className='box box-1 flex items-center justify-center'
                onClick={handleBoxClick}
              >
                <div className='absolute rotate-315 h-[100%] w-[100%] flex flex-col items-center justify-center text-center'>
                
                    <h2 className='text-[14px] absolute top-40 pb-8'>
                      CLICK TO TYPE
                    </h2>
                  
                  <div className='input-container absolute border-black h-[80px] w-[100%] solid border-b-[1px] '>
                    <input
                      type='text'
                      className='w-[100%] h-[100%] tracking-tighter text-center'
                      placeholder='Introduce Yourself'
                      ref={inputRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='left-btn absolute left-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/'>
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

export default Introduction
