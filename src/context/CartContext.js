"use client"
import { GetCart } from '../utility/CartApis';
import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [CartData, setCartData] = useState([]);
    const { user } = useUser();

    function HandelGetCart() {
        GetCart(user.primaryEmailAddress.emailAddress).then((res) => {
        console.log(res)

            // console.log('response from cart items', res?.data.data)

            res?.data?.data.forEach(citem => {

                setCartData((oldCart) => [
                    ...oldCart,
                    {
                        id: citem.id,
                        product: citem?.attributes?.products?.data[0]
                    }
                ])

            })

        })
    }

    useEffect(() => {
        user && HandelGetCart()
    }, [user])

    return (
        <CartContext.Provider value={{ CartData, setCartData }}>
            {children}
        </CartContext.Provider>
    );
};