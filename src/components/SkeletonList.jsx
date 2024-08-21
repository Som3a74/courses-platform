
export default function SkeletonList() {
    const skeletonItems = [];

    for (let i = 0; i < 7; i++) {
        skeletonItems.push(
            <div key={i} className='rounded-t-lg m-4'>
                <div className='h-[170px] w-full bg-slate-200 rounded-md animate-pulse' />

                <div className='p-2 py-5 rounded-b-lg bg-gray-100 flex justify-between'>

                    <div className=''>
                        <div className='h-[20px] w-[90px] bg-slate-200 animate-pulse '></div>
                        <div className='h-[20px] w-[90px] bg-slate-200 animate-pulse mt-2'></div>
                    </div>

                    <div className='h-[20px] w-[70px] bg-slate-200 animate-pulse'></div>
                </div>

            </div>
        );
    }

    return <>
        {skeletonItems}
    </>
}
