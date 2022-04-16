import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import NavLinks from "../NavLinks/navLinks";

import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import MyAlbums from "../Albums";
import CreateAlbumModal from "../Albums/CreateAlbumModal/CreateAlbumForm";
import MySongs from "../Songs";
import CreateSongModal from "../Songs/CreateSongModal";
import { NavLink, useHistory } from "react-router-dom";
import AlbumSongs from "../Albums/albumSongs";
import AudioPlayerGlobal from "../NavLinks/audioPlayer";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const userInfo = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div>
          <MyAlbums userInfo={userInfo} />
          <NavLinks />
          <MySongs userInfo={userInfo} />
        </div>
        <div className="navDiv"></div>
      </>
    );
  } else {
    sessionLinks = (
      <div className="loginDiv">
        <LoginFormModal />
        <SignupFormModal />

        <div className="loginMessage">
          <h1 className="welcomeGreetingTop">Welcome to Heard-That!</h1>
          <h2>Login or Signup below to start listening</h2>
        </div>
      </div>
    );
  }

  if (sessionUser) {
    return (
      <>
        <ul className="navUl">
          <li className="navLi">{isLoaded && sessionLinks}</li>
        </ul>
      </>
    );
  } else
    return (
      <>
        <div className={"mainNav"}>
          <div className={"profileDiv"}>{isLoaded && sessionLinks}</div>÷
        </div>
      </>
    );
}

export default Navigation;
