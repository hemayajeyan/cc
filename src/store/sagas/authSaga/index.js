import { put, call } from 'redux-saga/effects';
import {  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, REGISTER_SUCCESS, VALIDATE_TOKEN_FAILURE, VALIDATE_TOKEN_SUCCESS } from '../../types/apiActionTypes';
import axios from 'axios';
import { getUserEndpoint, handlerEndpoint, loginUserEndpoint } from 'config/env';
import { destroyCookie, setCookie } from 'nookies';
import { validateTokenFailure, validateTokenSuccess } from 'store/actions/authAction';

export function* loginSaga(action) {
    try {
        const { email, password } = action.payload;
        const requestData = { url: loginUserEndpoint, payload: { email, password } }; 
        const response = yield call(axios.post, handlerEndpoint, requestData);
        const {token , id}=response.data
        console.log('==>t0',token);
        setCookie(null, 'token', token, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        setCookie(null, 'userId', id, {
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        if (response) {
            
            yield put({ type: LOGIN_SUCCESS, payload: response.data}); 
        } else {
            yield put({ type: LOGIN_FAILURE, error: response.error });
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, error: error.message });
    }
}

export function* validateTokenAndGetUserSaga(action) {
    const { token, userId, headers } = action.payload;
    console.log('==>',action.payload)
    if (!token || !userId) {
      yield put(validateTokenFailure('Token or userId is missing'));
      return;
    }
    try {
      const requestData = { url: getUserEndpoint(userId), payload: {} };
      const response = yield call(axios.get, requestData.url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          ...headers
        }
      });
      console.log('==>response',response.data)
      if (response.data) {
        yield put(validateTokenSuccess(response.data));
      } else {
        yield put(validateTokenFailure('No data in response'));
      }
    } catch (error) {
      console.error('Error validating token and getting user: ' + error.message);
      yield put(validateTokenFailure(error.message));
    }
  }
  
export function* registerSaga(action) {
    try {
        const response = yield call(axios.post, handlerEndpoint, { type: 'register', ...action.payload });
        if (response.success) {
            yield put({ type: REGISTER_SUCCESS, payload: { isAuthenticated: true, user: response.data } });
        } else {
            yield put({ type: LOGIN_FAILURE, error: response.error });
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, error: error.message });
    }
}

export function* logoutSaga(action) {
    try {
        destroyCookie(null, 'token', { path: '/' });
        destroyCookie(null, 'userId', { path: '/' });
        yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE, error: error.message });
    }
}