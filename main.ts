const inquirer = require("inquirer");
const clear = require("clear");

const MARKER_X = "x";
const MARKER_O = "o";
const MAX_BOARD_SIZE = 3;

type MarkType = typeof MARKER_X | typeof MARKER_O;
type Board = string[][];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createBoard(): Board {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

function checkPositionParams(posX: number, posY: number): boolean {
  return (
    posX >= 0 && posY >= 0 && posX < MAX_BOARD_SIZE && posY < MAX_BOARD_SIZE
  );
}

function checkPositionIsAvailable(
  board: Board,
  posX: number,
  posY: number
): boolean {
  return board[posY][posX] === "";
}

function setMark(
  board: Board,
  posX: number,
  posY: number,
  mark: MarkType
): Board {
  const modifiedBoard = [...board];
  modifiedBoard[posY][posX] = mark;
  return modifiedBoard;
}

function isBoardFilled(board: Board): boolean {
  return board.flat().every((field) => field !== "");
}

function getEnemyMark(mark: MarkType): MarkType {
  return mark === MARKER_O ? MARKER_X : MARKER_O;
}

function enemyMove(board: Board, mark: MarkType): Board {
  const posX = getRandomInt(MAX_BOARD_SIZE);
  const posY = getRandomInt(MAX_BOARD_SIZE);

  if (!checkPositionIsAvailable(board, posX, posY)) {
    return enemyMove(board, mark);
  }

  return setMark(board, posX, posY, mark);
}

function validateInputPosition(val: number): boolean | string {
  if (val < 0 || val >= MAX_BOARD_SIZE) {
    return "Position must be more than 0 and less than 3";
  }

  return true;
}

async function main(): Promise<void> {
  clear();

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

  while (!isBoardFilled(board)) {
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
      break;
    }

    // if (!checkPositionParams(posX, posY)) {
    //     break;
    // }

    board = setMark(board, posX, posY, mark);

    // enemy move
    if (!isBoardFilled(board)) {
      board = enemyMove(board, enemyMark);
    }

    clear();
  }

  process.exit();
}

main();
