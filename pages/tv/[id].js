import Navbar from "../../comps/Navbar";
import Axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession();
  const [likedShows, setLikedShows] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null)
  let likedID = [];

  likedShows?.forEach((element) => likedID.push(element.id));

  const save = async (item) => {
    const res = await Axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`,
      item
    );
    //Update the data
    const data = await Axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`
    );
    setLikedShows(data.data.savedShows);
  };

  const unsave = async (item) => {
    const res = await Axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/unlike/${session?.user.email}`,
      item
    );
    //Update the data
    const data = await Axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`
    );
    setLikedShows(data.data.savedShows);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session?.user.email}`
      );
      setLikedShows(res.data.savedShows);
    };
    fetchData();
  }, [setLikedShows, session?.user.email]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&external_source=imdb_id`);
      setMovieDetail(data.data)
    }
    fetchData()
  }, [setMovieDetail, id])

  return (
    <div className="flex flex-col w-screen min-h-screen bg-black text-white gap-10">
      <Navbar />
      <div className="flex p-8 flex-col items-center lg:flex-row justify-center gap-3">
        <Image
          className="md:w-[550px] md:h-[450px] lg:w-[500px] lg:h-[700px]"
          src={`https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`}
          alt={movieDetail?.title}
          width="400"
          height="400"
          priority
        />
        <div className="flex flex-col w-[400px] h-auto md:w-[600px]  lg:md:h-[700px]   shadow-lg">
          <div className="p-6 flex flex-col justify-center">
            <h5 className="text-white text-xl font-medium mb-2">
              Title: {movieDetail?.title}
            </h5>
            <p className="text-white text-base mb-4">
              Overview: {movieDetail?.overview}
            </p>
            <div className="flex gap-3 text-white text-lg mb-4">
              Genres:
              {movieDetail?.genres.map((genre) => {
                return <p key={genre?.name}>{genre?.name}</p>;
              })}
            </div>
            <p className="text-white text-lg">Status: {movieDetail?.status}</p>
          </div>
          {session &&
            (likedID.includes(movieDetail?.id) ? (
              <button  onClick={() => unsave(movieDetail)} className="p-2.5 ml-6 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Unsave
              </button>
            ) : (
              <button onClick={() => save(movieDetail)} className="p-2.5 ml-6 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const data = await Axios.get(
//     `https://api.themoviedb.org/3/tv/${params.id}?api_key=2d51b506a3beb9405909693a289bed4b&language=en-US&external_source=imdb_id`
//   );

//   return {
//     props: {
//       movieDetail: data.data,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const data = await Axios.get(
//     `https://api.themoviedb.org/3/trending/tv/day?api_key=2d51b506a3beb9405909693a289bed4b`
//   );
//   return {
//     fallback: false,
//     paths: Array(1000000)
//       .fill(0)
//       .map((_, item) => ({
//         params: { id: item.toString() },
//       })),
//   };
// };
