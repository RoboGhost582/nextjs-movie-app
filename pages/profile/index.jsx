import Navbar from "../../comps/Navbar";
import Saved from "../../comps/Saved";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import axios from "axios";

export default function Home() {
  const { data: session } = useSession()
  const [saved, setSaved] = useState([])

  const setNewSave = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`)
    setSaved(res.data.savedShows)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`)
      setSaved(res.data.savedShows)
    }
    fetchData()
  }, [setSaved,session?.user.email])


  return (
    <div className="flex flex-col w-screen min-h-screen bg-black text-white gap-10">
      <Navbar session={session} />
      <div>
        <div className="flex flex-col items-center justify-center w-screen relative" >
          <h1 className="text-white font-bold md:text-xl p-4">Welcome {session?.user.name || session?.user.email}</h1>
          <h2 className="text-white font-bold md:text-xl p-4">
            Here are your saved Movie and Shows:
          </h2>
        </div>

        <Saved movieData={saved} setNewSave = {setNewSave}/>
        {/* <Movies movieData={saved} /> */}

      </div>
    </div>
  );
}
