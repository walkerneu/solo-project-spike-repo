import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllGenres(){
    try {
        const response = yield axios.get('/api/genres');
        yield put({
          type: 'SET_GENRES',
          payload: response.data
        });
      } catch (error) {
        console.log('fetchAllGenres error:', error);
      }
}

function* genresSaga() {
    yield takeLatest('SAGA/GET_GENRES', getAllGenres);
  }
  
  export default genresSaga;