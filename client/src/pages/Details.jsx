import { useNavigate, useParams } from "react-router-dom";
import "./Details.css";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const myVideos = JSON.parse(localStorage.getItem("videos"));
  const video = myVideos.find((v) => v.imdbID === id);

  return (
    <div className="detaisPage">
      <div className="button" onClick={() => navigate("/")}>← Back</div>
      <div className="rowSpan">
        <span>
          <h1>{video.Title}</h1>
        </span>
        <span>({video.Year})</span>
      </div>
      <p>Pick your seats and enjoy </p>
      <div className="detais">
        <div>
          <img style={{height: "440px", width: "440px"}} src={video.Images[2]} alt="video Poster" />
        </div>
        <div>
          <div className="rowSpan">
            <span className="border">IMDb:{video.imdbRating}</span>
            <span className="border">Votes:{video.imdbVotes}</span>
            <span className="border">Metascore:{video.Metascore}</span>
            <span className="border">genres:{video.Genre}</span>
          </div>
          <div>
            <h3>Story</h3>
            <p>{video.Plot}</p>
          </div>
          <div className="button" onClick={() => navigate(`/Seats/${video.imdbID}`)}>choose seats</div>
        
        </div>
      </div>
    </div>
  );
}

export default Details;
