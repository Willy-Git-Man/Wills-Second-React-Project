import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import Songs from "./components/Songs";
import AlbumSongs from "./components/Albums/albumSongs";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginFormModal from "./components/Auth/LoginFormModal";
import SignupFormModal from "./components/Auth/SignupFormModal";
import { getAllAlbumsThunk } from "./store/albums";
import LoginRoute from "./components/Auth/LoginRoute";
export const PlayingContext = React.createContext();

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // dispatch(getAllAlbumsThunk());
  // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  useEffect(() => {
    dispatch(getAllAlbumsThunk());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const userInfo = useSelector((state) => state.session.user);
  const albumState = useSelector((state) => state.albums.albums);

  // const songInfo = useSele/ctor((state) => state.songs);
  //TODO: THIS LINE ^ IS KEEPING CAROUSEL WORKING

  if (!userInfo)
    return (
      <>
        <LoginRoute />
      </>
    );

  return (
    <>

      <Switch>

        <ProtectedRoute exact path="/Albums/:id">
          <AlbumSongs userInfo={userInfo} albumState={albumState} />
        </ProtectedRoute>
        <ProtectedRoute path="/">
          <>
            <Redirect to="/Albums/1" />
          </>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
