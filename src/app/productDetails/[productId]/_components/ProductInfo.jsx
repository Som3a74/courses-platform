'use client'
import { FiAlertOctagon } from "react-icons/fi";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import SkeletonBanner from './SkeletonBanner';
import SkeletonProductInfo from './SkeletonProductInfo';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { useContext, useEffect } from "react";
import { PostToCart } from "../../../../utility/CartApis";
import { CartContext } from "../../../../context/CartContext";

export default function ProductInfo({ SingleCourse }) {
    const { user } = useUser();
    const router = useRouter();

    const { CartData, setCartData } = useContext(CartContext);

    const handleAddToCart = () => {
        if (!user) {

            router.push('/sign-in')

        } else {

            const data = {
                data: {
                    userName: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    products: [SingleCourse?.id]
                }
            }

            PostToCart(data).then(res => {
                // console.log('cart created successfully', res.data.data)
                setCartData(oldCart => [
                    ...oldCart,
                    {
                        id: res?.data?.data?.id,
                        SingleCourse
                    }
                ])
            }).catch(error => console.log('error', error))
        }
    }

    // useEffect(() => {
    //     console.log(CartData)
    // }, [CartData])

    return (
        <section className='mt-10 grid grid-cols-1 lg:grid-cols-2 items-center md:justify-items-stretch xl:justify-items-center'>

            {SingleCourse ?
                <div>
                    <Image
                        src={SingleCourse.attributes.banner.data.attributes.url}
                        alt={SingleCourse.attributes.banner.data.attributes.name}
                        width={400}
                        height={400}
                        className='rounded-lg object-cover'
                    />
                </div>
                : <SkeletonBanner />
            }

            {SingleCourse ?
                <div>
                    <h2 className='text-[22px] font-bold'>{SingleCourse?.attributes?.title}</h2>
                    <h2 className='text-[14px] font-semibold text-gray-400'>{SingleCourse?.attributes?.category}</h2>
                    <h2 className='text-[15px] font-semibold mt-2'>{SingleCourse?.attributes?.description[0]?.children[0].text}</h2>
                    <h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center font-bold'>{SingleCourse?.attributes?.instantDelivery ? <LuBadgeCheck className='w-5 h-5 text-primary' /> : <FiAlertOctagon className='w-5 h-5 text-red-500' />} Eligible For Instant Delivery</h2>
                    <h2 className='text-[24px] text-primary mt-2 font-bold'>$ {SingleCourse?.attributes?.price}</h2>

                    <button onClick={() => handleAddToCart()} className='font-bold p-3 mt-4 rounded-md bg-primary text-white flex items-center gap-3'><MdOutlineShoppingCart className='text-2xl' /> Add to Cart</button>
                </div>
                : <SkeletonProductInfo />
            }

        </section>
    )
}