import { createBoard } from "../utils";

describe("utils", () => {
  describe("createBoard", () => {
    it("returns array of array with 3 elements", () => {
      const board = createBoard();
      expect(board.length).toBe(3);
      expect(board.flat().length).toBe(9);
    });
  });
});
