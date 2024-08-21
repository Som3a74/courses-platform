'use client'
import Breadcrumb from '../../../../components/Breadcrumb'
import { usePathname } from 'next/navigation'

export default function CourseHeader() {
    let path = usePathname()
    path = path.trim().split("/").splice(1)
    
    return (
        <div className='lg:px-14 xl:px-28'>
            <Breadcrumb pathname={path} />
        </div>
    )
}
