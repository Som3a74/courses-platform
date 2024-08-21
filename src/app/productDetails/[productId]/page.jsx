'use client'
import { getProductsByCategory, GetSingleCourse } from '../../../utility/ProductApis'
import ProductList from '../../../components/ProductList';
import { useEffect, useState } from 'react';
import CourseHeader from './_components/CourseHeader';
import ProductInfo from './_components/ProductInfo';

export default function page({ params }) {
    // let SingleCourse = await GetSingleCourse(params.productId)
    // SingleCourse = await SingleCourse.data.data
    // let SimilarCourse = await getProductsByCategory(SingleCourse.attributes.category)
    // // console.log(SimilarCourse)

    // const [SingleCourse, setSingleCourse] = useState()
    // const [SimilarCourse, setSimilarCourse] = useState()

    // async function Fn_SingleCourse() {
    //     await GetSingleCourse(params.productId).then((ele) => {
    //         setSingleCourse(ele.data.data)
    //         getProductsByCategory(ele.data.data.attributes.category).then((ele2) => {
    //             console.log(ele2)
    //             setSimilarCourse(ele2)
    //         })
    //     })
    // }

    // useEffect(() => {
    //     Fn_SingleCourse()
    // }, [])


    const [SingleCourse, setSingleCourse] = useState();
    const [SimilarCourse, setSimilarCourse] = useState();

    const getProductById = () => {
        GetSingleCourse(params?.productId).then((res) => {
            setSingleCourse(res.data.data);
            // console.log(res.data.data);
            fn_getProductListByCategory(res.data.data);
        });
    };

    const fn_getProductListByCategory = (product) => {
        getProductsByCategory(product?.attributes.category).then((res) => {
            // console.log(res?.data?.data);
            setSimilarCourse(res?.data?.data);
        });
    };

    useEffect(() => {
        getProductById();
    }, []);


    return (
        <main className='px-10 py-8 md:px-28'>
            <CourseHeader />
            <ProductInfo SingleCourse={SingleCourse} />

            <div className='lg:px-0 xl:px-20 min-xl:px-28'>
                <h2 className="mt-24 mb-4 text-2xl font-bold">Similar Products</h2>
                <ProductList ProductData={SimilarCourse} />
            </div>
        </main>
    )
}