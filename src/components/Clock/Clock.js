import React, {useState, useEffect} from "react";
import ClockDate from "./ClockDate";
import ClockTime from "./ClockTime";

const Clock = () => {
  const [clockState, setClockState] = useState({
    date: new Date(),
  });

  useEffect(()=>{
      const intervalID = setInterval(() => {
          setClockState(()=> {
              return {
                  date: new Date()
              }
          })
      }, 60000)

      return () => {
        clearInterval(intervalID);
      }
  },[])

  return<>
    <div className="clock">
      <ClockTime actualTime={clockState.date} />
      <ClockDate actualDate={clockState.date} />
    </div>
  
    </>
}

export default Clock;
