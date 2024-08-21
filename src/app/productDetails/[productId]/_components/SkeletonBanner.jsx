import React from 'react'

export default function SkeletonBanner() {
    return (
        <div className='flex flex-col gap-5'>
            <div className='h-[225px] w-[400px] bg-slate-200 rounded-md animate-pulse'></div>
        </div>
    )
}
