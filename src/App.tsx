import { useState } from "react";

type Position = [number, number];
type DistanceGrid = number[][];

function App() {
  const BOARD_SIZE = 50;

  const [distances, setDistances] = useState<DistanceGrid>(
    Array(BOARD_SIZE)
      .fill(0)
      .map(() => Array(BOARD_SIZE).fill(0))
  );

  const KNIGHT_MOVES: Position[] = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  };

  const getBackgroundColor = (distance: number): string => {
    const intensity = Math.max(0, 255 - distance * 10);
    return `rgb(${intensity}, ${intensity}, 150)`;
  };

  const calculateDistances = (startRow: number, startCol: number): void => {
    const newDistances = Array(BOARD_SIZE)
      .fill(0)
      .map(() => Array(BOARD_SIZE).fill(Infinity));
    newDistances[startRow][startCol] = 0;

    const queue: Position[] = [[startRow, startCol]];

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift()!;
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
        {distances &&
          distances.map((row, i) => (
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
    </>
  );
}

export default App;
