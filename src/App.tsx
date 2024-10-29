import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const BOARD_SIZE = 50;

  const [distances, setDistances] = useState(
    Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(0))
  );

  const KNIGHT_MOVES = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  const isValidPosition = (row, col) => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  };
  let my2DArray = Array(BOARD_SIZE)
    .fill(0)
    .map(() => Array(BOARD_SIZE).fill(0));
  console.log(my2DArray);

  const getBackgroundColor = (distance) => {
    const intensity = Math.max(0, 255 - distance * 10);
    return `rgb(${intensity}, ${intensity}, 150)`;
  };

  const calculateDistances = (startRow, startCol) => {
    const newDistances = Array(BOARD_SIZE)
      .fill(0)
      .map(() => Array(BOARD_SIZE).fill(Infinity));
    newDistances[startRow][startCol] = 0;

    const queue = [[startRow, startCol]];

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift();
      const currentDistance = newDistances[currentRow][currentCol];

      for (const [moveRow, moveCol] of KNIGHT_MOVES) {
        const newRow = currentRow + moveRow;
        const newCol = currentCol + moveCol;

        if (
          isValidPosition(newRow, newCol) &&
          newDistances[newRow][newCol] === Infinity
        ) {
          newDistances[newRow][newCol] = currentDistance + 1;
          queue.push([newRow, newCol]);
        }
      }
    }

    setDistances(newDistances);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {my2DArray &&
          my2DArray.map((row, i) => (
            <div style={{}}>
              {row.map((col, j) => (
                <div
                  style={{
                    backgroundColor: getBackgroundColor(distances[i][j]),
                    border: "1px lightgrey solid",
                    width: "1em",
                    height: "1em",
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      fontSize: "0.8em",
                      color: "black",
                    }}
                    onClick={() => calculateDistances(i, j)}
                  >
                    {distances[i][j]}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* <div className="card">
        <button onClick={() => setBOARD_SIZE((BOARD_SIZE) => BOARD_SIZE + 1)}>
          BOARD_SIZE is {BOARD_SIZE}
        </button>
      </div> */}
    </>
  );
}

export default App;
