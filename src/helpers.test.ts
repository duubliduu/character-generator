import { getSkills, types } from "./helpers";

describe("getSkills", () => {
  it("should", () => {
    const index = 5;
    const type = types[index];
    expect(getSkills("human", type)).toEqual([7, 6, 6, 7, 6]);
  });
});
