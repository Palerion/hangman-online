import React, { Component } from "react";
import "./HangmanGame.css";

class HangmanGame extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const wordBank = [
      "HELLO",
      "REACT",
      "HANGMAN",
      "AVENUE",
      "COMPUTER",
      "AWKWARD",
      "JAZZ",
      "FLUFF",
      "LYMPH",
      "NIGHTCLUB",
      "VOODOO",
      "GALAXY",
      "BIKINI",
      "IVORY",
      "GALVANIZE",
      "SPHINX",
      "EMBEZZLE",
      "QUORUM",
      "CREATE",
      "MINIMUM",
      "OPAQUE",
      "ORANGE",
      "VISION",
    ];
    const word = wordBank[Math.floor(Math.random() * wordBank.length)];

    return {
      word,
      guesses: [],
      attempts: 10,
      errorMessage: "",
    };
  };

  resetGame = () => {
    this.setState(this.getInitialState());
  };

  guessLetter = (event) => {
    const letter = event.target.value.toUpperCase();
    event.target.value = "";

    const letters = this.state.word.split("").map((letter) => {
      return this.state.guesses.includes(letter) ? letter : "_";
    });

    // Prevent guessing if game is over
    if (this.state.attempts === 0 || !letters.includes("_")) {
      return;
    }

    if (!this.state.guesses.includes(letter)) {
      this.setState((state) => {
        const newAttempts = state.word.includes(letter)
          ? state.attempts
          : state.attempts - 1;
        return {
          guesses: state.guesses.concat(letter),
          attempts: newAttempts,
          errorMessage: "",
        };
      });
    } else {
      this.setState({ errorMessage: "You've already guessed that letter!" });
    }
  };

  render() {
    const hangmanParts = [
      () => <path key="6" d="M10 20 H90" stroke="black" />, // top of the pole
      () => <path key="7" d="M50 20 V80" stroke="black" />, // rope
      () => <path key="8" d="M10 20 V300" stroke="black" />, // pole
      () => <path key="9" d="M0 300 H120" stroke="black" />, // platform
      () => <circle key="0" cx="50" cy="110" r="30" />, // head
      () => <path key="1" d="M50 140 V190" stroke="black" />, // body
      () => <path key="2" d="M50 160 L30 180" stroke="black" />, // left arm
      () => <path key="3" d="M50 160 L70 180" stroke="black" />, // right arm
      () => <path key="4" d="M50 190 L30 220" stroke="black" />, // left leg
      () => <path key="5" d="M50 190 L70 220" stroke="black" />, // right leg
    ];

    const hangmanDisplay = hangmanParts
      .slice(0, 10 - this.state.attempts)
      .reverse()
      .map((part) => part());

    const letters = this.state.word
      .split("")
      .map((letter, index) => {
        return this.state.guesses.includes(letter) ? letter : "_";
      })
      .join(" ");

    const guessedLetters = this.state.guesses.join(", ");

    return (
      <div className="HangmanGame">
        <h1 className="title">Hangman Online</h1>
        <svg width="200" height="200" viewBox="0 0 200 350">
          {hangmanDisplay}
        </svg>
        <p>{letters}</p>
        <p>Attempts remaining: {this.state.attempts}</p>
        <input type="text" maxLength="1" onChange={this.guessLetter} />
        <button onClick={this.resetGame}>Reset</button>
        <p>Guessed letters: {guessedLetters}</p>
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        {this.state.attempts === 0 && (
          <p>
            YOU LOSE! The word was {this.state.word}. Press Reset to play again
          </p>
        )}
        {!letters.includes("_") && <p>YOU WON! Press Reset to play again</p>}
      </div>
    );
  }
}

export default HangmanGame;
