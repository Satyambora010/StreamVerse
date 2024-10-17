import User from "../Models/user.model.js";
import { fetchFromTMDB } from "../Services/tmdb.service.js";
export const saveRecentWatch = async (req, res) => {
    const { videoId, userId } = req.body;

    if (!videoId || !userId) {
        return res.status(400).json({ message: "Video ID and User ID are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the video is already in the recentlyWatched array
        const videoExists = user.recentlyWatched.includes(videoId);

        if (!videoExists) {
            // Add videoId to the recentlyWatched array
            user.recentlyWatched.push(videoId);

            // Limit the array to the last 10 entries
            if (user.recentlyWatched.length > 10) {
                user.recentlyWatched.shift(); // Remove the oldest video
            }
        }

        await user.save();
        res.status(200).json({ message: "Recent watch saved" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentWatch = async (req, res) => {
    const { userId } = req.query;
    
    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Fetch user from the database
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const videoIds = user.recentlyWatched;
        const contentPromises = videoIds.map(async (videoId) => {
            try {
                // First, try fetching it as a movie
                const movieData = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${videoId}?language=en-US`);
                if (movieData) return movieData;

                // If not a movie, fetch it as a TV show
                const tvData = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${videoId}?language=en-US`);
                return tvData || null; // Return null if neither exists
            } catch (error) {
                return null; // Handle any errors during fetch
            }
        });

        // Resolve all promises concurrently
        const content = await Promise.all(contentPromises);

        // Filter out any null results (failed fetches)
        const validContent = content.filter(item => item !== null);

        // Return the list of content
        res.status(200).json(validContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};