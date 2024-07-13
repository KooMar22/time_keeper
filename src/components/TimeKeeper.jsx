import { useState, useEffect } from "react";
import moment from "moment-timezone";
import timeZones from "./TimeZones";


function TimeKeeper() {
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("Europe/Zagreb");
  const [isMouseHover, setMouseHover] = useState(false)

  function setMouseOn() {
    setMouseHover(true)
  }

  function setMouseOut() {
    setMouseHover(false)
  }

  useEffect(() => {
    function updateTime() {
      const newTime = moment().tz(timeZone).format("LTS");
      setTime(newTime);
    }

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return (
    <div className="container">
      <h1 className="timeDisplay">{time}</h1>
      <select
        style={{backgroundColor: isMouseHover ? "gold" : "white"}}
        onMouseOver={setMouseOn}
        onMouseOut={setMouseOut}
        onChange={(e) => setTimeZone(e.target.value)} value={timeZone}>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeKeeper;