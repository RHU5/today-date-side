import { call, put, takeLatest } from 'redux-saga/effects';
import { reqGetPost, reqGetPosts } from '../api/postApi';

// action.type config
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILED = 'GET_POST_FAILED';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_FAILED = 'GET_POSTS_FAILED';

const INIT_ISLOADING = 'INIT_ISLOADING';

// Action
export const getPostAction = (_id) => ({
  type: GET_POST,
  _id,
});

export const getPostsAction = (query) => ({
  type: GET_POSTS,
  query,
});

export const initIsLoading = () => ({
  type: INIT_ISLOADING,
});

// Worker
export function* sagaGetPost(action) {
  try {
    const {
      data: { post },
    } = yield call(reqGetPost, action._id);
    yield put({
      type: GET_POST_SUCCESS,
      post,
    });
  } catch (err) {
    console.log(`sagaGetPost Error 🚫 `, err);
    yield put({
      type: GET_POST_FAILED,
      error: err,
    });
  }
}

export function* sagaGetPosts(action) {
  try {
    const {
      data: { posts },
    } = yield call(reqGetPosts, action.query);
    yield put({
      type: GET_POSTS_SUCCESS,
      posts,
    });
  } catch (err) {
    console.log(`sagaGetPosts Error 🚫 `, err);
    yield put({
      type: GET_POSTS_FAILED,
      error: err,
    });
  }
}

// Init Value
export const initValue = {
  isLoading: true,
  post: null,
  posts: null,
  error: null,
};

// Reducer
export const postReducer = (state = initValue, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.post,
        error: null,
      };
    case GET_POST_FAILED:
      return {
        ...state,
        isLoading: false,
        post: null,
        error: action.error,
      };
    case GET_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
        error: null,
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        posts: null,
        error: action.error,
      };
    case INIT_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

// Watcher
export function* postWatcher() {
  yield takeLatest(GET_POST, sagaGetPost);
  yield takeLatest(GET_POSTS, sagaGetPosts);
}
