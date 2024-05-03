import { useState } from 'react'
import './App.css'

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
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"]
  ]
  
  const [maze, setMaze] = useState(initialMaze)

  function generateMaze(h, w){
    const matrix = []

    for (let i = 0; i < h; i++){
      let row = []
      for (let j = 0; j < w; j++){
        let cell = Math.random()
        row.push("wall");
      }
      matrix.push(row)
    }

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    function isCellValid(x, y) {
      return (
        y >= 0 && x >= 0 && x < w && y < h && matrix[y][x] === "wall"
      );
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
    setMaze(matrix);
  }
  return (
    <div className='maze-grid'>
      <button 
        onClick={() => generateMaze(10, 10)}
        className='maze-btn'>
        Refresh Maze
      </button>
      <div className='maze'>
        {maze.map((row, rowIdx) => (
          <div className="row" key={`${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <div className={`cell ${cell}`} 
                key={`${rowIdx}-${cellIdx}`}>
              </div>
            ))}
          </div>  
        ))}
      </div>
    </div>
  )
}
