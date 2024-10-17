import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/authUser";
import { SMALL_IMAGE_BASE_URL } from "../Utils/Constants";

const RecentWatch = () => {
    const {user} = useAuthStore();
    const [videos, setVideos] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const sliderRef = useRef(null);
    const scrollLeft = () => {
        if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
    }
    const scrollRight = () => {
        if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
		}
    }
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`/api/recent/get`, {
                    params: { userId: user._id }, // Send userId as a query parameter
                });
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
    
        fetchVideos();
    }, [user._id]); 
    if(videos.length === 0){
        return null;
    }
  
return (
    <div className='bg-black text-white relative px-5 md:px-20'
    onMouseEnter={() => setShowArrow(true)}
    onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className='text-xl font-bold py-5'>
        Continue Watching
      </h2>
      <div className="flex gap-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
            {videos.map((item) => (
                <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                    <div className="rounded-lg overflow-hidden">
                        <img src={SMALL_IMAGE_BASE_URL+item.backdrop_path} alt={item.title} className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
                    </div>
                    <p className="mt-2 text-center text-sm font-bold">
                        {item.title || item.name}
                    </p>
                </Link>
            ))}
      </div>
      {showArrow && (
        <>
        <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
        onClick={() => scrollLeft()}>
            <ChevronLeft size={24} />
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
        onClick={() => scrollRight()}>
            <ChevronRight size={24} />
        </button>
        </>
      )}
    </div>
  );
};

export default RecentWatch;
