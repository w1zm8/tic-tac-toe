import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import clear from "clear";
import { MARKER_O, MARKER_X } from "./constants";
import {
  getEnemyMark,
  createBoard,
  isBoardFilled,
  validateInputPosition,
  checkPositionIsAvailable,
  setMark,
  enemyMove,
  checkWinning,
  getResult,
} from "./utils";

async function main(): Promise<void> {
  clear();
  console.log(figlet.textSync("Tic Tac Toe"));

  const { mark } = await inquirer.prompt([
    {
      name: "mark",
      type: "list",
      message: "Please, choose your mark: ",
      choices: [MARKER_O, MARKER_X],
    },
  ]);
  const enemyMark = getEnemyMark(mark);
  let board = createBoard();
  let isPlayerWin = false;
  let isEnemyWin = false;

  clear();

  while (!isBoardFilled(board)) {
    console.log(figlet.textSync("Tic Tac Toe"));
    console.table(board);

    const { posX, posY } = await inquirer.prompt([
      {
        name: "posX",
        message: "Choose position X for your mark: ",
        validate: validateInputPosition,
      },
      {
        name: "posY",
        message: "Choose position Y for your mark: ",
        validate: validateInputPosition,
      },
    ]);

    if (!checkPositionIsAvailable(board, posX, posY)) {
      console.error("This position is already filled");
      continue;
    }

    board = setMark(board, posX, posY, mark);

    // enemy move
    if (!isBoardFilled(board)) {
      board = enemyMove(board, enemyMark);
    }

    clear();

    isPlayerWin = checkWinning(board, mark);
    isEnemyWin = checkWinning(board, enemyMark);

    if (isPlayerWin || isEnemyWin) {
      break;
    }
  }

  console.log(figlet.textSync("Tic Tac Toe"));
  console.table(board);
  console.log(chalk.magenta.bold(getResult(isPlayerWin, isEnemyWin)));

  process.exit();
}

main();
