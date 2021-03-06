// react 최신 버전부터 import React 사용안함
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { authAction } from './reducers/userReducer';

import GlobalStyles from './GlobalStyles';
import Loader from './components/Loader';

import HomeContainer from './containers/HomeContainer';
import JoinContainer from './containers/JoinContainer';
import LoginContainer from './containers/LoginContainer';
import MypageContainer from './containers/MypageContainer';
import PostUploadContainer from './containers/PostUploadContainer';
import PostDetailContainer from './containers/PostDetailContainer';
import PostEditContainer from './containers/PostEditContainer';
import SearchContainer from './containers/SearchContainer';

const PrivateRoute = ({ component: Component, ...parentProps }) => {
  const { isLoggedIn, user } = useSelector((state) => state.userReducer);
  if (
    parentProps.computedMatch.params.id &&
    !user.post.includes(parentProps.computedMatch.params.id)
  ) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Route
        {...parentProps}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

const PublicRoute = ({ component: Component, ...parentProps }) => {
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  return (
    <>
      <Route
        {...parentProps}
        render={(props) =>
          !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

function App() {
  const { isLoading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/search" component={SearchContainer} />
        <PublicRoute path="/login" component={LoginContainer} />
        <PublicRoute path="/join" component={JoinContainer} />
        <PrivateRoute path="/mypage" component={MypageContainer} />
        <PrivateRoute path="/post/upload" component={PostUploadContainer} />
        <PrivateRoute path="/post/:id/edit" component={PostEditContainer} />
        <Route path="/post/:id" component={PostDetailContainer} />
        <Redirect from="*" to="/" />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
