import React from "react";

class ClearResButton extends React.Component {
  render() {
    const { onClear } = this.props;

    return (
      <button
        onClick={onClear}
        className="btn btn-danger btn-lg w-100 w-sm-auto"
      >
        Очистити результат
      </button>
    );
  }
}

export default ClearResButton;
