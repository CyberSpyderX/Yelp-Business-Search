import {put, takeEvery, all, call, select} from 'redux-saga/effects';
import {getData} from '../networking/APIRequests';

export function* getNearbyData() {
  try {
    const locationData = yield select(state => state.dataReducer.locationData);

    yield put({type: 'SET_REQUESTING_STATE'});
    const nearbyData = yield call(getData, locationData, 'NEARBY');

    yield put({type: 'SET_NEARBY_DATA', payload: nearbyData});
    yield put({type: 'SET_SUCCESS_STATE'});
  } catch {}
}

export function* getFeaturedData(action) {
  try {
    yield put({type: 'SET_CATEGORY', payload: 'FEATURED'});

    yield put({type: 'SET_REQUESTING_STATE'});
    const featuredData = yield call(getData, action.payload, 'FEATURED');

    yield put({type: 'SET_FEATURED_DATA', payload: featuredData});
    yield put({type: 'SET_SUCCESS_STATE'});
  } catch {}
}

export default function* rootSaga() {
  yield takeEvery('GET_NEARBY_DATA', getNearbyData);
  yield takeEvery('GET_FEATURED_DATA', getFeaturedData);
}
