'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApiResponse {
  data: {
    race: { [key: string]: number }
    age: { [key: string]: number }
    gender?: { [key: string]: number }
  }
}

const Demographics = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedRace, setSelectedRace] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Race')
  const [initialRace, setInitialRace] = useState<string | null>(null)
  const [initialAge, setInitialAge] = useState<string | null>(null)
  const [initialGender, setInitialGender] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedResponse = localStorage.getItem('apiResponse')
    console.log('Retrieved from localStorage:', storedResponse)
    if (storedResponse) {
      const parsedResponse: ApiResponse = JSON.parse(storedResponse)
      setApiResponse(parsedResponse)

      // Set initial selected values based on the highest percentage
      const highestRace = Object.entries(parsedResponse.data.race).sort((a, b) => b[1] - a[1])[0][0]
      const highestAge = Object.entries(parsedResponse.data.age).sort((a, b) => b[1] - a[1])[0][0]
      const highestGender = parsedResponse.data.gender ? Object.entries(parsedResponse.data.gender).sort((a, b) => b[1] - a[1])[0][0] : null

      setSelectedRace(highestRace)
      setSelectedAge(highestAge)
      setSelectedGender(highestGender)
      setInitialRace(highestRace)
      setInitialAge(highestAge)
      setInitialGender(highestGender)
    } else {
      router.push('/introduction/photo')
    }
  }, [router])

  if (!apiResponse) {
    return (
      <main className='h-screen w-screen flex-grow flex flex-col items-center justify-center bg-white text-black relative'>
        <div className='box-container h-[550px] w-[550px] flex items-center justify-center'>
          <div className='absolute h-[50%] w-[30%] flex flex-col items-center justify-center text-center'>
            <h2 className='text-[14px] absolute font-semibold'>
              IMAGE RECEIVED, FACE DETECTED
            </h2>
            <div className='box box-3 flex items-center justify-center'>
              <div className='box box-2 flex items-center justify-center'>
                <div className='relative box box-1 flex items-center text-center justify-center'></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const raceData = Object.entries(apiResponse.data.race).sort(
    (a, b) => b[1] - a[1]
  )

  const ageData = Object.entries(apiResponse.data.age).sort(
    (a, b) => b[1] - a[1]
  )

  const genderData = apiResponse.data.gender ? Object.entries(apiResponse.data.gender).sort(
    (a, b) => b[1] - a[1]
  ) : []

  const capitalizeFirstLetter = (string: string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleRaceClick = (race: string) => {
    setSelectedRace(race)
  }

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender)
  }

  const handleAgeClick = (age: string) => {
    setSelectedAge(age)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleReset = () => {
    setSelectedRace(initialRace)
    setSelectedAge(initialAge)
    setSelectedGender(initialGender)
    setSelectedCategory('Race')
  }

  const getSelectedPercentage = () => {
    switch (selectedCategory) {
      case 'Race':
        return raceData.find(([race]) => race === selectedRace)?.[1] || 0
      case 'Age':
        return ageData.find(([age]) => age === selectedAge)?.[1] || 0
      case 'Gender':
        return genderData.find(([gender]) => gender === selectedGender)?.[1] || 0
      default:
        return 0
    }
  }

  const renderCategoryData = () => {
    switch (selectedCategory) {
      case 'Race':
        return raceData.map(([race, percentage]) => (
          <button
            key={race}
            className={`flex h-12 w-[100%] items-center justify-between bg-[#F3F3F4] ${
              selectedRace === race ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
            }`}
            onClick={() => handleRaceClick(race)}
          >
            <div className='flex items-center'>
              <div
                className={`h-[16px] w-[16px] ml-4 mr-4 box-border border-black border-[3px] flex items-center justify-center rotate-45 ${
                  selectedRace === race ? 'border-white' : ''
                }`}
              >
                <div
                  className={`h-[60%] w-[60%] box-border border-white border-solid bg-black ${
                    selectedRace === race ? 'bg-white' : ''
                  }`}
                ></div>
              </div>
              <div className=' flex text-center'>
                {capitalizeFirstLetter(race)}
              </div>
            </div>
            <div className='mr-4 text-[80%]'>
              {(percentage * 100).toFixed(2)} %
            </div>
          </button>
        ))
      case 'Age':
        return ageData.map(([age, percentage]) => (
          <button
            key={age}
            className={`flex h-12 w-[100%] items-center justify-between bg-[#F3F3F4] ${
              selectedAge === age ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
            }`}
            onClick={() => handleAgeClick(age)}
          >
            <div className='flex items-center'>
              <div
                className={`h-[16px] w-[16px] ml-4 mr-4 box-border border-black border-[3px] flex items-center justify-center rotate-45 ${
                  selectedAge === age ? 'border-white' : ''
                }`}
              >
                <div
                  className={`h-[60%] w-[60%] box-border border-white border-solid bg-black ${
                    selectedAge === age ? 'bg-white' : ''
                  }`}
                ></div>
              </div>
              <div className=' flex text-center'>
                {capitalizeFirstLetter(age)}
              </div>
            </div>
            <div className='mr-4 text-[80%]'>
              {(percentage * 100).toFixed(2)} %
            </div>
          </button>
        ))
      case 'Gender':
        return genderData.map(([gender, percentage]) => (
          <button
            key={gender}
            className={`flex h-12 w-[100%] items-center justify-between bg-[#F3F3F4] ${
              selectedGender === gender ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
            }`}
            onClick={() => handleGenderClick(gender)}
          >
            <div className='flex items-center'>
              <div
                className={`h-[16px] w-[16px] ml-4 mr-4 box-border border-black border-[3px] flex items-center justify-center rotate-45 ${
                  selectedGender === gender ? 'border-white' : ''
                }`}
              >
                <div
                  className={`h-[60%] w-[60%] box-border border-white border-solid bg-black ${
                    selectedGender === gender ? 'bg-white' : ''
                  }`}
                ></div>
              </div>
              <div className=' flex text-center'>
                {capitalizeFirstLetter(gender)}
              </div>
            </div>
            <div className='mr-4 text-[80%]'>
              {(percentage * 100).toFixed(2)} %
            </div>
          </button>
        ))
      default:
        return null
    }
  }

  const selectedPercentage = getSelectedPercentage()
  const strokeDashoffset = 283 - (283 * selectedPercentage)

  return (
    <div className='h-screen'>
      <header className='p-8'>
        <div className='font-semibold text-[16px]'>A.I. ANALYSIS</div>
        <div className='ml-[-6px] font-normal text-[72px]'>DEMOGRAPHICS</div>
        <div className='font-normal text-[14px]'>PREDICTED RACE & AGE</div>
      </header>
      <main className='pl-8 pr-8 h-[70%]'>
        <div className='flex h-[80%]'>
          <div className='flex flex-col mt-25 w-[12%] h-[100%]'>
            <button
              className={`w-[100%] h-[17%] bg-[#F3F3F4] flex flex-col items-start justify-between border-t-2 border-black border-box mb-1 p-3 ${
                selectedCategory === 'Race' ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
              }`}
              onClick={() => handleCategoryClick('Race')}
            >
              <div className='text-[16px] font-semibold'>
                {selectedRace ? capitalizeFirstLetter(selectedRace) : 'Select race'}
              </div>
              <div className='text-[16px] font-semibold'>RACE</div>
            </button>
            <button
              className={`w-[100%] h-[17%] bg-[#F3F3F4] flex flex-col items-start justify-between border-t-2 border-black border-box mb-1 p-3 ${
                selectedCategory === 'Age' ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
              }`}
              onClick={() => handleCategoryClick('Age')}
            >
              <div className='text-[16px] font-semibold'>
                {selectedAge ? capitalizeFirstLetter(selectedAge) : 'Select age group'}
              </div>
              <div className='text-[16px] font-semibold'>AGE</div>
            </button>
            <button
              className={`w-[100%] h-[17%] bg-[#F3F3F4] flex flex-col items-start justify-between border-t-2 border-black border-box mb-1 p-3 ${
                selectedCategory === 'Gender' ? 'bg-black text-white' : 'hover:bg-[#E1E1E2]'
              }`}
              onClick={() => handleCategoryClick('Gender')}
            >
              <div className='text-[16px] font-semibold'>
                {selectedGender ? capitalizeFirstLetter(selectedGender) : 'Select gender'}
              </div>
              <div className='text-[16px] font-semibold'>Gender</div>
            </button>
          </div>
          <div className='relative flex h-[100%] w-[60%] text-[40px] bg-[#F3F3F4] mt-25 ml-4 mr-4 pt-2 pb-2 pl-4 pr-4 border-t-black border-2'>
            {selectedCategory}
            <div className='absolute bottom-0 right-0 flex items-center justify-center'>
              <svg className='progress-circle' width='400' height='400' viewBox='0 0 100 100'>
                <circle className='progress-circle-bg' cx='50' cy='50' r='45' />
                <circle className='progress-circle-fg' cx='50' cy='50' r='45' style={{ strokeDashoffset }}/>
              </svg>
              <div className='absolute text-[24px] font-semibold'>
                {(selectedPercentage * 100).toFixed(2)}%
              </div>
            </div>
          </div>
          <div className='mt-25 bl-4 br-4 border-t-black border-2 text-[100%] h-[100%] w-[28%] bg-[#F3F3F4] flex flex-col'>
            <div className='flex justify-between h-[48px] ml-4 mr-4 items-center'>
              <div>{selectedCategory}</div>
              <div>A. I. CONFIDENCE</div>
            </div>
            {renderCategoryData()}
          </div>
        </div>
      </main>
      <footer className='pl-8 pr-8 flex justify-between mt-8'>
        <div className='left-btn flex items-center justify-center'>
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
        <div className='font-semibold text-[#A0A4AB]'>
          If A.I. estimate is wrong, select the correct one.
        </div>
        <div>
          <button
            className='pt-2 pb-2 pl-4 pr-4 font-semibold border-black border-solid border-2 mr-4'
            onClick={handleReset}
          >
            RESET
          </button>
          <Link href='/analysis'>
          <button className='pt-2 pb-2 pl-4 pr-4 font-semibold bg-black text-white'>
            CONFIRM
          </button>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Demographics