'use client'

import axios from "axios";
import Link from "next/link";
import { Children, useEffect, useState } from "react";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/products");

      setProducts(data.data.products)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const productsRow = Children.toArray(
    products.map((val) => {
      return (
        <tr>
          <td scope="row" className="px-6 py-4 font-bold">{val.title}</td>
          <td className="truncate max-w-[200px] font-bold">{val.description}</td>
          <td className="px-6 py-4 font-bold">${val.price}</td>
          <td className="px-6 py-4">
            <img src={val.thumbnail} alt={val.title} width="50" />
          </td>
          <td scope="row" className="px-6 py-4 underline font-bold">
            <Link href={`product/${val.id}`}>
              See Detail
            </Link>
          </td>
        </tr >
      )
    }
    ))


  return (
    <div className="max-w-6xl mx-auto p-4" >
      <p className="text-6xl">
        List of Products
      </p>

      <div className="relative overflow-x-auto mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Picture</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {productsRow}
          </tbody>
        </table>
      </div>
    </div >
  );
}
