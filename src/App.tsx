import { useState, useEffect } from "react";

type Position = [number, number];
type DistanceGrid = number[][];

function App() {
  const CELL_SIZE = 30;

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [distances, setDistances] = useState<DistanceGrid>([]);

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const newCols = Math.floor(width / CELL_SIZE) - 2;
      const newRows = Math.floor(height / CELL_SIZE) - 1;

      setCols(newCols);
      setRows(newRows);

      setDistances(
        Array(newRows)
          .fill(0)
          .map(() => Array(newCols).fill(0))
      );
    };

    updateGridSize();

    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

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
    return row >= 0 && row < rows && col >= 0 && col < cols;
  };

  const getBackgroundColor = (
    distance: number,
    row: number,
    col: number
  ): string => {
    const baseColor = (row + col) % 2 === 0 ? "white" : "black";
    if (distance === 0) return baseColor;

    const intensity = Math.max(0, 255 - distance * 10);
    return `rgb(${intensity}, ${intensity}, 150)`;
  };

  const calculateDistances = (startRow: number, startCol: number): void => {
    const newDistances = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(Infinity));
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
          gap: "1px",
          width: "100vw",
          height: "100%",
        }}
      >
        {distances.map((row, i) =>
          row.map((_col, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                backgroundColor: getBackgroundColor(distances[i][j], i, j),
                border: "1px solid lightgrey",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
              onClick={() => calculateDistances(i, j)}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "0.5em",
                  color: "black",
                }}
              >
                {distances[i][j] > 0 ? distances[i][j] : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
