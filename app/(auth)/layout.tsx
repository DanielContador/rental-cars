import Image from 'next/image';
import React from 'react'

export default function AuthLayout({children,}: {children: React.ReactNode;}) {
  return (
    <div className='grid lg:grid-cols-2 h-full items-center justify-center'>
        <div className='flex items-center justify-center'>{children}</div>
        <div className='hidden lg:flex lg:bg-slate-300 h-full justify-center items-center lg:flex-col'>
          <Image  src="/logo.svg" alt="Logo RentalCars" width="100" height="100" />
          <h1 className='text-3xl font-bold'>RentalCars</h1>    
        </div>
    </div>
  );
}