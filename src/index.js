const readLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value)
}

const deleteFromLocalStorage = (key) =>{
  localStorage.setItem(key, value);
}

const store2LocalStorage = (key, obj)=> {
  const value = JSON.stringify(obj)
  localStorage.setItem(key, value);
}


const deleteElArFromElAr=(elAr, targetAr)=> {
  try{
  elAr.forEach(element=> {
    const index = targetAr.indexOf(element);
    if (index > -1) {
     targetAr.splice(index, 1);
    }
  })}catch(error){
   console.log(error)
   throw("wrong Format of Array")
 }
 return targetAr
}

const isObjectInArray = (arr,obj,ident) => {
   const kk = (arr.filter(e => e[ident] == obj))
   const retWert = kk.length > 0
   return retWert
  }

const sortArrayByField=(params)=>{
  let array = params.array 
  const field = params.field 
  array = array.sort((a,b)=>{
      let fa = a[field].toLowerCase(),
      fb = b[field].toLowerCase();
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
        } )
  return array
}

const deepCopy=(obj)=>{
  return JSON.parse(JSON.stringify(obj))
}
//wrapper around lodash function//
export const  isReallyEmpty = (obj) => {
   return isEmpty(obj)
}

const findObjectInArray= (arr, field, value)=>
{
  return arr.find(x => x[field] == value);
}

//findes the first appearance
  const getIndexOfObjectInArray=(arr,field,value,caseSensitive=false) => {
    const index = arr.findIndex(element => {
      if (caseSensitive){ 
      return element[field]==value;
      }else{
        return element[field].toLowerCase()==value.toLowerCase()
      }
    })
    return(index);
  }

  const findMultiple=(arr,field,value,caseSensitive=false) => {
   let result = []
    for (let i = 0; i < arr.length; i++) { 
      let el = arr[i]
     if(caseSensitive){
      el[field]=el[field].toLowerCase();
      value = value.toLowerCase(); 
     }  
    if (el[field] ==value) {
       result.push(i)
    }
   } 
    return result
  }






  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const sleep = async function (time) {
    await timeout(time);
  }; 

  const makeArrayUnique = (inputArray) => {
    const retAr = Array.from(new Set(inputArray));
    return retAr;
  }

  const makeObjectArrayUnique = (arr, key_field) =>{
    let uniqueObjArray = [
      ...new Map(arr.map((item) => [item[key_field], item])).values(),
  ];
  return uniqueObjArray  
}


//traverses a tree beginnig with a certain leave (entrypoint)
 const recurseTree=(entrypoint,tree, data= [])=>{
  //search all leaves with entrypoint
  const leaves = findMultiple(tree, "name", entrypoint)
  data.push(entrypoint)
  leaves.forEach(index =>{
    const leave = tree[index]
        if(leave.sub){
        leave.sub.forEach((element)=>{
          const subtree = tree.splice(index,1)
          recurseTree(element,subtree, data)
        })
      } 
  }) 
  return data
  }




  //data :  {key: String, roles: [String], payload: any}
  //payload is anything You like to group according roles
  //key is a unique String to make to resultingArray unique
  //example MenuNames
  //Look a the test to get an idea of the implementation.
  //A usecase for example the role based menus.

  const roleBasedSelection =(data, roles, user_roles) =>{
    let access = []
    let retArr =  []
    user_roles.forEach(role => {
      const ac=recurseTree(role,roles)
      access = access.concat(ac) 
    })
    //match the payload data//
    data.forEach(dat =>{
       const roles = dat.roles
       roles.forEach(role=>{
         if(access.includes(role)){
           retArr.push(dat)
         }         
       })
    })
    retArr=makeObjectArrayUnique(retArr,"key")
    return retArr
  }
   
   
   
   
   
   




export default {
  sortArrayByField,
  isObjectInArray,
  deepCopy,
  deleteElArFromElAr,
  findObjectInArray,
  readLocalStorage,
  deleteFromLocalStorage,
  store2LocalStorage,
  getIndexOfObjectInArray,
  sleep,
  makeArrayUnique,
  roleBasedSelection,
  recurseTree,
  findMultiple,
  makeObjectArrayUnique
}
