import React, {Component} from "react";

const ClockTime = ({actualTime}) => {

  return<>
  <h1>{actualTime.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'})}</h1>
  </>
}

export default ClockTime;