import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVote, clearVotes, setVotes } from "./store/emojiSlice";
import Header from "./components/Header";
import Emoji from "./components/Emoji";
import ShowResultsButton from "./components/ShowResButton";
import ClearResButton from "./components/ClearResButton";
import { ReactComponent as Icon1 } from "./assets/smile.svg";
import { ReactComponent as Icon2 } from "./assets/laughtears.svg";
import { ReactComponent as Icon3 } from "./assets/sad.svg";
import "./index.css";

const iconMap = {
  smile: Icon1,
  laughtears: Icon2,
  sad: Icon3,
};

const initialEmojis = [
  { id: 1, name: "smile", votes: 0 },
  { id: 2, name: "laughtears", votes: 0 },
  { id: 3, name: "sad", votes: 0 },
];

const App = () => {
  const dispatch = useDispatch();
  const emojiList = useSelector((state) => state.emoji.emojiList);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("emojiVotes");
    if (stored) {
      dispatch(setVotes(JSON.parse(stored)));
    } else {
      dispatch(setVotes(initialEmojis));
    }
  }, [dispatch]);

  useEffect(() => {
    if (emojiList) {
      localStorage.setItem("emojiVotes", JSON.stringify(emojiList));
    }
  }, [emojiList]);

  const handleClick = (id) => {
    dispatch(incrementVote(id));
    setWinner(null);
  };

  const showResults = () => {
    if (!emojiList) return;
    const maxVotes = Math.max(...emojiList.map((e) => e.votes));
    const topEmojis = emojiList.filter(
      (e) => e.votes === maxVotes && maxVotes > 0
    );

    if (maxVotes === 0) setWinner({ text: "Не було проголосовано" });
    else if (topEmojis.length === 1) setWinner(topEmojis[0]);
    else setWinner({ text: "Нічия!" });
  };

  const clearVotesHandler = () => {
    dispatch(clearVotes());
    localStorage.removeItem("emojiVotes");
    setWinner(null);
  };

  if (!emojiList) return null;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
        <Header />
        <main className="card-body p-4">
          <h2 className="text-center mb-4">Клікніть на улюблений емодзі</h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 mb-4 justify-content-center">
            {emojiList.map((emoji) => {
              const Icon = iconMap[emoji.name];
              return (
                <div
                  className="col d-flex justify-content-center"
                  key={emoji.id}
                >
                  <Emoji
                    svgIcon={Icon}
                    votes={emoji.votes}
                    onClick={() => handleClick(emoji.id)}
                  />
                </div>
              );
            })}
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <ShowResultsButton onShow={showResults} />
            <ClearResButton onClear={clearVotesHandler} />
          </div>

          {winner && (
            <div
              className="alert alert-success text-center mt-4 border border-success"
              role="alert"
            >
              {winner.name ? (
                <>
                  <h3 className="alert-heading mb-2">Переможець:</h3>
                  <div style={{ margin: "0 auto" }}>
                    {React.createElement(iconMap[winner.name])}
                  </div>
                  <p className="lead mt-2">з {winner.votes} голосами!</p>
                </>
              ) : (
                <p className="display-6 mb-0">{winner.text}</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
