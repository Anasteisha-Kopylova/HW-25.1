import React from "react";

class Emoji extends React.Component {
  render() {
    const { svgIcon: SvgIcon, votes, onClick } = this.props;
    return (
      <div
        className="card text-center p-3 shadow-sm card-emoji"
        style={{ width: "120px", cursor: "pointer" }}
        onClick={onClick}
      >
        <div className="card-body p-0">
          {SvgIcon ? <SvgIcon width={50} height={50} /> : null}
          <span className="text-muted fs-5 d-block mt-2">Голосів: {votes}</span>
        </div>
      </div>
    );
  }
}

export default Emoji;
