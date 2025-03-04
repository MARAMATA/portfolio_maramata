import axios from "axios";

export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

export const fetchProjects = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    axios.get("http://localhost:5000/api/projects/")
      .then(response => {
        dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: FETCH_PROJECTS_FAILURE, payload: error.message });
      });
  };
};

