import { getRandomInt, isEqualCoords } from "@/utils.js";

describe("utils.js", () => {
  it("isEqualCoords", () => {
    expect(isEqualCoords([1, 2], [3, 4])).toBeFalsy();
    expect(isEqualCoords([1, 2], [1, 2])).toBeTruthy();
  });
  it("getRandomInt", () => {
    for (let i = 0; i < 10; i++) {
      let result = getRandomInt(1, 5);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
    }
  });
});
