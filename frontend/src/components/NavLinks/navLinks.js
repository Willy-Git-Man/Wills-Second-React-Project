import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateAlbumModal from "../Albums/CreateAlbumModal/CreateAlbumForm";
import CreateSongModal from "../Songs/CreateSongModal";
import ProfileButton from "./ProfileButton";
import SearchBar from "../SearchBar/SearchBar";

import "./navLinks.css";
import AudioPlayerGlobal from "./audioPlayer";
import AlbumNavLinks from "./albumNavlinks";

export default function NavLinks({ playing, setPlaying, pic }) {
  const userInfo = useSelector((state) => state.session.user);
  const allAlbums = Object.values(useSelector((state) => state.albums.albums));

  return (
    <>
      <div className="navLinkUpper">
        <NavLink
          className="logoTopLeft"
          activeClassName="logoTopLeft"
          to="/Albums/1"
        >
          <h1 className="logoH1">Heard-That</h1>
        </NavLink>
        <CreateAlbumModal userInfo={userInfo} />
        <CreateSongModal userInfo={userInfo} />

        <ProfileButton user={userInfo} />
        <span className="navUpperBottomLine"></span>
      </div>
      <div className="sideBarLower">


        <AlbumNavLinks allAlbums={allAlbums} />
        <SearchBar playing={playing} setPlaying={setPlaying} />
      </div>
    </>
  );
}
