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


describe('getIndex of Object in Array',()=> {
it('should get the Index of Ute', ()=>{
const arr = [
 {name: "franz", alter: 12},
 {name: "Ute", alter: 33}, 
 {name:"Sabine", alter: 99}
]
const index = utils.getIndexOfObjectInArray(arr, "name", "ute");
expect(index).toBe(1);
})
})

describe('findMultiple',()=> {
const arr = [
 {name: "franz", alter: 12},
 {name: "Ute", alter: 33}, 
 {name:"Sabine", alter: 99},
 {name: "Ute", alter: 200}, 
]
it('should find twice casesensitive', ()=>{
const index_arr = utils.findMultiple(arr, "name", "Ute");
expect(index_arr).toEqual([1,3]);
})

it('should find twice caseinsensitive', ()=>{
const index_arr = utils.findMultiple(arr, "name", "ute",true);
expect(index_arr).toEqual([1,3]);
})



})

describe('make array unique',()=> {
it('should make an array unique', ()=>{
  const arr = ["1", 1, 2, 3, "4", 4, "4"]
  const result = utils.makeArrayUnique(arr)
  expect(result.sort()).toEqual(["1",1,2,3,"4",4].sort())
})
})


describe('replaceElementsInArray', ()=>{
  it('should replace all occurances of ute with gabi', ()=>{
     let array = [
      {name: "Peter", data: "1"},
      {name: "Ute", data: "2"},
      {name: "Peter", data: "3"},
      {name: "Ute", data: "4"}]
      const result = utils.replaceArrayElementsBy(array,
        {name: "Gabi", data: 12}, "name", "Ute")
        
      expect(result).toEqual([
        {name: "Peter", data: "1"},
        {name: "Gabi", data: 12},
        {name: "Peter", data: "3"},
        {name: "Gabi", data: 12}


      ])
  })
})




describe('role based selection',()=> {
//example is a menu creating
   it('should recurce the roles', ()=>{
  const roles =createFakeRoles()
  const result = utils.recurseTree("admin",roles)
  expect(result.sort()).toEqual(["admin", "group1", "group3", "group4"])
  })
it('should select entries from an Array according to roles', ()=>{
let testarr=[]
const roles =createFakeRoles()
const menu = createFakeMenu()
const result = utils.roleBasedSelection(menu, roles, ["admin"])
result.forEach(element => {
  testarr.push(element.key)
})
expect(testarr).toEqual(["m1","m3","m4","m5"])
})
})







describe('uniquify array with objects',()=> {
it('should uniquify a array according a key', ()=>{
  const arr = [
    {key: "a1", payload: "whatever"},
    {key: "a2", payload: "whatever"},
    {key: "a2", payload: "whatever"},
    {key: "a1", payload: "whatever"},
    {key: "a1", payload: "whatever"},
    {key: "a3", payload: "whatever"}
]
  const result = utils.makeObjectArrayUnique(arr,"key")
  expect(result).toEqual([
    {key: "a1", payload: "whatever"},
    {key: "a2", payload: "whatever"},
    {key: "a3", payload: "whatever"}
  ]
    
    ) 

})
})


const createFakeRoles= () =>{
  const roles = [
    {name: "group4", sub: ["group1"]}, 
    {name: "admin",  sub: ["group1",  "group3", "group4"]},
    {name: "group2"}   
   ]
   return roles
}

const createFakeMenu=()=>{
const menu = [
  {key: "m1" ,
  payload: {title: "Menu1", caption: "this is menu1", link: "/pages1", icon: "home"},
  roles: ["admin", "group1"]},
  {key: "m2", 
  payload: {title: "Menu2", caption: "this is menu2", link: "/pages2", icon: "home"},
  roles: [ "group2"]},
  {key: "m3", 
  payload: {title: "Menu3", caption: "this is menu3", link: "/pages3", icon: "home"},
  roles: ["admin", "group3"]},
  {key: "m4", 
  payload: {title: "Menu4", caption: "this is menu4", link: "/pages4", icon: "home"},
  roles: ["group4"]},
  {key: "m5", 
  payload: {title: "Menu5", caption: "this is menu5", link: "/pages5", icon: "home"},
  roles: ["admin"]},
  ]
return menu
}