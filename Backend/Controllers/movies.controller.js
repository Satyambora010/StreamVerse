import { fetchFromTMDB } from "../Services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        res.status(200).json(randomMovie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export async function getMovieTrailer(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        const trailer = data.results;
        res.status(200).json(trailer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export async function getMovieDetails(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export async function getSimilarMovies(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


