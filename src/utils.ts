import {
  MARKER_O,
  MARKER_X,
  MAX_BOARD_SIZE,
  WIN_COMBINATIONS,
} from "./constants";

type MarkType = typeof MARKER_X | typeof MARKER_O;
type Board = string[][];

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function createBoard(): Board {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

export function checkPositionParams(posX: number, posY: number): boolean {
  return (
    posX >= 0 && posY >= 0 && posX < MAX_BOARD_SIZE && posY < MAX_BOARD_SIZE
  );
}

export function checkPositionIsAvailable(
  board: Board,
  posX: number,
  posY: number
): boolean {
  return board[posY][posX] === "";
}

export function setMark(
  board: Board,
  posX: number,
  posY: number,
  mark: MarkType
): Board {
  const modifiedBoard = [...board];
  modifiedBoard[posY][posX] = mark;
  return modifiedBoard;
}

export function isBoardFilled(board: Board): boolean {
  return board.flat().every((field) => field !== "");
}

export function getEnemyMark(mark: MarkType): MarkType {
  return mark === MARKER_O ? MARKER_X : MARKER_O;
}

export function enemyMove(board: Board, mark: MarkType): Board {
  const posX = getRandomInt(MAX_BOARD_SIZE);
  const posY = getRandomInt(MAX_BOARD_SIZE);

  if (!checkPositionIsAvailable(board, posX, posY)) {
    return enemyMove(board, mark);
  }

  return setMark(board, posX, posY, mark);
}

export function validateInputPosition(val: number): boolean | string {
  if (val < 0 || val >= MAX_BOARD_SIZE) {
    return "Position must be more than 0 and less than 3";
  }

  return true;
}

export function checkWinning(board: Board, mark: MarkType): boolean {
  const filled = board
    .flat()
    .reduce(
      (acc: number[], value: string, i: number) =>
        value === mark ? [...acc, i] : acc,
      []
    );
  let result = false;

  for (const combination of WIN_COMBINATIONS) {
    if (combination.every((combIndex) => ~filled.indexOf(combIndex))) {
      result = true;
    }
  }

  return result;
}

export function getResult(isPlayerWin: boolean, isEnemyWin: boolean): string {
  if (isPlayerWin) return "You won!";
  else if (isEnemyWin) return "Enemy won!";

  return "Draw!";
}
