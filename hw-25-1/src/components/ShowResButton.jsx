import React from "react";

const ShowResultsButton = ({ onShow }) => {
  return (
    <button onClick={onShow} className="btn btn-primary btn-lg w-100 w-sm-auto">
      Показати результат
    </button>
  );
};

export default ShowResultsButton;
