import axios from 'axios'

const apiKey = 'c78454e8e78bf0fb64f30fdb79d1ce1b'
const instance = axios.create({baseURL: `https://api.themoviedb.org/3/`,});

export type MovieResponseType = {
    budget: string;
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: number
    vote_average: number
    vote_count: number
}

export type RequestMovieType<D> = {
    page: number
    results: D
    total_pages: number
    total_results: number
}

export type MovieImagesArrayResponseType = {
    aspect_ratio: number
    file_path: string
    height: number
    iso_639_1: null
    vote_average: number
    vote_count: number
    width: number
}

export type MovieImagesResponseType = {
    backdrops: Array<MovieImagesArrayResponseType>
    id: null
    posters: Array<MovieImagesArrayResponseType>
}

export const moviesAPI = {
    searchMovie(query = ' ', page = 1) {
        return instance.get<RequestMovieType<MovieResponseType>>(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`).then(res => res.data)
    },
    getMovies(page = 1, query: string = 'upcoming') {
        return instance.get<RequestMovieType<MovieResponseType>>(`/movie/${query}?api_key=${apiKey}&page=${page}`).then(res => res.data)
    },

    getMovie(movie_id: number) {
        return instance.get(`/movie/${movie_id}?api_key=${apiKey}`).then(res => res)
    },
    getMovieImages(movie_id: number) {
        return instance.get<MovieImagesResponseType>(`/movie/${movie_id}/images?api_key=${apiKey}`).then(res => res.data)
    },
    getSimilarMovies(movie_id: number) {
        return instance.get<RequestMovieType<MovieResponseType>>(`/movie/${movie_id}/similar?api_key=${apiKey}`).then(res => res.data)
    },


}
