import { Info, Play } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useGetTrendingVideo from '../Hooks/useGetTrendingVideo';
import { useContentStore } from '../Store/content';
import { MOVIE_CATEGORIES, ORIGINAL_IMAGE_BASE_URL, TV_CATEGORIES } from '../Utils/Constants';
import Navbar from './Navbar';
import RecentWatch from './RecentWatch';
import Slider from './Slider';
const HomeScreen = () => {

    const {trendingVideo} = useGetTrendingVideo();
    const {contentType} = useContentStore();
    if (!trendingVideo) return (
        <div className="h-screen text-white relative">
            <Navbar />
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center -z-10 shimmer"></div>
        </div>
    );
    
  return (
    <>
    <div className='relative h-screen text-white'>
        <Navbar />

        <img src={ORIGINAL_IMAGE_BASE_URL + trendingVideo?.backdrop_path}
        className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        alt="extraction"
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-40' aria-hidden="true"></div>
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
            <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10"></div>
            <div className="max-w-2xl">
                <h1 className="mt-4 text-6xl font-extrabold text-balance">{trendingVideo?.title || trendingVideo?.name}</h1>
                <p className="mt-2 text-lg">
                    {trendingVideo?.release_date?.split("-")[0] ||
                    trendingVideo?.first_air_date.split("-")[0]}{" "}
                    | {trendingVideo?.adult ? "18+" : "PG-13"}
                </p>
                <p className="mt-4 text-lg">
                    {trendingVideo?.overview.length > 200
                    ? trendingVideo?.overview.slice(0, 200) + "..."
                    : trendingVideo?.overview}
                </p>
            </div>
            <div className="flex mt-8">
                <Link to={`/watch/${trendingVideo?.id}`} className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
					items-center">
                <Play className="size-6 mr-2 fill-black" />
                Play
                </Link>

                <Link to={`/watch/${trendingVideo?.id}`} className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">
                <Info className="size-6 mr-2" />
                More Info
                </Link>
            </div>
        </div>
    </div>
    <div className='flex flex-col gap-10 bg-black py-10'>
        <RecentWatch />
		{contentType === "movie"
		? MOVIE_CATEGORIES.map((category) => <Slider key={category} category={category} />)
		: TV_CATEGORIES.map((category) => <Slider key={category} category={category} />)}
	</div>
    </>
  );
};

export default HomeScreen;
