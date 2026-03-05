import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Seats.css";

function Seats() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const localData = localStorage.getItem("seats");
      if (localData) {
        setData(JSON.parse(localData));
      } else {
        const myData = await axios.get("http://localhost:3000/loadseats");
        localStorage.setItem("seats", JSON.stringify(myData.data));
        setData(myData.data);
      }
    };
    getData();
  }, []);

  const handleSeat = (seatId) => {
    const newData = { ...data };
    newData[id] = newData[id].map((s) => {
      if (s.id === seatId) {
        return { ...s, isTaken: !s.isTaken };
      }
      return s;
    });

    setData(newData);
    localStorage.setItem("seats", JSON.stringify(newData));
  };

  if (!data[id]) {
    return
  }

  return (
    <div className="seatsPage">
      <div className="sub">
        <div>
          <h1>Choose your seats</h1>
          <p>Movie details</p>
          <p>Movie ID:{id}</p>
        </div>
        <div>
          <span>🧧Taken</span>
          <span>📗Available</span>
        </div>
      </div>
      <div>
        {data[id].map((e, i) => {
          let row = Math.floor(i / 5) + 1;
          let col = (i % 5) + 1;
          return (
            <div
              className="seatStyle"
              key={`${id}-${e.id}`}
              onClick={() => handleSeat(e.id)}
            >
              R{row} C{col} {e.isTaken ? "🧧" : "📗"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Seats;
