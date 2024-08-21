// "use client"
import { GetProductData } from '../utility/ProductApis'
import ProductList from './ProductList'

export default async function ProductSection() {

  let ProductData = await GetProductData()
  ProductData = ProductData.data.data
  // console.log(ProductData)

  return (
    <section className='p-10 md:p-20'>
      <h2 className='text-2xl font-bold my-10'>Trend Now</h2>
      <ProductList ProductData={ProductData} />
    </section>
  )
}
