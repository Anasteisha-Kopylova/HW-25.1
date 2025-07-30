import React from "react";

class ShowResultsButton extends React.Component {
  render() {
    const { onShow } = this.props;
    return (
      <button
        onClick={onShow}
        className="btn btn-primary btn-lg w-100 w-sm-auto"
      >
        Показати результат
      </button>
    );
  }
}

export default ShowResultsButton;
