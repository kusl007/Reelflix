import { setTvInfo } from "../reducers/tvSlice";
export { clearTvInfo } from "../reducers/tvSlice";
import axios from "../../utils/axios";

export const fetchTvDetails = (tvId) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${tvId}`);
    const externalId = await axios.get(`/tv/${tvId}/external_ids`);
    const recommendations = await axios.get(`/tv/${tvId}/recommendations`);
    const similar = await axios.get(`/tv/${tvId}/similar`);
    const videos = await axios.get(`/tv/${tvId}/videos`);
    const translations = await axios.get(`/tv/${tvId}/translations`);
    const watchProviders = await axios.get(`/tv/${tvId}/watch/providers`);

    let ultimateData = {
      detail: detail.data,
      externalId: externalId.data,
      translations: translations.data.translations,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(setTvInfo(ultimateData));
  } catch (error) {
    console.error("error :: tvFetching : ", error.message);
  }
};
