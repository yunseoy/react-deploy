import {useEffect, useRef, useState} from "react";
import useGameStore from "../stores/GameStore";

function Square({value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Game(){
  // react 의 hook 은 컴포넌트의 최상위 레벨에 존재해야한다. 조건문, 반복문, 함수안에서 사용 불가
  const {history, setHistory, currentMove, setCurrentMove} = useGameStore()
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0
  const winner = calculateWinner(currentSquares)
  const timer = useRef();

  useEffect(() => {
    let timerId;
    let count = 1;

    if(!winner){
      timerId = setInterval(() => {
        timer.current.textContent= count++ + '초'
      }, 1000)
    }

    // 클린업 함수 : 컴포넌트 언마운트 또는 deps 의 요소가 변경되어 다시 실행되기 전 호출
    return () => {
      console.log('게임 컴포넌트가 정리됩니다.')
      clearInterval(timerId)
    }
  }, [winner]);

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(idx){
    setCurrentMove(idx)
  }

  const moves = history.map((squares, idx) => {
    let description;
    description = 'Go to move #' + idx;
    return (
        <li key={idx}>
          <button onClick={() => jumpTo(idx)}>{description}</button>
        </li>
    );
  })

  return (
      <>
        <h3 id="timer" ref={timer}>Timer</h3>
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares}
                   onPlay={handlePlay}/>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </>

  );
}

function Board({xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " is win!!"
  } else {
    status = "next player is " + (xIsNext ? 'X' : 'O')
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if(nextSquares[i] || calculateWinner(squares)) return;
    if(xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }

    onPlay(nextSquares)
  }

  // jsx 문법
  return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


