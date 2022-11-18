import Movies from "../comps/Movies";
import Navbar from "../comps/Navbar";
import Axios from "axios";
import { useState } from "react";

export default function Home({ movieData, tvData}) {
  const [toggle, setToggle] = useState("movie");


  const handleClick = (e) => {
    setToggle(e.target.value);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-black text-white gap-10">
      <Navbar/>
      <div>
        <div className="flex items-center justify-center w-screen relative" >
          <h2 className="text-white font-bold md:text-xl p-4">
            Trending
          </h2>
          <div className="flex gap-3 text-black rounded px-2 w-[200px]">
            <button value={"movie"} onClick={handleClick} type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Movies</button>
            <button value={"tv"} onClick={handleClick}type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Shows</button>
          </div>
        </div>

        {toggle === "movie" && (
          <Movies movieData={movieData} />
        )}
        {toggle === "tv" && (
          <Movies movieData={tvData} />
        )}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await Axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data1 = await Axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  return {
    props: {
      movieData: data.data.results,
      tvData: data1.data.results,
    },
  };
};



