import { setMovieInfo } from "../reducers/moviesSlice";
export { clearMovieInfo } from "../reducers/moviesSlice";
import axios from "../../utils/axios";

export const fetchMovieDetails = (movieId) => async (dispatch, getState) => {
  
 try {
    const detail = await axios.get(`/movie/${movieId}`)
    const externalId = await axios.get(`/movie/${movieId}/external_ids`)
    const recommendations = await axios.get(`/movie/${movieId}/recommendations`)
    const similar = await axios.get(`/movie/${movieId}/similar`)
    const videos = await axios.get(`/movie/${movieId}/videos`)
    const translations = await axios.get(`/movie/${movieId}/translations`)
    const watchProviders = await axios.get(`/movie/${movieId}/watch/providers`)
    

    let ultimateData = {
        detail : detail.data,
        externalId : externalId.data,
        translations:translations.data.translations,
        recommendations : recommendations.data.results,
        similar : similar.data.results,
        videos : videos.data.results.find(m=>m.type=='Trailer'),
        watchProviders : watchProviders.data.results.IN
    }
    dispatch(setMovieInfo(ultimateData))
 } catch (error) {
    console.error('error :: movieFetching : ',error.message)
 }
};
