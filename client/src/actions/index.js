import streams from '../apis/streams';
import history from '../history';
import db from '../components/firebase';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  // collection,
} from 'firebase/firestore';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

export const signIn = userId => {
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

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.post('/streams', { ...formValues, userId });

  //Destructuring response.data
  const { id } = response.data;
  //Add a new document to the collection

  const docRef = await setDoc(doc(db, 'streams', `${id}`), {
    ...formValues,
    id: response.data.id,
    userId: userId,
  });
  console.log(docRef);
  console.log(formValues);

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  const docRef = doc(db, 'streams', id);
  console.log(docRef);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  await updateDoc(docRef, {
    ...formValues,
    // id: response.data.id,
  });

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  await deleteDoc(doc(db, 'streams', id));

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
