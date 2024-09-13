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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/products");

      setProducts(data.data.products)

    } catch (error) {
      console.log(error);

    }
  }

  const fetchCategoryList = async () => {
    try {
      const { data } = await axios.get('https://dummyjson.com/products/category-list')

      setCategories(data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategoryList()
  }, [])

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
      <div className="mt-14" id="filterButton" data-dropdown-toggle="dropdown">
        <button onClick={toggleDropdown} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Filters</button>
      </div>

      <div id="dropdown" className={`${dropdownOpen ? '' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="filterButton">
          {
            categories?.map((val: string) => (
              <li key={val}>
                <a href={`?categories=${val}`} className="block px-4 py-2 hover:bg-gray-100 ">{val}</a>
              </li>
            ))
          }

        </ul>
      </div>

      <div className="relative overflow-x-auto mt-8">
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
