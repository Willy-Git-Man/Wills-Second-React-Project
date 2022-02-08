import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSongThunk, getAllSongsThunk } from "../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./songs.css";

export default function MySongs({ userInfo }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const allSongs = useSelector((state) => state.songs.songs);
  const allSongsObjectKeys = Object.keys(allSongs)
  console.log("All Current Songs:", allSongs);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  const deleteDispatch = (songId) => {
    dispatch(deleteSongThunk(songId));
  };

  if (!Object.keys(allSongs).length) {
    return null
  } else
  return (
    <div className="songsMainDiv">
      <div className="songsDiv">
        {allSongsObjectKeys
          ?.filter((key) => allSongs[key]?.userId === userInfo.id) // filter out keys for correct user songs
          .map((key) => (

            // <h1>hello</h1>
            <div className="songListDiv" key={allSongs[key].id}>
              <ul className="songUl">

                <li className="songListItem">
                  <i className="fab fa-grav"></i>
                  {/* {song.songName} */}
                  {allSongs[key].songName}
                  {/* {allSongs[key].songName} */}


                </li>

                <li className="songListItem">
                  <i className="fab fa-grav"></i>
                  {allSongs[key].artistName}
                </li>

                <li className="songListItemUrl">
                  <i className="fab fa-grav"></i>
                  {allSongs[key].songUrl}
                </li>
              </ul>

              <AudioPlayer
                className="audioPlayer"
                // autoPlay
                src={allSongs[key] ? allSongs[key].songUrl : null}
                onPlay={(e) => console.log("onPlay")}
              />
              <img
                className="songImage"
                src={allSongs[key].imageUrl}
                alt="Sorry No go on the load yo"
              />

              <button
                className="deleteSongButton"
                onClick={() => deleteDispatch(allSongs[key].id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>

              <button
                className="updateSongButton"
                onClick={() => {
                  history.push(`/UpdateSongForm/${allSongs[key].id}`);
                }}
              >
                <i className="fas fa-wrench"></i>
              </button>

            </div>
          ))}
      </div>
    </div>
  );
}
