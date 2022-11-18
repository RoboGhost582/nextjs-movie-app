import Link from "next/link";
import axios from 'axios'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

function Movies({ movieData }) {
  const { data: session } = useSession()
  const [likedShows, setLikedShows] = useState([])
  let likedID = []
  

  likedShows?.forEach(element => likedID.push(element.id));

  const save = async (item) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`, item)
    //Update the data 
    const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`)
    setLikedShows(data.data.savedShows)
  }

  const unsave = async (item) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unlike/${session?.user.email}`, item)
    //Update the data 
    const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`)
    setLikedShows(data.data.savedShows)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`)
      setLikedShows(res.data.savedShows)
    }
    fetchData()
  }, [setLikedShows])


  return (
    <div className="flex flex-wrap gap-5 p-10 w-screen justify-center">
      {movieData?.map((item) => {
        return (
          <>
            {item.media_type !== "person" && item.poster_path !== null && (
              <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-[#1a1a1a]">
                {item.media_type === "movie" ? (
                  <Link key={item.id} href="/movie/[id]" as={`/movie/${item?.id}`}>
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                      alt={item?.title}
                    />
                  </Link>
                ) : (
                  <Link key={item.id} href="/tv/[id]" as={`/tv/${item?.id}`}>
                    <img
                      className="w-full"
                      src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                      alt={item?.title}
                    />
                  </Link>
                )}
                {}
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {item?.original_title || item?.name}
                  </div>
                  <p className="text-white-700 text-base">
                    Released: {item?.release_date || item?.first_air_date}
                  </p>
                </div>
                {session && ( 
                likedID.includes(item.id) ? 
                
                (<button onClick={() => unsave(item)} className="p-2.5 ml-6 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Unsave</button>) :

                (<button onClick={() => save(item)} className="p-2.5 ml-6 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Save</button>)
                
                
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Movies;
