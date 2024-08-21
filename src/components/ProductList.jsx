import ProductItem from './ProductItem'
import SkeletonList from './SkeletonList'

export default function ProductList({ ProductData }) {
  return ProductData ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {ProductData.map((item, index) =>
        <ProductItem key={index} prodect={item} />
      )}
    </div>
  ) :
    (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <SkeletonList />
      </div>
    )
}
