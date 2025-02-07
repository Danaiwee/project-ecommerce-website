import { ShoppingCart } from 'lucide-react'

const ProductCard = ({product}) => {
  return (
    <div className='w-full max-w-70 p-3 bg-transparent border border-gray-700 rounded-md flex flex-col mt-2 py-5'>
        <img 
            src={product.image}
            className='w-full h-50 overflow-hidden object-fill rounded-md'
        />

        <div className='flex flex-col p-2 mt-3 gap-2'>
            <p className='text-md text-gray-100 font-medium'>
                {product.name}
            </p>
            <p className='text-3xl text-emerald-500 font-medium'>
                ${product.price}
            </p>

            <buton
             className='w-fit bg-emerald-600 hover:bg-emerald-500 rounded-md text-white text-sm flex items-center py-2 px-3 gap-3 cursor-pointer mt-3'
            >
                <ShoppingCart className='size-4' />
                <span>Add to cart</span>
            </buton>
        </div>
    </div>
  )
}

export default ProductCard