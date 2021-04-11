import React from "react";

const ClockDate = ({actualDate}) => {

  return<>
  <h1>{actualDate.toLocaleDateString('pl-PL')}</h1>
  </>
}

export default ClockDate;
