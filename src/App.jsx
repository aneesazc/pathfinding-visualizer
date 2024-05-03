import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  let initialMaze = [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["start", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "end"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ];

  const [w, setW] = useState();
  const [h, setH] = useState();
  const [timeoutIds, setTimeoutIds] = useState([]);

  function bfs(startNode) {
    let q = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited";
            }
            return cell;
          }),
        ),
      );

      if (maze[y][x] === "end") {
        console.log("path found!");
        return true;
      }
      return false;
    }

    function step() {
      if (q.length === 0) {
        return;
      }

      const [x, y] = q.shift();
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (let [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < w &&
          ny >= 0 &&
          ny < h &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            q.push([nx, ny]);
          }
        }
      }
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step();
    return false;
    // return True/False
  }

  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);

      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited";
            }
            return cell;
          }),
        ),
      );
      if (maze[y][x] === "end") {
        console.log("path found!");
        return true;
      }
      return false;
    }

    function step() {
      if (stack.length === 0) {
        return;
      }
      const [x, y] = stack.pop();
      console.log("new step");
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < w &&
          ny >= 0 &&
          ny < h &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            stack.push([nx, ny]);
          }
        } // '2, 3'
      }
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step();
    return false;
  }

  const [maze, setMaze] = useState(initialMaze);

  function generateMaze(h, w) {
    const matrix = [];

    for (let i = 0; i < h; i++) {
      let row = [];
      for (let j = 0; j < w; j++) {
        let cell = Math.random();
        row.push("wall");
      }
      matrix.push(row);
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function isCellValid(x, y) {
      return y >= 0 && x >= 0 && x < w && y < h && matrix[y][x] === "wall";
    }

    function carvePath(x, y) {
      matrix[y][x] = "path";

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1);

    matrix[1][0] = "start";
    matrix[h - 2][w - 1] = "end";
    setH(matrix.length);
    setW(matrix[0].length);
    setMaze(matrix);
  }

  function refreshMaze() {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    generateMaze(14, 20);
  }

  useEffect(() => {
    generateMaze(14, 20);
  }, []);

  return (
    <div className="maze-grid">
      <div className="btns">
        <button onClick={refreshMaze} className="maze-btn">
          Refresh Maze
        </button>
        <button onClick={() => bfs([1, 0])} className="maze-btn">
          Start BFS
        </button>
        <button onClick={() => dfs([1, 0])} className="maze-btn">
          Start DFS
        </button>
      </div>
      <div className="maze">
        {maze.map((row, rowIdx) => (
          <div className="row" key={`${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <div
                className={`cell ${cell}`}
                key={`${rowIdx}-${cellIdx}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
