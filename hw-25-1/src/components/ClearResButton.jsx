import React from "react";

const ClearResButton = ({ onClear }) => (
  <button onClick={onClear} className="btn btn-danger btn-lg w-100 w-sm-auto">
    Очистити результат
  </button>
);

export default ClearResButton;
