import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [dataFilter, setDataFilter] = useState("");
  const [debouncedState, setDebouncedState] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState(dataFilter);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dataFilter]);

  useEffect(() => {
    const getData = async () => {
      const myData = await axios.get("http://localhost:3000/loaddata");
      setData(myData.data);
    };
    getData();
  }, []);

  const filterMovies = Object.values(data).filter(
    (e) =>
      e.Title.toLowerCase().includes(debouncedState.toLowerCase()) ||
      e.Genre.toLowerCase().includes(debouncedState.toLowerCase()),
  );

  return (
    <div>
      <h1>Movie Night</h1>
      <p>Search a movie and pick your seats</p>
      <br />
      <input type="text" onChange={(e) => setDataFilter(e.target.value)} />
      <hr />
      <div>Showing {filterMovies.length} results</div>
      <br />
      <div className="cards">
        {filterMovies.map((e) => {
          return (
            <div key={e.imdbID} className="card-container">
              <div
                style={{
                  backgroundImage: `url(${e.Images[0]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "200px",
                }}
                className="card-up"
              >
                <h2 style={{ color: "white" }}>{e.Title}</h2>
              </div>
              <div className="card-down">
                <span className="row">
                  <p>Year</p> <p>{e.Year}</p>{" "}
                </span>
                <span className="row">
                  <p>Runtime</p> <p>{e.Runtime}</p>{" "}
                </span>
                <span className="row">
                  <p>Genre</p> <p>{e.Genre}</p>{" "}
                </span>
                <span className="row">
                  <p>Language</p> <p>{e.Language}</p>{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
