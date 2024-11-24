import {useState} from "react";
import Square from "./Square";
import styles from "./Game2.module.scss";

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isNextX, setIsNextX] = useState(true);

    const checkWinner = () => {
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ];

        for (let combination of winnerCombinations) {
            const [a, b, c] = combination;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[b] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const setSquareValue = (i) => {
        if (checkWinner() || squares[i]) return;

        const newSquares = squares.slice();
        newSquares[i] = isNextX ? "X" : "O";
        setSquares(newSquares);
        setIsNextX(!isNextX);
    };

    const winner = checkWinner();
    const info = winner ? `Winner - ${winner}` : `Next - ${isNextX ? "X" : "O"}`;

    return (
        <div>
            <div className={styles.boxGame2}>
                <h2>{info}</h2>
                {squares.map((square, index) => (
                    <span key={index}>
            <Square
                value={square}
                setSquareValue={() => setSquareValue(index)}
            />
                        {(index === 2 || index === 5) && <br/>}
          </span>
                ))}
            </div>
            <div>
                {winner && (
                    <button className={styles.restart} onClick={() => window.location.reload()}>Play Again</button>
                )}
            </div>
        </div>
    );
}

export default Board;
