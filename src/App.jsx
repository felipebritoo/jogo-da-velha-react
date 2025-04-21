import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button className={`square ${isWinner ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winnerLine, setWinnerLine] = useState(null);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || winnerLine) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
      const winningLine = lines.find(([a, b, c]) =>
        nextSquares[a] === winner && nextSquares[b] === winner && nextSquares[c] === winner
      );
      setWinnerLine(winningLine);
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinnerLine(null);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (squares.every((square) => square !== null)) {
    status = 'Empate!';
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-grid">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            isWinner={winnerLine && winnerLine.includes(i)}
          />
        ))}
      </div>
      <div className="scores">
        Placar: X - {scores.X} | O - {scores.O}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reiniciar Jogo
      </button>
      {(winner || squares.every((square) => square !== null)) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{winner ? `Parabéns, ${winner} venceu!` : 'Jogo empatado!'}</h2>
            <button onClick={resetGame}>Jogar Novamente</button>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  return (
    <div>
      <h1>Jogo da Velha</h1>
      <Board />
    </div>
  );
}