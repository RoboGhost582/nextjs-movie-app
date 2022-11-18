import Navbar from "../../comps/Navbar";
import Axios from "axios";
import Image from "next/image";

export default function Home({ movieDetail }) {
  console.log(movieDetail);
  return (
    <div className="flex flex-col w-screen min-h-screen bg-black text-white gap-10">
      <Navbar />
      <div className="flex gap-10 w-full h-full">
      <Image
          className="w-[250px] h-[250px] object-cover"
          src={`https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path}`}
          alt={movieDetail?.title}
          width="250"
          height="250"
        />
        <div>
          <p>Title: {movieDetail.title}</p>
          <p>Overview: {movieDetail.overview}</p>
          <p>Release Date: {movieDetail.release_date}</p>
          <p>${movieDetail.budget}</p>
          <p>Runtime: {movieDetail.runtime} minutes</p>
          <p>Status: {movieDetail.status}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await Axios.get(
    `https://api.themoviedb.org/3/movie/505642?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&external_source=imdb_id`
  );

  return {
    props: {
      movieDetail: data.data,
    },
  };
};
