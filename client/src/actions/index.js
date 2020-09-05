import streams from "../apis/streams";
import history from "../reducers/history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//CREATE RECORD
//createStream is sent to components -->streams--->StreamCreate
export const createStream = (formValues) => async (dispatch, getState) => {
  //getState will take you to reduxstore -->authReducer
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  //receives the submite request with all the info like title and descr. and then dispatch it
  dispatch({ type: CREATE_STREAM, payload: response.data });
  //Do some programmatic navigation to
  // get the user back to streamlist page
  history.push("/");
};

//LIST ALL RECORDS
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

//GET PARTICULAR RECORD
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//UPDATE RECORD
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

//DELETE RECORD
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
