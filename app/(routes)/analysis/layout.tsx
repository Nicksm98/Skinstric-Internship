import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
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
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
