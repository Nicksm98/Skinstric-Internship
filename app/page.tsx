'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home () {
  const [leftHovered, setLeftHovered] = useState(false)
  const [rightHovered, setRightHovered] = useState(false)

  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='h-16 flex items-center justify-between px-8'>
        <div className='flex items-center gap-4'>
          <p className='font-semibold text-[14px] tracking-wide'>SKINSTRIC</p>
          <div className='flex items-center text-[17px] tracking-widest'>
            [<p className='px-2 text-sm tracking-tighter'>INTRO</p>]
          </div>
        </div>
        <Button className='bg-black text-white rounded-none hover:bg-gray-800'>
          ENTER CODE
        </Button>
      </header>
      <main
        className={`h-[100%] flex flex-col items-center justify-center bg-white text-black relative ${
          leftHovered ? 'left-hovered' : ''
        } ${rightHovered ? 'right-hovered' : ''}`}
      >
        <div
          className={`left-container diamond-container ${
            leftHovered ? 'hovered' : ''
          }`}
        >
          <div className='diamond diamond-1'></div>
          <div className='diamond diamond-2'></div>
          <div className='diamond diamond-3'></div>
        </div>
        <div
          className={`right-container diamond-container ${
            rightHovered ? 'hovered' : ''
          }`}
        >
          <div className='diamond diamond-4'></div>
          <div className='diamond diamond-5'></div>
          <div className='diamond diamond-6'></div>
        </div>
        <h1 className='text-[88px] tracking-tighter leading-none font-300 text-center mb-12'>
          Sophisticated <br /> skincare
        </h1>
        <div className='left-btn absolute left-[5%] top-1/2 transform -translate-y-1/2 flex items-center justify-center'>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Button
                className='left-btn bg-transparent hover:bg-transparent -rotate-45'
                onMouseEnter={() => setLeftHovered(true)}
                onMouseLeave={() => setLeftHovered(false)}
              >
                <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
              </Button>
            </div>
          </div>
          <div className='left-btn ml-7 text-sm tracking-wide'>
            DISCOVER A.I.
          </div>
        </div>
        <div className='right-btn absolute right-[5%] top-1/2 transform -translate-y-1/2 flex items-center'>
          <p className='right-btn mr-7 text-sm'>TAKE TEST</p>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/introduction'>
                <Button
                  className='right-btn bg-transparent hover:bg-transparent -rotate-45'
                  onMouseEnter={() => setRightHovered(true)}
                  onMouseLeave={() => setRightHovered(false)}
                >
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-90 border-transparent border-b-black'></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='hold-btn absolute right-[35%] bottom-[22%] flex flex-col items-center opacity-50'>
          <div className='relative w-[80px] h-[80px] flex items-center justify-center opacity-30 pb-2'>
            <div className='absolute w-full h-full transform rotate-45 border border-[#1A1B1C] bg-white z-10 flex items-center justify-center'>
              <div className='absolute w-[87%] h-[87%] border border-[#1A1B1C] bg-white flex items-center justify-center z-20'>
                <div className='absolute w-2 h-2 bg-[#1A1B1C] pb-[] z-30'></div>
              </div>
            </div>
            <div className='absolute w-[105px] h-[1px] bg-[#1A1B1C] transform rotate-45 z-0'></div>
            <div className='absolute w-[105px] h-[1px] bg-[#1A1B1C] transform -rotate-45 z-0'></div>
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
