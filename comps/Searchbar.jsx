import React, { useState } from 'react'
import { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import { useRouter } from 'next/router'

function Searchbar() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState("")
    const { setSearch } = useContext(SearchContext);

    const handleClick = () =>{
        setLoading(true)
        setSearch(keyword)
        router.push("/search")
        setLoading(false)
    }

    if(loading){
        return <h1>Loading...</h1>
    }
    
  return (
    <div className="flex items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            <input onChange={(e) => setKeyword(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-full md:w-[250px] lg:w-[450px] pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
        </div>
        <button onClick={handleClick} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
        </button>
    </div>
  )
}

export default Searchbar