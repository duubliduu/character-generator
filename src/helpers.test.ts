import { determineMetaClass, orderTraits } from "./helpers";

const traits = {
  O: 1,
  C: 2,
  E: -3,
  A: 0,
  N: -1,
};

describe("orderTraits", () => {
  it("should order traits", () => {
    const [first, second, , , last] = orderTraits(traits);
    expect(first).toEqual(["E", -3]);
    expect(second).toEqual(["C", 2]);
    expect(last).toEqual(["A", 0]);
  });
});

describe("determineClass", () => {
  it("should return meta class based on traits", () => {
    expect(determineMetaClass(traits)).toEqual("Solo");
  });
});
