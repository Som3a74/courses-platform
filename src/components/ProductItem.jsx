import Image from 'next/image';
import { FaListUl } from "react-icons/fa";
import Link from 'next/link';
import SkeletonList from './SkeletonList';

export default function ProductItem({ prodect }) {
  return <>
    {prodect ?
      <div className='mx-auto overflow-hidden shadow-sm rounded-t-lg'>
        <Link href={`/productDetails/${prodect.id}`}>
          <Image
            src={prodect.attributes.banner.data.attributes.url}
            alt={prodect.attributes.banner.data.attributes.name}
            width={400}
            height={350}
            className='h-[170px] object-cover rounded-t-lg transition ease-in-out duration-500 hover:scale-110 hover:cursor-pointer'
          />
        </Link>

        <div className='p-2 py-5 rounded-b-lg bg-gray-100 flex justify-between'>
          <div className=''>
            <h2 className='line-clamp-1 text-[16px] font-bold mb-1'>{prodect.attributes.title}</h2>
            <div className='flex items-center'>
              <FaListUl className='text-gray-400 h-4' />
              <small className='text-gray-600 text-[12px] font-medium ms-2'>{prodect.attributes.category}</small>
            </div>
          </div>
          <h3 className='font-bold text-base'>{prodect.attributes.price}$</h3>
        </div>

      </div>

      : <SkeletonList />
    }
  </>
}
