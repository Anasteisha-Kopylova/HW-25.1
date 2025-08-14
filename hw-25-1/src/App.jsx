import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Emoji from "./components/Emoji";
import ShowResultsButton from "./components/ShowResButton";
import ClearResButton from "./components/ClearResButton";
import "./index.css";
import { ReactComponent as Icon1 } from "./assets/smile.svg";
import { ReactComponent as Icon2 } from "./assets/laughtears.svg";
import { ReactComponent as Icon3 } from "./assets/sad.svg";
import { setEmojis, incrementVote, clearVotes } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  const emojiList = useSelector((state) => state.emojiList);
  const [winner, setWinner] = useState(null);
  const [isVotesLoaded, setIsVotesLoaded] = useState(false);

  useEffect(() => {
    const initialEmojis = [
      { id: 1, svgIcon: Icon1, votes: 0 },
      { id: 2, svgIcon: Icon2, votes: 0 },
      { id: 3, svgIcon: Icon3, votes: 0 },
    ];

    const stored = localStorage.getItem("emojiVotes");
    if (stored) {
      const parsed = JSON.parse(stored);
      initialEmojis.forEach((emoji) => {
        emoji.votes = parsed[emoji.id] || 0;
      });
    }

    dispatch(setEmojis(initialEmojis));
    setIsVotesLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isVotesLoaded) return;
    const votes = emojiList.reduce((acc, emoji) => {
      acc[emoji.id] = emoji.votes;
      return acc;
    }, {});
    localStorage.setItem("emojiVotes", JSON.stringify(votes));
  }, [emojiList, isVotesLoaded]);

  const handleClick = (id) => {
    dispatch(incrementVote(id));
    setWinner(null);
  };

  const showResults = () => {
    const max = Math.max(...emojiList.map((emoji) => emoji.votes));
    const top = emojiList.filter((emoji) => emoji.votes === max && max > 0);

    if (max === 0) {
      setWinner({ svgIcon: null, text: "Не було проголосовано" });
    } else if (top.length === 1) {
      setWinner(top[0]);
    } else {
      setWinner({ svgIcon: null, text: "Нічия!" });
    }
  };

  const clearVotesHandler = () => {
    localStorage.removeItem("emojiVotes");
    dispatch(clearVotes());
    setWinner(null);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
        <Header />
        <main className="card-body p-4">
          <h2 className="text-center mb-4">Клікніть на улюблений емодзі</h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 mb-4 justify-content-center">
            {emojiList.map((emoji) => (
              <div className="col d-flex justify-content-center" key={emoji.id}>
                <Emoji
                  svgIcon={emoji.svgIcon}
                  votes={emoji.votes}
                  onClick={() => handleClick(emoji.id)}
                />
              </div>
            ))}
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <ShowResultsButton onShow={showResults} />
            <ClearResButton onClear={clearVotesHandler} />
          </div>
          {winner && (
            <div className="alert alert-success text-center mt-4 border border-success" role="alert">
              {winner.svgIcon === null ? (
                <p className="display-6 mb-0">{winner.text}</p>
              ) : winner.svgIcon ? (
                <>
                  <h3 className="alert-heading mb-2">Переможець:</h3>
                  <div style={{ margin: "0 auto" }}>
                    <winner.svgIcon />
                  </div>
                  <p className="lead mt-2">з {winner.votes} голосами!</p>
                </>
              ) : (
                <p className="display-6 mb-0">{winner.text || "Нічия!"}</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
