import { setPeopleInfo } from "../reducers/peopleSlice";
export { clearPeopleInfo } from "../reducers/peopleSlice";
import axios from "../../utils/axios";

export const fetchPeopleDetails = (personId) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${personId}`);
    const externalId = await axios.get(`/person/${personId}/external_ids`);
    const combinedCredits = await axios.get(
      `/person/${personId}/combined_credits`
    );
    const movieCredits = await axios.get(`/person/${personId}/movie_credits`);
    const tvCredits = await axios.get(`/person/${personId}/tv_credits`);

    let ultimateData = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };
    dispatch(setPeopleInfo(ultimateData));
  } catch (error) {
    console.error("error :: personFetching : ", error.message);
  }
};
