import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContentStore } from '../Store/content';

const useGetTrendingVideo = () => {
    const [trendingVideo, setTrendingVideo] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        const fetchTrendingVideo = async () => {
            const response = await axios.get(`/api/${contentType}/trending`);
            setTrendingVideo(response.data);
        }
        fetchTrendingVideo();
    },[contentType])
  
    return {trendingVideo};
};

export default useGetTrendingVideo;
