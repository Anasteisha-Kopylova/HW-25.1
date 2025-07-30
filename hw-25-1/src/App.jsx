import React from "react";
import Header from "./components/Header";
import Emoji from "./components/Emoji";
import ShowResultsButton from "./components/ShowResButton";
import ClearResButton from "./components/ClearResButton";
import "./index.css";
import { ReactComponent as Icon1 } from "./assets/smile.svg";
import { ReactComponent as Icon2 } from "./assets/laughtears.svg";
import { ReactComponent as Icon3 } from "./assets/sad.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [
        { id: 1, SvgIcon: Icon1, votes: 0 },
        { id: 2, SvgIcon: Icon2, votes: 0 },
        { id: 3, SvgIcon: Icon3, votes: 0 },
      ],
      winningEmoji: null,
    };
  }

  componentDidMount() {
    try {
      const storedVotes = localStorage.getItem("emojiVotes");
      if (storedVotes) {
        const parsedVotes = JSON.parse(storedVotes);
        this.setState((prevState) => ({
          emojis: prevState.emojis.map((emoji) => ({
            ...emoji,
            votes: parsedVotes[emoji.id] || 0,
          })),
        }));
      }
    } catch (error) {
      console.error("Помилка завантаження з localStorage:", error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.emojis !== this.state.emojis) {
      try {
        const votesToStore = this.state.emojis.reduce((acc, emoji) => {
          acc[emoji.id] = emoji.votes;
          return acc;
        }, {});
        localStorage.setItem("emojiVotes", JSON.stringify(votesToStore));
      } catch (error) {
        console.error("Помилка зберігання даних в localStorage:", error);
      }
    }
  }

  handleEmojiClick = (id) => {
    this.setState((prevState) => ({
      emojis: prevState.emojis.map((emoji) =>
        emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
      ),
      winningEmoji: null,
    }));
  };

  showResults = () => {
    const { emojis } = this.state;
    const maxVotes = Math.max(...emojis.map((e) => e.votes));
    const winningEmojis = emojis.filter(
      (e) => e.votes === maxVotes && maxVotes > 0
    );

    if (maxVotes === 0) {
      this.setState({
        winningEmoji: { symbol: null, text: "Не було проголосовано" },
      });
    } else if (winningEmojis.length === 1) {
      this.setState({ winningEmoji: winningEmojis[0] });
    } else {
      this.setState({ winningEmoji: { symbol: null, text: "Нічия!" } });
    }
  };

  clearResults = () => {
    localStorage.removeItem("emojiVotes");
    this.setState({
      emojis: this.state.emojis.map((e) => ({ ...e, votes: 0 })),
      winningEmoji: null,
    });
  };

  render() {
    const { emojis, winningEmoji } = this.state;
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
        <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
          <Header />

          <main className="card-body p-4">
            <h2 className="text-center mb-4">Клікніть на улюблений емодзі</h2>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 mb-4 justify-content-center">
              {emojis.map((emoji) => (
                <div
                  className="col d-flex justify-content-center"
                  key={emoji.id}
                >
                  <Emoji
                    SvgIcon={emoji.SvgIcon}
                    votes={emoji.votes}
                    onClick={() => this.handleEmojiClick(emoji.id)}
                  />
                </div>
              ))}
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
              <ShowResultsButton onShow={this.showResults} />
              <ClearResButton onClear={this.clearResults} />
            </div>

            {winningEmoji && (
              <div
                className="alert alert-success text-center mt-4 border border-success"
                role="alert"
              >
                {winningEmoji.symbol === null ? (
                  <p className="display-6 mb-0">{winningEmoji.text}</p>
                ) : winningEmoji.SvgIcon ? (
                  <>
                    <h3 className="alert-heading mb-2">Переможець:</h3>
                    <div style={{ margin: "0 auto" }}>
                      <winningEmoji.SvgIcon />
                    </div>
                    <p className="lead mt-2">
                      з {winningEmoji.votes} голосами!
                    </p>
                  </>
                ) : (
                  <p className="display-6 mb-0">
                    {winningEmoji.text || "Нічия!"}
                  </p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
