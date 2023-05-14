import {} from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Snake = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);

  //Funzione per controllare se la testa del serpente ha toccato il proprio corpo o i bordi del campo
  function checkCollision() {
    const head = snake[snake.length - 1];
    for (let i = 0; i < snake.length - 1; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    if (head[0] < 0 || head[0] > 9 || head[1] < 0 || head[1] > 9) {
      return true;
    }
    return false;
  }

  //Funzione per gestire il movimento del serpente
  function moveSnake() {
    const head = snake[snake.length - 1];
    let newHead;
    switch (direction) {
      case "right":
        newHead = [head[0], head[1] + 1];
        break;
      case "down":
        newHead = [head[0] + 1, head[1]];
        break;
      case "left":
        newHead = [head[0], head[1] - 1];
        break;
      case "up":
        newHead = [head[0] - 1, head[1]];
        break;
      default:
        return;
    }
    const newSnake = [...snake, newHead];
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
    } else {
      newSnake.shift();
    }
    setSnake(newSnake);
  }

  //Effetto per gestire il movimento del serpente
  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      if (checkCollision()) {
        setGameOver(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [snake, direction]);

  //Funzione per gestire la pressione dei tasti per cambiare direzione
  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
        if (direction !== "right") setDirection("left");
        break;
      case 38:
        if (direction !== "down") setDirection("up");
        break;
      case 39:
        if (direction !== "left") setDirection("right");
        break;
      case 40:
        if (direction !== "up") setDirection("down");
        break;
      default:
        return;
    }
  }

  return (
    <div className="Snake" tabIndex="0" onKeyDown={handleKeyDown}>
      {gameOver ? (
        <div className="GameOver">Game Over</div>
      ) : (
        <div className="Board">
          {Array.from({ length: 10 }).map((_, row) => (
            <div key={row} className="Row">
              {Array.from({ length: 10 }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`Cell ${
                    food[0] === row && food[1] === col ? "Food" : ""
                  } ${
                    snake.some((cell) => cell[0] === row && cell[1] === col)
                      ? "Snake"
                      : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Snake;