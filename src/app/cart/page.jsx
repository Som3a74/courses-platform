'use client'
import { CartContext } from '../../context/CartContext';
import { DeleteCart, GetCart } from '../../utility/CartApis';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useUser } from "@clerk/nextjs";
import Image from 'next/image'
import SkeletonList from '../../components/SkeletonList';

export default function page() {
  const { CartData, setCartData } = useContext(CartContext);
  
  const router = useRouter();
  const { user } = useUser();

  function handelTotal() {
    let total = 0;
    CartData?.forEach(ele =>
      total += ele?.product?.attributes?.price
    );
    return total;
  }

  const handelDeleteCart = (id) => {
    DeleteCart(id)
      .then((res) => {
        if (res) setCartData((oldCart) => oldCart.filter((item) => item.id !== res?.data?.data?.id))
      })
      .catch(error => console.log('error', error))
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>
          <div className="mt-8">


            {CartData && CartData.length ?

              <ul className="space-y-4">
                {/* {console.log(CartData.length)} */}
                {CartData.map((ele) =>

                  <li key={ele.id} className="flex items-center gap-4">
                    <Image
                      src={ele?.product?.attributes?.banner?.data?.attributes?.url}
                      alt={ele?.product?.attributes?.title}
                      width={150}
                      height={150}
                      className="rounded object-cover"
                    />

                    <div>
                      <h3 className="text-md font-bold">{ele?.product?.attributes?.title}</h3>
                      <h4 className="font-semibold text-[14px] my-0.5 text-gray-600">Category: {ele?.product?.attributes?.category}</h4>
                      <h4 className="font-bold text-[14px] text-gray-600">price :${ele?.product?.attributes?.price}</h4>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>

                      <button onClick={() => handelDeleteCart(ele?.id)} className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4" >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>

                    </div>

                  </li>
                )}

              </ul>
              : <SkeletonList/>
            }

            {CartData && CartData.length &&

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                {/* {console.log(CartData)} */}
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>£{handelTotal()}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£0</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>£{handelTotal()}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span
                      className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">0 Discounts Applied</p>
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={() => router.push(`/checkout?amount=${handelTotal()}`)} className="block rounded bg-primary px-5 py-3 text-sm text-gray-100 transition">Checkout</button>
                  </div>

                </div>
              </div>
            }


          </div>
        </div>
      </div>
    </section>
  )
}
