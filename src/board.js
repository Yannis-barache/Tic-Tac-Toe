import {Fragment} from "react";
import Square from "./square";
import {useState} from "react";
import './board.css';

export default function Board() {

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function resetGame() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    function handleClick(i) {
        const nextSquares = squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        if (xIsNext) {
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);

    }

    const winner = calculateWinner(squares);
    let status;
    if (squares.every(Boolean) && !winner) {
        status = 'Match nul';
    }
    else if (winner) {
        status = 'Gagnant: ' + winner;
    }
    else {
        status = "C'est au tour de: " + (xIsNext ? 'X' : 'O');
    }
   return (
    <Fragment>
        <div className='board'>
            <div className='status'>{status}</div>
            {Array(3).fill(null).map((_, i) => (
                <div className='board-row' key={i}>
                    {Array(3).fill(null).map((_, j) => {
                        const index = i * 3 + j;
                        return (
                            <Square
                                key={index}
                                value={squares[index]}
                                onSquareClick={() => handleClick(index)}
                            />
                        );
                    })}
                </div>
            ))}
            <button className='reset' onClick={resetGame}>Remettre à zéro</button>
        </div>
    </Fragment>
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}