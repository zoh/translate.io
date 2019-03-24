// ** utils ** //

// empty function
export function nope() {
}


export function vueToJSON(obj) {
  return JSON.parse(JSON.stringify(obj))
}


export function isExist(val) {
  return !!val
}
