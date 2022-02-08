import React from 'react';
import { NavLink}  from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import NavLinks from '../NavLinks/navLinks';
import CreateSongModal from '../CreateSongModal';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <div className="navDiv">
      <ProfileButton user={sessionUser} />
      <NavLinks />
      {/* <CreateSongModal /> */}
      </div>
    );
  } else {

    sessionLinks = (
      <>

        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>

    <ul className="navUl">
      <li className="navLi">
        {/* <NavLink exact to="/">Home</NavLink> */}

        {isLoaded && sessionLinks}
      </li>
    </ul>
    </>
  );
}

export default Navigation;
