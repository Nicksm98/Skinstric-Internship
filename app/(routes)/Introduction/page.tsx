'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Introduction = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true)
  const [, setIsTyping] = useState(false)
  const [, setLocationVisible] = useState(false)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [nameEntered, setNameEntered] = useState(false)
  const [underlineWidth, setUnderlineWidth] = useState('auto')
  const [headerText, setHeaderText] = useState('CLICK TO TYPE')
  const [error, setError] = useState('')

  useEffect(() => {
    if (inputRef.current) {
      const placeholderText = inputRef.current.placeholder
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        context.font = getComputedStyle(inputRef.current).font
        const textWidth = context.measureText(placeholderText).width
        setUnderlineWidth(`${textWidth}px`)
      }
    }
  }, [])

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setPlaceholderVisible(false)
      setIsTyping(true)
      setHeaderText(inputRef.current.placeholder)
    }
  }

  const handleInputBlur = async () => {
    if (name === '') {
      setPlaceholderVisible(true)
      setIsTyping(false)
      setHeaderText('CLICK TO TYPE')
    } else {
      setNameEntered(true)
      setLocationVisible(true)
      setHeaderText('Where are you from?')
      if (locationRef.current) {
        locationRef.current.focus()
      }
    }
  }

  const handleLocationBlur = async () => {
    if (location === '') {
      setHeaderText('Where are you from?')
    } else {
      try {
        const response = await fetch(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, location })
          }
        )
        const data = await response.json()
        console.log('API response:', data)
      } catch (error) {
        console.error('Error hitting the API:', error)
      }
    }
  }

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameEntered) {
      if (!name) {
        setError('Please enter your name.')
        return
      }

      if (!/^[a-zA-Z\s]+$/.test(name)) {
        setError('Name must be a valid string without numbers.')
        return
      }

      setNameEntered(true)
      setLocationVisible(true)
      setHeaderText('Where are you from?')
      setError('')
      if (locationRef.current) {
        locationRef.current.focus()
      }
    } else {
      if (!location) {
        setError('Please enter your location.')
        return
      }

      if (!/^[a-zA-Z\s]+$/.test(location)) {
        setError('Location must be a valid string without numbers.')
        return
      }

      localStorage.setItem('name', name)
      localStorage.setItem('location', location)
      setError('')
      // Proceed to the Photo page
      document.getElementById('proceed-link')?.click()
    }
  }

  const handleReset = () => {
    setName('')
    setLocation('')
    setNameEntered(false)
    setLocationVisible(false)
    setHeaderText('CLICK TO TYPE')
    setError('')
    setPlaceholderVisible(true)
    setIsTyping(false)
  }

  return (
    <div className='min-h-screen w-screen flex flex-col'>
      <div className='pl-[32px] font-semibold text-[16px]'>TO START ANALYSIS</div>
      <main className='flex-grow flex flex-col items-center justify-center bg-white text-black relative'>
        <div className='box-container h-[550px] w-[550px] flex items-center justify-center'>
          <div className='absolute h-[50%] w-[30%] flex flex-col items-center justify-center text-center'>
            <h2 className='text-[14px] absolute top-40 pb-8'>{headerText}</h2>
            <form onSubmit={handleProceed}>
              <div
                className='input-container absolute border-black h-[80px] w-[75%] solid border-b-[1px]'
                style={{ width: underlineWidth }}
              >
                {!nameEntered ? (
                  <input
                    type='text'
                    className='w-[100%] h-[100%] tracking-tighter text-center'
                    placeholder={
                      isPlaceholderVisible ? 'Introduce Yourself' : ''
                    }
                    ref={inputRef}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={handleInputBlur}
                  />
                ) : (
                  <input
                    type='text'
                    className='w-[100%] h-[100%] tracking-tighter text-center'
                    placeholder={
                      isPlaceholderVisible ? 'Where are you from?' : ''
                    }
                    ref={locationRef}
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                )}
              </div>
            </form>
            <Link href='/introduction/photo' id='proceed-link' />
          </div>
          <div className='box box-3 flex items-center justify-center'>
            <div className='box box-2 flex items-center justify-center'>
              <div
                className='relative box box-1 flex items-center justify-center'
                onClick={handleBoxClick}
              ></div>
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
        <div className='right-btn absolute right-[32px] bottom-[40px] flex items-center justify-center'>
          <div className='right-btn mr-7 text-sm tracking-wide'>PROCEED</div>
          <div className='outer w-[34px] h-[34px] border-[2px] border-black transform rotate-45 flex items-center justify-center'>
            <div className='inner w-[34px] h-[34px] border-dotted border-[2px] border-black flex items-center justify-center'>
              <Link href='/introduction/photo'>
                <Button className='right-btn bg-transparent hover:bg-transparent rotate-135'>
                  <div className='w-0 h-0 border-l-5 border-r-5 border-b-8 transform rotate-270 border-transparent border-b-black'></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Introduction