import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import Navbar from "../../comps/Navbar";
import Movies from "../../comps/Movies";
import {useContext} from "react";
import SearchContext from "../../context/SearchContext";
import axios from "axios";
import Pagination from "../../comps/Pagination";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [data, setData] = useState([]);
  const { search } = useContext(SearchContext);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`
      https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${search}&page=1&2&include_adult=false&region=us`);
      setData(data.data.results);
      setTotalResults(data.data.total_results);
    };
    fetchData();
  }, [search]);

  const nextPage = async (pageNumber) => {
    const data = await axios.get(`
    https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${search}&page=${pageNumber}&include_adult=false&region=us`);
    setData(data.data.results);
  };

  const numberPages = Math.floor(totalResults / 20);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-black text-white gap-10">
      <Navbar />
      <div>
        <div className="flex items-center justify-center w-screen relative">
          <h2 className="text-white font-bold md:text-xl p-4">
            Results for: {search}
          </h2>
        </div>
        <Movies movieData={data} />
        {totalResults > 20 ? (
          <Pagination
            pages={numberPages}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
}
