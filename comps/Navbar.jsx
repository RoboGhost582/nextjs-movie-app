import React, { use } from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"




function Navbar() {
  const { data: session } = useSession()
  return (
    <div className="flex justify-around items-center py-2">

      <Link href="/">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="" />
      </Link>

      <div className= "">
        <Searchbar />
      </div>

      <div className="flex gap-3 items-center">
        {session ? (
            <p className="hidden sm:block">Hello: {session.user.name || session.user.email}</p>
        )
          : (<Link href="/login">
            <p className="p-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</p>
          </Link>)
        }

        
        
        {session && 
        <Link href="/profile">
           <button className = "p-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Saved Shows</button>
        </Link>}
        
       

        {session && <button className = "p-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={signOut}>Sign Out</button>}

      </div>
    </div>
  );
}

export default Navbar;
