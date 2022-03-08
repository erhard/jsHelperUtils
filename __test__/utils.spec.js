/** @format */

import utils from "../index.js";
describe("sort", () => {
  test("sort with fildName alphabetical", () => {
    const arr = [{ name: "A" }, { name: "C" }, { name: "B" }];
    const res = utils.sortArrayByField({ array: arr, field: "name" });
    expect(res[0].name).toBe("A");
    expect(res[1].name).toBe("B");
    expect(res[2].name).toBe("C");
  });
});

describe("isObjectInArray", () => {
  it("should find the a String from an Array of Objects", () => {
    let findString = "test2";
    const objects = [
      { name: "test1", attr: "1" },
      { name: "test2", attr: "2" },
      { name: "test3", attr: "3" },
    ];
    expect(utils.isObjectInArray(objects, findString, "name")).toBeTruthy();

    findString = "test not found";
    expect(utils.isObjectInArray(objects, findString, "name")).toBeFalsy();
  });
});

describe("deepCopy", () => {
  it("should clone an deeply nested Opbject", () => {
    const obj = { a: "a", b: [{ c: 12 }, { d: 13 }] };
    const result = utils.deepCopy(obj);
    //not be an instance...
    expect(result).not.toBe(obj);
    //but the content should be the same
    expect(result).toEqual(obj);
  });
});

describe("delete Elements from Array", () => {
  it("should delete some Elements ", () => {
    const arr = ["A", "B", "C", "D", "E"];
    const delArr = ["C", "D"];
    const result = utils.deleteElArFromElAr(delArr, arr);
    console.log(result);
    expect(result).toEqual(["A", "B", "E"]);
  });
});

describe("find Object in Array", () => {
  it("should find an Object", () => {
    const arr = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];
    const result = utils.findObjectInArray(arr, "name", "C");
    expect(result).toBeTruthy();
  });

  it("should not find an Object", () => {
    const arr = [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }];
    const result = utils.findObjectInArray(arr, "name", "F");
    expect(result).toBeFalsy();
  });
});
