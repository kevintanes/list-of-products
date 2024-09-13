'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    availabilityStatus: string;
}

const ProductDetail = () => {

    const { id } = useParams()

    const [product, setProduct] = useState<Product>();

    const getProductDetail = async () => {
        try {
            const { data } = await axios.get(`https://dummyjson.com/products/${id}`)

            console.log({ data });

            setProduct(data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductDetail()
    }, [])

    if (!product) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4" >
            <p className="text-6xl">
                PRODUCT DETAIL
            </p>

            <div className='mt-40 flex ' >
                <div className=' max-w-80 '>
                    {product.images?.map((val: string, index: number) => (
                        <img key={index} src={val} alt={`image ${index + 1}`} />
                    ))}
                </div>
                <div>
                    <div className='flex justify-between mb-7 '>
                        <p className='text-2xl font-bold'>{product.title}</p>
                        <p className='text-2xl font-bold'>${product.price}</p>
                    </div>
                    <p className='text-xl'>{product.description}</p>
                    <p className='text-xl'>{product.availabilityStatus}</p>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail