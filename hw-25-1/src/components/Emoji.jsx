import React from "react";

const Emoji = ({ svgIcon: SvgIcon, votes, onClick }) => {
  return (
    <div
      className="card text-center p-3 shadow-sm card-emoji"
      style={{ width: "120px", cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card-body p-0">
        {SvgIcon && <SvgIcon width={50} height={50} />}
        <span className="text-muted fs-5 d-block mt-2">Голосів: {votes}</span>
      </div>
    </div>
  );
};

export default Emoji;
