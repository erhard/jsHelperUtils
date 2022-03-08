export const readLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value)
}

export const deleteFromLocalStorage = (key) =>{
  localStorage.setItem(key, value);
}

export const store2LocalStorage = (key, obj)=> {
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

const findObjectInArray= (arr, field, value)=>{
  return arr.find(x => x[field] == value);
}



export default {
  sortArrayByField,
  isObjectInArray,
  deepCopy,
  deleteElArFromElAr,
  findObjectInArray
}
